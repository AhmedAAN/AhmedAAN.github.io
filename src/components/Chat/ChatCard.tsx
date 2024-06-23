import { Link } from "react-router-dom";
import { formatDate } from "../../services/formatDate";
import ChatBodySheet from "./ChatBodySheet";
import { useSmallScreen } from "../../contexts/SmallScreenContext";
import Picture from "./Picture";

function ChatCard({ chat }) {
	const { smallScreen } = useSmallScreen();

	const user = JSON.parse(localStorage.getItem("user"));

	const userID: any = user._id || "";

	let sender = { name: "", ID: "" };
	let receiver = { name: "", ID: "", image: null };

	const dateStringify = (date: string) => {
		return formatDate(new Date(date));
	};

	for (let user of chat.users) {
		if (user.user != userID) {
			receiver.name = user.userName;
			receiver.ID = user.user;
			receiver.image = user.image;
		} else {
			sender.name = user.userName;
			sender.ID = user.user;
		}
	}
	return (
		<div>
			{smallScreen && (
				<ChatBodySheet>
					<Link
						to={`/chats/${chat._id}`}
						className="px-3 flex items-center bg-grey-400 flex items-center space-x-4"
						id={`${chat._id}`}>
						<Picture
							name={receiver.name}
							image={receiver.image}
							size={16}
							fontSize={"lg"}
						/>
						<div className="ml-4 flex-1 border-b border-grey-lighter py-4">
							<div className="flex items-bottom justify-between">
								<p className="text-grey-darkest">{receiver.name}</p>
								<p className="text-xs text-grey-darkest">
									{dateStringify(chat.lastUsage)}
								</p>
							</div>
							<p className="text-grey-dark mt-1 text-sm">
								{chat.lastMessage.text}
							</p>
						</div>
					</Link>
				</ChatBodySheet>
			)}
			{!smallScreen && (
				<Link
					to={`/chats/${chat._id}`}
					className="px-3 flex items-center bg-grey-400 flex items-center space-x-4"
					id={`${chat._id}`}>
					<Picture
						name={receiver.name}
						image={receiver.image}
						size={16}
						fontSize={"lg"}
					/>
					<div className="ml-4 flex-1 border-b border-grey-lighter py-4">
						<div className="flex items-bottom justify-between">
							<p className="text-grey-darkest">{receiver.name}</p>
							<p className="text-xs text-grey-darkest">
								{dateStringify(chat.lastUsage)}
							</p>
						</div>
						<p className="text-grey-dark mt-1 text-sm">
							{chat.lastMessage.text}
						</p>
					</div>
				</Link>
			)}
		</div>
	);
}

export default ChatCard;
