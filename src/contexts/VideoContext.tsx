import React, { createContext, useContext, useState, ReactNode } from "react";

interface VideoContextType {
	video: boolean;
	setVideo: React.Dispatch<React.SetStateAction<boolean>>;
	mic: boolean;
	setMic: React.Dispatch<React.SetStateAction<boolean>>;
	screenShare: boolean;
	setScreenShare: React.Dispatch<React.SetStateAction<boolean>>;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider = ({ children }: { children: ReactNode }) => {
	const [video, setVideo] = useState(false);
	const [mic, setMic] = useState(false);
	const [screenShare, setScreenShare] = useState(false);

	return (
		<VideoContext.Provider
			value={{ video, setVideo, mic, setMic, screenShare, setScreenShare }}>
			{children}
		</VideoContext.Provider>
	);
};

export const useVideo = (): VideoContextType => {
	const context = useContext(VideoContext);
	if (!context) {
		throw new Error("useVideo must be used within a VideoProvider");
	}
	return context;
};
