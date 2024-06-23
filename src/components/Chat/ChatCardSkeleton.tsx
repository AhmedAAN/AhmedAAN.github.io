const SkeletonChatCard = () => {
	const n = 6;
	return [...Array(n)].map((e, i) => (
		<div
			className="border border-messageSkeletonSecondary rounded-lg p-4 m-2 shadow-md flex items-center space-x-4 animate-pulse"
			key={i}>
			<div className="h-16 w-16 rounded-full bg-messageSkeletonSecondary"></div>
			<div className="flex flex-col space-y-2 flex-1">
				<div className="h-4 bg-messageSkeletonSecondary rounded w-3/4"></div>
				<div className="h-4 bg-messageSkeletonSecondary rounded w-1/2"></div>
				<div className="h-3 bg-messageSkeletonSecondary rounded w-1/4"></div>
			</div>
		</div>
	));
};

export default SkeletonChatCard;
