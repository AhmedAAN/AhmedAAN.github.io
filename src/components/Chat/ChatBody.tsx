import { Search } from "lucide-react";
import ChatControls from "./ChatControls";
import ChatMessages from "./ChatMessages";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { ChevronLeft } from "lucide-react";
import { useSmallScreen } from "../../contexts/SmallScreenContext";
import { Link } from "react-router-dom";
import Picture from "./Picture";

const ChatBody = ({ ChatID, Chat, setChat, divRef }) => {
	const { smallScreen } = useSmallScreen();
	return (
		<div className="h-full flex flex-col bg-chat">
			<div className="border-b-2 border-background h-16 mr-4 ml-1 pr-2 bg-chat flex flex-row justify-between items-center">
				<div className="flex items-center">
					{smallScreen && (
						<Link to={`/chats`} className="">
							<SheetPrimitive.Close className="opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-secondary">
								<ChevronLeft className="h-8 w-8" />
								<span className="sr-only">Close</span>
							</SheetPrimitive.Close>
						</Link>
					)}
					{!smallScreen && (
						<Link to={`/chats`} className="">
							<ChevronLeft className="h-8 w-8" />
							<span className="sr-only">Close</span>
						</Link>
					)}
					<Picture
						name={Chat.userName}
						image={Chat.image}
						size={9}
						fontSize={"base"}
					/>
					<div className="ml-3 space-y-0">
						<p className="text-white">{Chat.userName}</p>
						<p className="text-message text-xs mt-1">@xxxx_xxxx</p>
					</div>
				</div>

				<div className="flex">
					<Search className="text-messageSkeletonSecondary-foreground h-6 w-6" />
				</div>
			</div>
			<ChatMessages divRef={divRef} />
			<ChatControls ChatID={ChatID} setChat={setChat} />
		</div>
	);
};

export default ChatBody;
