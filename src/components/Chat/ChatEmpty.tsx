const ChatEmpty = () => {
	return (
		<div className="h-full flex flex-col items-center justify-center bg-chat ">
			<div className="transform -translate-y-3/4 bg-messageSkeletonSecondary px-4 py-1 rounded-full text-bold">
				Select a chat to start messaging
			</div>
		</div>
	);
};

export default ChatEmpty;
