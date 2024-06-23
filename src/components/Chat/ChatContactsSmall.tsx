import ChatHeader from "./ChatHeader";
import { ChatList } from "./ChatList";
import { Search } from "lucide-react";

const ChatContactsSmall = () => {
	return (
		<div className="flex w-full">
			<div className="w-full flex flex-col">
				<ChatHeader />
				<div className="py-2 px-2">
					<div className="flex w-full border border-background px-2 py-1.5 text-sm bg-chat rounded-lg focus-within:border-messageSkeletonSecondary-foreground">
						<Search className="text-messageSkeletonSecondary-foreground" />
						<input
							type="text"
							className="w-full bg-transparent focus:outline-none mx-1.5 text-base placeholder-messageSkeletonSecondary-foreground"
							placeholder="search..."
						/>
					</div>
				</div>
				<ChatList />
			</div>
		</div>
	);
};

export default ChatContactsSmall;
