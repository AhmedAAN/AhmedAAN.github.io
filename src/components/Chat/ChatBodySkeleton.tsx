const ChatBodySkeleton = () => {
	return (
		<div className="h-full flex flex-col">
			<div className="py-2 px-3 bg-chat border-b-2 border-background flex flex-row justify-between items-center">
				<div className="flex w-full items-center">
					<div className="h-9 w-9 rounded-full bg-messageSkeletonSecondary-foreground  animate-pulse"></div>
					<div className="ml-4 flex-1">
						<div className="h-5 bg-messageSkeletonSecondary-foreground rounded w-2/6  animate-pulse"></div>
					</div>
				</div>
			</div>
			<div className="flex-1 overflow-auto bg-chat">
				<div className="py-2 px-3">
					<div className="flex justify-center mb-2  animate-pulse">
						<div className="rounded-2xl py-2 px-4 bg-messageSkeletonSecondary shadow-md">
							<div className="h-4 bg-messageSkeletonSecondary-foreground rounded w-36 float-right"></div>
						</div>
					</div>

					<div className="flex mb-2">
						<div className="rounded-br-3xl rounded-tr-3xl rounded-bl-xl py-3 px-4 space-y-2 bg-messageSkeletonSecondary shadow-md animate-pulse">
							<div className="h-4 bg-messageSkeletonSecondary-foreground rounded w-1/4"></div>
							<div className="h-4 bg-messageSkeletonSecondary-foreground rounded w-64"></div>
							<div className="h-4 bg-messageSkeletonSecondary-foreground rounded w-1/6 float-right"></div>
						</div>
					</div>
					<div className="flex mb-2">
						<div className="rounded-br-3xl rounded-tr-3xl rounded-bl-xl py-3 px-4 space-y-2 bg-messageSkeletonSecondary shadow-md animate-pulse">
							<div className="h-4 bg-messageSkeletonSecondary-foreground rounded w-1/4"></div>
							<div className="h-4 bg-messageSkeletonSecondary-foreground rounded w-56"></div>
							<div className="h-4 bg-messageSkeletonSecondary-foreground rounded w-1/6 float-right"></div>
						</div>
					</div>
					<div className="flex justify-end mb-2">
						<div className="rounded-bl-2xl rounded-tl-2xl rounded-br-xl py-3 px-4 space-y-2 bg-messageSkeletonMain shadow-md animate-pulse">
							<div className="h-4 bg-messageSkeletonMain-foreground rounded w-72"></div>
							<div className="h-4 bg-messageSkeletonMain-foreground w-1/6 float-right"></div>
						</div>
					</div>
					<div className="flex mb-2">
						<div className="rounded-br-3xl rounded-tr-3xl rounded-bl-xl py-3 px-4 space-y-2 bg-messageSkeletonSecondary shadow-md animate-pulse">
							<div className="h-4 bg-messageSkeletonSecondary-foreground rounded w-1/4"></div>
							<div className="h-4 bg-messageSkeletonSecondary-foreground rounded w-72"></div>
							<div className="h-4 bg-messageSkeletonSecondary-foreground rounded w-1/6 float-right"></div>
						</div>
					</div>
				</div>
			</div>
			<div className="bg-chat pr-4 pl-2 pb-4 pt-2 flex items-center space-x-3">
				<div className="mx-0 rounded-lg h-10 w-full bg-messageSkeletonSecondary shadow-md animate-pulse"></div>
			</div>
		</div>
	);
};

export default ChatBodySkeleton;
