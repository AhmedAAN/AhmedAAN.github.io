import { formatDate } from "../../services/formatDate";
import { useChat } from "../../contexts/ChatContext";
import Message from "./Message";

const ChatMessages = ({ divRef }) => {
	const { chat, typing } = useChat();
	return (
		<div
			ref={divRef}
			className="chat_container_dark flex-1 flex flex-col-reverse overflow-auto
			bg-chat py-2 px-3">
			{/* <div className="flex justify-center mb-2">
					<div className="rounded-2xl py-2 px-4 bg-white text-gray-300">
						<p className="text-sm uppercase">February 20, 2018</p>
					</div>
				</div> */}
			{/* {Chat.messages.map((message: any, index: any) => (
				<Message key={index} message={message} receiver={Chat.user} />
			))} */}

			{typing && (
				<div className="flex pl-2 space-x-2">
					<div className="flex items-center space-x-1 rounded-full py-3 px-3 bg-messageSkeletonSecondary">
						<div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce-1"></div>
						<div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce-2"></div>
						<div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce-3"></div>
					</div>
					<div className="flex text-sm text-gray-500 items-center">
						Typing...
					</div>
				</div>
			)}

			{Object.keys(chat.messages).map((date) => (
				<div key={date} className="flex flex-col-reverse">
					{chat.messages[date].map((message: any, index: any) => (
						<Message key={index} message={message} />
					))}
					<div className="sticky top-0 flex justify-center mb-2">
						<div className="rounded-2xl py-1 px-4 bg-messageSkeletonSecondary">
							<p className="text-sm">{formatDate(new Date(date), false)}</p>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default ChatMessages;
