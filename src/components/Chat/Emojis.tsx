import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { Smile } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Emojis = ({ setEmojiInputValue, inputRef }) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};
	const handleEmojiClick = (emojiData: EmojiClickData) => {
		if (!inputRef.current) return;

		const selectionStart = inputRef.current.selectionStart || 0;
		const selectionEnd = inputRef.current.selectionEnd || 0;

		setEmojiInputValue({
			selectionStart,
			selectionEnd,
			emoji: emojiData.emoji,
		});
	};
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);
	return (
		<div className="content-center justify-center mr-1">
			<div className="flex relative inline-block content-center justify-center">
				<button onClick={toggleDropdown}>
					<Smile
						strokeWidth={2}
						className="w-7 h-7 fill-messageSkeletonSecondary-foreground text-background"
					/>
				</button>

				<div
					ref={dropdownRef}
					className="origin-bottom-right absolute bottom-8 mb-2 transform -translate-x-36">
					<div
						role="menu"
						aria-orientation="vertical"
						aria-labelledby="options-menu">
						<EmojiPicker
							className="custom-emoji-picker"
							width="20rem"
							height="30rem"
							onEmojiClick={handleEmojiClick}
							open={isOpen}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Emojis;
