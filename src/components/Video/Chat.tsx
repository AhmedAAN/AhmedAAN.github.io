import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { useEffect, useRef, useState } from "react";
import Message from "../Chat/Message.tsx";
import { socket } from "../../socket";

const Chat = ({ Sheet, roomId }) => {
	const [chat, setChat] = useState([]);
	const [inputValue, setInputValue] = useState("");
	const user = JSON.parse(localStorage.getItem("user"));
	const userID: any = user._id || "";

	const inputRef = useRef<HTMLInputElement>(null);

	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};

	const sendMessage = () => {
		const date = new Date();
		const newMessage = {
			sender: userID,
			time: `${date}`,
			text: inputValue,
		};
		socket.emit("room message", {
			roomID: roomId,
			message: newMessage,
		});
		setChat((prevChat) => [...prevChat, newMessage]);
		setInputValue("");
	};

	useEffect(() => {
		const handleMessage = (message) => {
			setChat((prevChat) => [...prevChat, message]);
		};
		socket.on("room message", handleMessage);
		return () => {
			socket.off("room message", handleMessage);
		};
	}, [chat]);

	return (
		<div className="h-full flex flex-col bg-chat">
			<div className="border-b-2 border-background h-16 pr-2 bg-chat flex flex-row justify-between items-center">
				<div className="flex items-center">
					{Sheet && (
						<div>
							<SheetPrimitive.Close className="opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-secondary">
								<ChevronLeft className="h-8 w-8" />
								<span className="sr-only">Close</span>
							</SheetPrimitive.Close>
							<div className="ml-1">
								<p className="text-white">Chat</p>
							</div>
						</div>
					)}
					{!Sheet && (
						<div className="ml-1 pl-2">
							<p className="text-white">Chat</p>
						</div>
					)}
				</div>
			</div>
			<div className="overflow-y-auto chat_container_dark bg-chat flex-1 pt-4 px-3">
				{chat &&
					chat.map((message: any, index: any) => (
						<Message key={index} message={message} />
					))}
			</div>
			<div className="bg-chat px-4 pb-4 pt-2 flex items-center space-x-3 bottom-0 rounded-xl">
				<div className="flex flex-1 mx-0 border border-background bg-background focus-within:border-messageSkeletonSecondary-foreground rounded-lg">
					<div className="content-center justify-center mx-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lucide lucide-circle-plus fill-messageSkeletonSecondary-foreground h-6 w-6">
							<circle
								cx="12"
								cy="12"
								r="10"
								className="text-messageSkeletonSecondary-foreground"
							/>
							<path d="M8 12h8" className="text-background" />
							<path d="M12 8v8" className="text-background" />
						</svg>
					</div>
					<input
						className="bg-transparent w-full focus:outline-none py-2 "
						type="text"
						ref={inputRef}
						value={inputValue}
						onChange={handleInputChange}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								e.preventDefault();
								if (e.shiftKey) {
									setInputValue((prevMessage) => prevMessage + "\n");
								} else {
									sendMessage();
								}
							}
						}}
						placeholder="type your message..."
					/>
				</div>
				<div>
					<button id="sendbtn">
						<svg
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							id="send"
							className="icon glyph fill-primary h-7 w-7">
							<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
							<g
								id="SVGRepo_tracerCarrier"
								strokeLinecap="round"
								strokeLinejoin="round"></g>
							<g id="SVGRepo_iconCarrier">
								<path d="M21.66,12a2,2,0,0,1-1.14,1.81L5.87,20.75A2.08,2.08,0,0,1,5,21a2,2,0,0,1-1.82-2.82L5.46,13H11a1,1,0,0,0,0-2H5.46L3.18,5.87A2,2,0,0,1,5.86,3.25h0l14.65,6.94A2,2,0,0,1,21.66,12Z"></path>
							</g>
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Chat;
