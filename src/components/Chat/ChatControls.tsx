import Emojis from "./Emojis";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { socket } from "../../socket";

const ChatControls = ({ ChatID, setChat }) => {
	const [inputValue, setInputValue] = useState("");
	const [emojiInputValue, setEmojiInputValue] = useState({
		selectionStart: 0,
		selectionEnd: 0,
		emoji: "",
	});
	const inputRef = useRef<HTMLInputElement>(null);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	useEffect(() => {
		const textBeforeCursor = inputValue.substring(
			0,
			emojiInputValue.selectionStart
		);
		const textAfterCursor = inputValue.substring(emojiInputValue.selectionEnd);

		setInputValue(textBeforeCursor + emojiInputValue.emoji + textAfterCursor);

		const newCursor =
			emojiInputValue.selectionStart + emojiInputValue.emoji.length;
		setTimeout(() => {
			if (inputRef.current) {
				inputRef.current.setSelectionRange(newCursor, newCursor);
				inputRef.current.focus();
			}
		}, 10);
	}, [emojiInputValue]);

	useEffect(() => {
		setInputValue("");
	}, [ChatID]);

	useEffect(() => {
		if (inputValue && inputRef.current === document.activeElement) {
			socket.emit("typing", {
				chatID: ChatID,
			});
		} else {
			handleNotTyping();
		}
	}, [inputValue]);

	const handleNotTyping = () => {
		socket.emit("typing done", {
			chatID: ChatID,
		});
	};

	const sendMessage = () => {
		socket.emit("message", {
			chatID: ChatID,
			msg: inputValue,
		});
		const date = new Date();
		const dateSection = date.toISOString().split("T")[0];
		const newMessage = {
			sender: "",
			received: { done: false, time: `${date}` },
			read: { done: false, time: `${date}` },
			time: `${date}`,
			text: inputValue,
		};
		setChat((prevChat: { messages: any }) => ({
			...prevChat,
			messages: {
				...prevChat.messages,
				[dateSection]: [newMessage, ...(prevChat.messages[dateSection] || [])],
			},
		}));
		setInputValue("");
	};
	return (
		<div className="bg-chat px-4 pb-4 pt-2 flex items-center space-x-3">
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
					onBlur={handleNotTyping}
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
				<Emojis setEmojiInputValue={setEmojiInputValue} inputRef={inputRef} />
			</div>
			<div>
				{inputValue && (
					<button
						id="sendbtn"
						onClick={() => {
							sendMessage();
						}}>
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
				)}
				{!inputValue && (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						className="h-7 w-7">
						<path
							className="fill-messageSkeletonSecondary-foreground"
							d="M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.469 2.35 8.469 4.35v7.061c0 2.001 1.53 3.531 3.53 3.531zm6.238-3.53c0 3.531-2.942 6.002-6.237 6.002s-6.237-2.471-6.237-6.002H3.761c0 4.001 3.178 7.297 7.061 7.885v3.884h2.354v-3.884c3.884-.588 7.061-3.884 7.061-7.885h-2z"></path>
					</svg>
				)}
			</div>
		</div>
	);
};

export default ChatControls;
