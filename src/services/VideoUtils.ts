import { MutableRefObject, RefObject, SetStateAction, useState} from "react";
import { socket } from "../socket";

const iceServers = {
    iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
        { urls: "stun:stun2.l.google.com:19302" },
        { urls: "stun:stun3.l.google.com:19302" },
        { urls: "stun:stun4.l.google.com:19302" },
        {
            urls: "stun:stun.relay.metered.ca:80",
        },
        {
            urls: "turn:global.relay.metered.ca:80",
            username: "90b3064af83498636cc614a1",
            credential: "soPV9UVdMP/szrXN",
        },
        {
            urls: "turn:global.relay.metered.ca:80?transport=tcp",
            username: "90b3064af83498636cc614a1",
            credential: "soPV9UVdMP/szrXN",
        },
        {
            urls: "turn:global.relay.metered.ca:443",
            username: "90b3064af83498636cc614a1",
            credential: "soPV9UVdMP/szrXN",
        },
        {
            urls: "turns:global.relay.metered.ca:443?transport=tcp",
            username: "90b3064af83498636cc614a1",
            credential: "soPV9UVdMP/szrXN",
        },
    ],
}

const mediaConstraints = {
    audio: true,
    video: {
    width: { ideal: 1280 },
    height: { ideal: 720 },
    aspectRatio: 1.777777778,
    frameRate: { max: 30 },
    facingMode: { ideal: "user" },
  }
};

export async function setLocalStream(
    localStreamRef: MutableRefObject<MediaStream | null>,
    localVideoComponent: MutableRefObject<HTMLVideoElement | null>,
    { video, mic }: { video: boolean; mic: boolean }
) {
    

    try {
        const stream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
        stream.getVideoTracks().forEach((track) => {
			track.enabled = video;
		});
		stream.getAudioTracks().forEach((track) => {
			track.enabled = mic;
		});
        localStreamRef.current = stream;
        if (localVideoComponent.current) {
            localVideoComponent.current.srcObject = stream;
        }
    } catch (error) {
        console.error("Could not get user media", error);
    }
}

export function addLocalTracks(localStream: MediaStream | null, rtcPeerConnection: RTCPeerConnection) {
    if (localStream) {
        localStream.getTracks().forEach((track) => {
            rtcPeerConnection.addTrack(track, localStream);
        });
    }
}

export async function createOffer(rtcPeerConnection: RTCPeerConnection, roomId: string) {
    try {
        const sessionDescription = await rtcPeerConnection.createOffer();
        await rtcPeerConnection.setLocalDescription(sessionDescription);
        socket.emit("webrtc_offer", {
            type: "webrtc_offer",
            sdp: sessionDescription,
            roomID: roomId,
        });
    } catch (error) {
        console.error(error);
    }
}

export async function createAnswer(rtcPeerConnection: RTCPeerConnection, roomId: string) {
    try {
        const sessionDescription = await rtcPeerConnection.createAnswer();
        await rtcPeerConnection.setLocalDescription(sessionDescription);
        socket.emit("webrtc_answer", {
            type: "webrtc_answer",
            sdp: sessionDescription,
            roomID: roomId,
        });
    } catch (error) {
        console.error(error);
    }
}

export function setRemoteStream(event: RTCTrackEvent, remoteVideoComponent: React.RefObject<HTMLVideoElement>,remoteStream: MutableRefObject<MediaStream | null>) {
    remoteStream.current = event.streams[0];
    if (remoteVideoComponent.current) {
        remoteVideoComponent.current.srcObject = event.streams[0];
    }
}

export function sendIceCandidate(event: RTCPeerConnectionIceEvent, roomId: string) {
    if (event.candidate) {
        socket.emit("webrtc_ice_candidate", {
            roomID: roomId,
            label: event.candidate.sdpMLineIndex,
            candidate: event.candidate.candidate,
        });
    }
}

export const handleStartCall = async(isRoomCreator: MutableRefObject<boolean>, rtcPeerConnection: MutableRefObject<RTCPeerConnection | null>, localStream: MutableRefObject<MediaStream | null>, remoteStream: MutableRefObject<MediaStream | null>, roomId: string | undefined, remoteVideoComponent: RefObject<HTMLVideoElement>) => {
    if (isRoomCreator.current) {
        rtcPeerConnection.current = new RTCPeerConnection(iceServers);
        addLocalTracks(localStream.current, rtcPeerConnection.current);
        rtcPeerConnection.current.ontrack = (event: RTCTrackEvent) =>
            setRemoteStream(event, remoteVideoComponent, remoteStream);
        rtcPeerConnection.current.onicecandidate = (event: RTCPeerConnectionIceEvent) =>
            sendIceCandidate(event, roomId);
        await createOffer(rtcPeerConnection.current, roomId);
    }
};

export const handleWebRtcOffer = async (event: RTCSessionDescriptionInit,isRoomCreator: MutableRefObject<boolean>, rtcPeerConnection: MutableRefObject<RTCPeerConnection | null>, localStream: MutableRefObject<MediaStream | null>, remoteStream: MutableRefObject<MediaStream | null>, roomId: string | undefined, remoteVideoComponent: RefObject<HTMLVideoElement>) => {
    if (!isRoomCreator.current) {
        rtcPeerConnection.current = new RTCPeerConnection(iceServers);
        addLocalTracks(localStream.current, rtcPeerConnection.current);
        rtcPeerConnection.current.ontrack = (event: RTCTrackEvent) =>
            setRemoteStream(event, remoteVideoComponent, remoteStream);
        rtcPeerConnection.current.onicecandidate = (event: RTCPeerConnectionIceEvent) =>
            sendIceCandidate(event, roomId);
        rtcPeerConnection.current.setRemoteDescription(
            new RTCSessionDescription(event)
        );
        await createAnswer(rtcPeerConnection.current, roomId);
    }
};

export const setLocalCamera = async (setScreenShare: { (value: SetStateAction<boolean>): void; (arg0: boolean): void; },rtcPeerConnection: MutableRefObject<RTCPeerConnection | null>,localStreamRef: MutableRefObject<MediaStream | null>,
    localVideoComponent: MutableRefObject<HTMLVideoElement | null>,
    { video, mic }: { video: boolean; mic: boolean }) => {
	let stream;
	try {
		stream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
	} catch (error) {
        console.error("Could not get user media", error);
        setScreenShare(true)
	}

	updateLocalStream(rtcPeerConnection,stream, localStreamRef, localVideoComponent, { video, mic });
}

export const setLocalScreenShare = async (setScreenShare: { (value: SetStateAction<boolean>): void; (arg0: boolean): void; },rtcPeerConnection: MutableRefObject<RTCPeerConnection | null>,localStreamRef: MutableRefObject<MediaStream | null>,
    localVideoComponent: MutableRefObject<HTMLVideoElement | null>,
    { video, mic }: { video: boolean; mic: boolean }) => {
	let stream;
	try {
		const systemStream = await navigator.mediaDevices.getDisplayMedia(mediaConstraints);

		const systemAudioTrack = systemStream.getAudioTracks();
		const systemVideoTrack = systemStream.getVideoTracks();

		stream = new MediaStream(systemVideoTrack);
		const systemAudioStream = new MediaStream(systemAudioTrack);

		const micStream = await navigator.mediaDevices.getUserMedia({
			audio: true,
		});

		const combinedAudioStream = mergeAudioTracks(
			systemAudioStream,
			micStream
        );

		const audioTracks = combinedAudioStream.getTracks();

		if (audioTracks.length > 0) {
			stream.addTrack(audioTracks[0]);
		}
	} catch (error) {
        console.error("Could not get screen sharing media", error);
        setScreenShare(false)
	}

	updateLocalStream(rtcPeerConnection,stream, localStreamRef, localVideoComponent, { video, mic });
}

const mergeAudioTracks = (track1Stream: MediaStream, track2Stream: MediaStream) => {
	const audioContext = new AudioContext();
	const track1 = audioContext.createMediaStreamSource(track1Stream);
	const track2 = audioContext.createMediaStreamSource(track2Stream);

	const merger = audioContext.createChannelMerger(2);
	track1.connect(merger);
	track2.connect(merger);

	const outputStream = audioContext.createMediaStreamDestination();

	merger.connect(outputStream);

	return outputStream.stream;
}

const updateLocalStream = (rtcPeerConnection: MutableRefObject<RTCPeerConnection | null>,stream: MediaStream | undefined,
    localStreamRef: MutableRefObject<MediaStream | null>,
    localVideoComponent: MutableRefObject<HTMLVideoElement | null>,
    { video, mic }: { video: boolean; mic: boolean }) => {
    stream.getVideoTracks().forEach((track) => {
		track.enabled = video;
	});
	stream.getAudioTracks().forEach((track) => {
		track.enabled = mic;
	});
	if (localVideoComponent.current) {
        localVideoComponent.current.srcObject = stream;
    };
	localStreamRef.current = stream;
	updatePeerConnection(rtcPeerConnection,localStreamRef);
}

const updatePeerConnection = (rtcPeerConnection: MutableRefObject<RTCPeerConnection | null>,localStreamRef: MutableRefObject<MediaStream | null>) => {
	rtcPeerConnection.current.getSenders().forEach((sender: { track: { kind: any; }; replaceTrack: (arg0: any) => void; }) => {
		localStreamRef.current.getTracks().forEach((track: { kind: any; }) => {
		    if (track.kind === sender.track.kind) {
			sender.replaceTrack(track);
		    }
		});
	});
} 