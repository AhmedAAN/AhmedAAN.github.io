import { WifiOff } from "lucide-react";

const ChatError = () => {
	return (
		<div className="animate-errorMessage-down flex flex-row space-x-3 absolute left-1/2 transform -translate-x-1/2 translate-y-16  bottom-full w-max px-5 py-3 bg-red-500 text-white text-sm rounded-md shadow-lg items-center z-[51]">
			<p>Cannot connect to the server.</p>
			<WifiOff className="h-[1.2rem] w-[1.2rem] scale-100" />
		</div>
	);
};

export default ChatError;
