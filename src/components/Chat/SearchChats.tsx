import { useEffect, useState } from "react";
import { socket } from "../../socket";
import ChatCard from "./ChatCard";

const SearchChats = ({ searchInputValue }) => {
	const [searchResults, setSearchResults] = useState(null);
	useEffect(() => {
		if (searchInputValue) {
			socket.emit("searching", searchInputValue, (response) => {
				if (!response[0]) {
					setSearchResults(null);
				} else {
					setSearchResults(response);
				}
			});
		}
	}, [searchInputValue]);

	if (searchInputValue) {
		return (
			<div className="chat_container bg-grey-lighter flex-1 overflow-auto scroll-smooth">
				{searchResults &&
					searchResults.map((chat) => <ChatCard key={chat._id} chat={chat} />)}
				{!searchResults && <div className="px-3 text-sm">No Results</div>}
			</div>
		);
	}
};

export default SearchChats;
