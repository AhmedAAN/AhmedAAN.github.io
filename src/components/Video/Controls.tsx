import { Button } from "../ui/button";
import { Mic } from "lucide-react";
import { MicOff } from "lucide-react";
import { Video } from "lucide-react";
import { VideoOff } from "lucide-react";
import { MonitorUp } from "lucide-react";
import { PhoneOff } from "lucide-react";
import { MessageSquareMore } from "lucide-react";
import { Link } from "react-router-dom";
import { useVideo } from "../../contexts/VideoContext";
import ChatSheet from "./ChatSheet";

const Controls = () => {
	const { video, setVideo, mic, setMic, screenShare, setScreenShare } =
		useVideo();
	const toggleVideo = () => {
		setVideo(!video);
	};
	const toggleMic = () => {
		setMic(!mic);
	};
	const toggleScreenShare = () => {
		setScreenShare(!screenShare);
	};

	return (
		<div className="flex w-full items-center">
			<div className="flex justify-between space-x-3 flex-1 w-full pb-4 px-7 sm:pb-0 sm:px-0 sm:justify-center">
				{!mic && (
					<Button
						variant="destructive"
						size="icon"
						onClick={() => {
							toggleMic();
						}}>
						<MicOff className="h-[1.2rem] w-[1.2rem]" />
					</Button>
				)}
				{mic && (
					<Button
						variant="video"
						size="icon"
						onClick={() => {
							toggleMic();
						}}>
						<Mic className="h-[1.2rem] w-[1.2rem]" />
					</Button>
				)}
				{video && (
					<Button
						variant="video"
						size="icon"
						onClick={() => {
							toggleVideo();
						}}>
						<Video className="h-[1.2rem] w-[1.2rem]" />
					</Button>
				)}
				{!video && (
					<Button
						variant="destructive"
						size="icon"
						onClick={() => {
							toggleVideo();
						}}>
						<VideoOff className="h-[1.2rem] w-[1.2rem]" />
					</Button>
				)}
				{screenShare && (
					<Button
						size="icon"
						onClick={() => {
							toggleScreenShare();
						}}>
						<MonitorUp className="h-[1.2rem] w-[1.2rem]" />
					</Button>
				)}
				{!screenShare && (
					<Button
						size="icon"
						variant="video"
						onClick={() => {
							toggleScreenShare();
						}}>
						<MonitorUp className="h-[1.2rem] w-[1.2rem]" />
					</Button>
				)}
				<div className="lg:hidden">
					<ChatSheet>
						<Button size="icon" variant="video">
							<MessageSquareMore className="h-[1.2rem] w-[1.2rem]" />
						</Button>
					</ChatSheet>
				</div>
				<div className="float-right">
					<Link to={`/`} className="">
						<Button variant="destructive" size="icon" onClick={() => {}}>
							<PhoneOff className="h-[1.2rem] w-[1.2rem]" />
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Controls;
