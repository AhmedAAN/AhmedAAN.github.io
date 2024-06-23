const Message = ({ message }) => {
	const date = new Date(message.time);
	const minutes =
		date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
	const hours = date.getHours() % 12 || 12;
	const am_pm = date.getHours() < 12 ? " AM" : " PM";
	const user = JSON.parse(localStorage.getItem("user"));
	const userID: any = user._id || "";

	if (message.sender != userID && message.sender != "") {
		return (
			<div className="flex mb-2">
				<div className="rounded-br-3xl rounded-tr-3xl rounded-bl-xl py-2 px-3 bg-message text-black max-w-[60%]">
					<p className="text-sm mt-1 whitespace-pre-wrap">{message.text}</p>
					<p className="text-right text-xs text-grey-dark mt-1">
						{hours + ":" + minutes + am_pm}
					</p>
				</div>
			</div>
		);
	} else {
		return (
			<div className="flex justify-end mb-2">
				<div className="rounded-bl-2xl rounded-tl-2xl rounded-br-xl py-2 px-3 bg-primary text-white max-w-[60%]">
					<p className="text-sm mt-1 whitespace-pre-wrap">{message.text}</p>
					<p className="text-right text-xs text-grey-dark mt-1">
						{hours + ":" + minutes + am_pm}
					</p>
				</div>
			</div>
		);
	}
};

export default Message;
