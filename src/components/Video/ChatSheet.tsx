import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import Chat from "./Chat";

const ChatSheet = ({ children }) => {
	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className="w-full sm:w-1/3 ">
				<Chat Sheet={true} />
			</SheetContent>
		</Sheet>
	);
};

export default ChatSheet;
