import { useEffect, useState } from "react";
import Chat from "../components/Chat/Chat";
import ChatContactsSmall from "../components/Chat/ChatContactsSmall";
import ChatContactsNormal from "../components/Chat/ChatContactsNormal";
import ChatError from "../components/Chat/ChatError";
import "../styles/chatStyles.css";
import { ChatProvider } from "../contexts/ChatContext";
import { useSmallScreen } from "../contexts/SmallScreenContext";

const Chats = (isConnected: any) => {
	const [width, setWidth] = useState(window.innerWidth);
	const { smallScreen, setSmallScreen } = useSmallScreen();

	useEffect(() => {
		const handleResize = () => {
			setWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		if (width <= 680) {
			if (!smallScreen) {
				setSmallScreen(true);
			}
		} else {
			if (smallScreen) {
				setSmallScreen(false);
			}
		}
	}, [width]);
	return (
		<ChatProvider>
			<div className="center mx-auto">
				<div className="h-screen">
					{!isConnected.isConnected && <ChatError />}
					{!smallScreen && (
						<div className="flex border border-grey rounded shadow-lg h-full bg-background">
							<ChatContactsNormal /> <Chat />
						</div>
					)}
					{smallScreen && (
						<div className="flex border border-grey rounded shadow-lg h-full bg-background">
							<ChatContactsSmall />
						</div>
					)}
				</div>
			</div>
		</ChatProvider>
	);
};

export default Chats;
