import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import Chat from "./Chat";

const ChatBodySheet = ({ children }) => {
	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className="w-full">
				<Chat />
			</SheetContent>
		</Sheet>
	);
};

export default ChatBodySheet;
