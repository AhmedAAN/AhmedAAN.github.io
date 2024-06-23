import MeetingBody from "../components/Video/MeetingBody";
import { VideoProvider } from "../contexts/VideoContext";

const Meeting = () => {
	return (
		<VideoProvider>
			<MeetingBody />
		</VideoProvider>
	);
};

export default Meeting;
