import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import Chat from "./Chat";
import { useParams } from "react-router-dom";

const ChatSheet = ({ children }) => {
	const { id } = useParams();
	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className="w-full sm:w-1/3 ">
				<Chat Sheet={true} roomId={id} />
			</SheetContent>
		</Sheet>
	);
};

export default ChatSheet;
