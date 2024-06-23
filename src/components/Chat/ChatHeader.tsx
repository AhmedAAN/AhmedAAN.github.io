import { Link } from "react-router-dom";
import { useTheme } from "../ui/theme-provider";
import ModeToggle from "../ModeToggle";
const ChatHeader = () => {
	const { theme } = useTheme();
	return (
		<div className="h-16 mx-4 border-b border-chat flex flex-row justify-between items-center">
			<Link className="logo flex items-center" to="/">
				<img
					src={`${
						theme === "dark"
							? "/src/assets/logo-dark.svg"
							: "/src/assets/logo.svg"
					}`}
					alt="logo"
					className="w-8 h-8"
				/>
			</Link>

			<ModeToggle />
		</div>
	);
};

export default ChatHeader;
