const Picture = ({ name, image, size, fontSize }) => {
	const getInitial = () => {
		return name ? name.charAt(0).toUpperCase() : "";
	};
	if (image) {
		return <img className={`w-${size} h-${size} rounded-full`} src={image} />;
	} else {
		return (
			<div
				className={`h-${size} w-${size} rounded-full bg-gray-400 text-white text-${fontSize} font-bold flex items-center justify-center`}>
				{getInitial()}
			</div>
		);
	}
};

export default Picture;
