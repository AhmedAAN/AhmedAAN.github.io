import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { socket } from "../../socket";
import ChatBody from "./ChatBody";
import ChatEmpty from "./ChatEmpty";
import ChatBodySkeleton from "./ChatBodySkeleton";
import { useChat } from "../../contexts/ChatContext";

const Chat = () => {
	const divRef = useRef(null);
	var { id } = useParams();
	const [chatID, setChatID] = useState(null);
	const { chat, setChat, typing } = useChat();
	const [page, setPage] = useState<number>(1);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const user = JSON.parse(localStorage.getItem("user"));
	const userID: any = user._id || "";

	const groupMessagesByDay = (messages, prevMessages = {}) => {
		return messages.reduce((groups, message) => {
			const d = new Date(message.time);

			// Extract the date part from the timestamp
			const year = d.getFullYear();
			const month = (d.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
			const day = d.getDate().toString().padStart(2, "0");
			const date = `${year}-${month}-${day}`;

			// If the date key doesn't exist, create an array for it
			if (!groups[date]) {
				groups[date] = [];
			}

			// Add the message to the corresponding date array
			groups[date].push(message);

			return groups;
		}, prevMessages);
	};

	useEffect(() => {
		if (id) {
			const fetchChat = async () => {
				setLoading(true);
				socket.emit("get messages", id, page, 0, (response: any) => {
					if ("error" in response) {
						setError(response.error);
					} else {
						response._id = id;

						const tempChat = { ...response };
						const times = groupMessagesByDay(tempChat.messages);
						tempChat.messages = times;

						setChat(tempChat);
					}
					setLoading(false);
				});
			};

			const updateChat = async () => {
				socket.emit("get messages", id, page, 0, (response: any) => {
					if ("error" in response) {
						setError(response.error);
					} else {
						const tempChat = { ...chat };
						const times = groupMessagesByDay(
							response.messages,
							tempChat.messages
						);
						tempChat.messages = times;
						setChat(tempChat);
					}
				});
			};

			if (chat && chat._id == id) {
				updateChat();
			} else {
				fetchChat();
			}
		} else {
			setChat(null);
		}
	}, [id, page]);

	useEffect(() => {
		const handleScroll = () => {
			const div = divRef.current;
			if (div && div.scrollHeight + div.scrollTop === div.clientHeight) {
				setPage((PreviousPage) => PreviousPage + 1);
			}
		};

		const div = divRef.current;
		if (div) {
			div.addEventListener("scroll", handleScroll);
		}

		return () => {
			if (div) {
				div.removeEventListener("scroll", handleScroll);
			}
		};
	});
	return (
		<div className="w-full h-full">
			{!id && <ChatEmpty />}
			{loading && <ChatBodySkeleton />}
			{chat && !loading && (
				<ChatBody ChatID={id} Chat={chat} setChat={setChat} divRef={divRef} />
			)}
		</div>
	);
};
export default Chat;
