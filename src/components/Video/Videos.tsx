import React, { useEffect, useRef, useState } from "react";
import Controls from "./Controls";
import { Maximize2 } from "lucide-react";
import { Minimize2 } from "lucide-react";

const Videos = ({
	localVideoComponent,
	remoteVideoComponent,
	remoteStreamActive,
}) => {
	const localVideoContainer = useRef(null);
	const remoteVideoContainer = useRef(null);
	const [fullScreen, setFullScreen] = useState(false);

	const handleFullScreen = (videoContainer) => {
		if (!document.fullscreenElement) {
			if (videoContainer.current.requestFullscreen) {
				videoContainer.current.requestFullscreen();
			} else if (videoContainer.current.mozRequestFullScreen) {
				videoContainer.current.mozRequestFullScreen();
			} else if (videoContainer.current.webkitRequestFullscreen) {
				videoContainer.current.webkitRequestFullscreen();
			} else if (videoContainer.current.msRequestFullscreen) {
				videoContainer.current.msRequestFullscreen();
			}
			setFullScreen(true);
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			}
			setFullScreen(false);
		}
	};
	return (
		<div className="h-full mb-5">
			<div className="flex-row sm:flex flex-1 justify-center items-center w-full h-full sm:space-x-5">
				<div
					ref={localVideoContainer}
					className="relative rounded-lg h-1/2 sm:h-96 sm:w-96 overflow-hidden border-2 border-primary bg-gradient-to-br from-gray-800 to-gray-900">
					<video
						ref={localVideoComponent}
						autoPlay
						muted
						className="w-full h-full object-cover"></video>
					<div className="absolute bottom-0 right-0 mb-2 mr-2 bg-primary px-2 py-1 rounded-lg text-xs">
						You
					</div>
					{!fullScreen && (
						<button
							onClick={() => handleFullScreen(localVideoContainer)}
							className="flex items-center justify-center absolute top-0 right-0 mt-2 mr-2 backdrop-blur-xl bg-zinc-800/10 text-zinc-600 hover:bg-zinc-950/40 hover:text-zinc-500 w-6 h-6 rounded-full text-xs">
							<Maximize2 size={14} strokeWidth={2.5} />
						</button>
					)}
					{fullScreen && (
						<button
							onClick={() => handleFullScreen(localVideoContainer)}
							className="flex items-center justify-center absolute top-0 right-0 mt-2 mr-2 backdrop-blur-xl bg-zinc-800/10 text-zinc-600 hover:bg-zinc-950/40 hover:text-zinc-500 w-8 h-8 rounded-full text-xs">
							<Minimize2 size={20} strokeWidth={2.5} />
						</button>
					)}
					{fullScreen && (
						<div className="absolute bottom-0 left-1/2 mb-2 tranform -translate-x-1/2 opacity-0">
							<Controls />
						</div>
					)}
				</div>

				<div
					ref={remoteVideoContainer}
					className={`relative rounded-lg h-1/2 sm:h-96 sm:w-96 overflow-hidden border-2 border-white bg-gradient-to-br from-gray-800 to-gray-900 ${
						remoteStreamActive ? "" : "hidden"
					}`}>
					<video
						ref={remoteVideoComponent}
						autoPlay
						className="w-full h-full object-cover"></video>
					<div className="absolute bottom-0 right-0 mb-2 mr-2 bg-white px-2 py-1 rounded-lg text-xs">
						Him
					</div>
					{!fullScreen && (
						<button
							onClick={() => handleFullScreen(remoteVideoContainer)}
							className="flex items-center justify-center absolute top-0 right-0 mt-2 mr-2 backdrop-blur-xl bg-zinc-800/10 text-zinc-600 hover:bg-zinc-950/40 hover:text-zinc-500 w-6 h-6 rounded-full text-xs">
							<Maximize2 size={14} strokeWidth={2.5} />
						</button>
					)}
					{fullScreen && (
						<button
							onClick={() => handleFullScreen(remoteVideoContainer)}
							className="flex items-center justify-center absolute top-0 right-0 mt-2 mr-2 backdrop-blur-xl bg-zinc-800/10 text-zinc-600 hover:bg-zinc-950/40 hover:text-zinc-500 w-6 h-6 rounded-full text-xs">
							<Minimize2 size={14} strokeWidth={2.5} />
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Videos;
