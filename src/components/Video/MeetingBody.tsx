import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Controls from "./Controls";
import Videos from "./Videos";
import Chat from "./Chat";
import { useVideo } from "../../contexts/VideoContext";
import {
	setLocalStream,
	setLocalCamera,
	handleStartCall,
	handleWebRtcOffer,
	setLocalScreenShare,
} from "../../services/VideoUtils";
import { socket } from "../../socket";

const MeetingBody = () => {
	const { video, mic, screenShare, setScreenShare } = useVideo();

	const localVideoComponent = useRef<HTMLVideoElement | null>(null);
	const remoteVideoComponent = useRef<HTMLVideoElement | null>(null);
	const localStream = useRef<MediaStream | null>(null);
	const remoteStream = useRef<MediaStream | null>(null);
	const [remoteStreamActive, setRemoteStreamActive] = useState(false);
	const isRoomCreator = useRef<boolean>(false);
	const rtcPeerConnection = useRef<RTCPeerConnection | null>(null);
	const [roomId, setRoomId] = useState(null);

	const { id } = useParams();

	useEffect(() => {
		socket.on("notification", (message) => {
			console.log("notification:", message);
		});
		socket.on("room_created", async () => {
			await setLocalStream(localStream, localVideoComponent, { video, mic });
			isRoomCreator.current = true;
		});

		socket.on("room_joined", async () => {
			await setLocalStream(localStream, localVideoComponent, { video, mic });
			socket.emit("start_call", roomId);
		});

		socket.on("full_room", () => {
			alert("The room is full, please try another one");
		});

		socket.on("start_call", async () => {
			await handleStartCall(
				isRoomCreator,
				rtcPeerConnection,
				localStream,
				remoteStream,
				roomId,
				remoteVideoComponent
			);
		});

		socket.on("webrtc_offer", async (event) => {
			setRemoteStreamActive(true);
			await handleWebRtcOffer(
				event,
				isRoomCreator,
				rtcPeerConnection,
				localStream,
				remoteStream,
				roomId,
				remoteVideoComponent
			);
		});

		socket.on("webrtc_answer", (event) => {
			setRemoteStreamActive(true);
			rtcPeerConnection.current?.setRemoteDescription(
				new RTCSessionDescription(event)
			);
		});

		socket.on("webrtc_ice_candidate", (event) => {
			const candidate = new RTCIceCandidate({
				sdpMLineIndex: event.label,
				candidate: event.candidate,
			});
			rtcPeerConnection.current?.addIceCandidate(candidate);
		});

		return () => {
			socket.off("room_created");
			socket.off("room_joined");
			socket.off("full_room");
			socket.off("start_call");
			socket.off("webrtc_offer");
			socket.off("webrtc_answer");
			socket.off("webrtc_ice_candidate");
		};
	}, [roomId, video, mic]);

	useEffect(() => {
		if (localStream.current) {
			localStream.current.getVideoTracks().forEach((track) => {
				track.enabled = video;
			});
		}
	}, [video]);

	useEffect(() => {
		if (localStream.current) {
			localStream.current.getAudioTracks().forEach((track) => {
				track.enabled = mic;
			});
		}
	}, [mic]);

	useEffect(() => {
		if (screenShare) {
			setLocalScreenShare(
				setScreenShare,
				rtcPeerConnection,
				localStream,
				localVideoComponent,
				{
					video,
					mic,
				}
			);
		}

		if (!screenShare && localStream.current) {
			setLocalCamera(
				setScreenShare,
				rtcPeerConnection,
				localStream,
				localVideoComponent,
				{
					video,
					mic,
				}
			);
		}
	}, [screenShare]);

	useEffect(() => {
		setRoomId(id);
	}, []);

	useEffect(() => {
		if (roomId) {
			socket.emit("join", roomId);
		}
	}, [roomId]);

	return (
		<div className="center mx-auto h-screen flex flex-col">
			<div className="hidden sm:block">
				<Header />
			</div>
			<div className="w-full flex-1 flex">
				<div className="flex flex-col w-full sm:p-5">
					<Videos
						localVideoComponent={localVideoComponent}
						remoteVideoComponent={remoteVideoComponent}
						remoteStreamActive={remoteStreamActive}
					/>
					<Controls />
				</div>
				<div className="hidden lg:block w-2/5 my-5 mr-5 bg-chat rounded-xl">
					<Chat Sheet={false} roomId={roomId} />
				</div>
			</div>
		</div>
	);
};

export default MeetingBody;
