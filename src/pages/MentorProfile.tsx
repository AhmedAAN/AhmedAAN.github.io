import React, { useState, useEffect } from "react";
import MentorProfileTop from "@/components/MentorProfileTop";
import MentorSection from "@/components/MentorSection";

const MentorProfile: React.FC = () => {
	const [mentor, setMentor] = useState<any>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user")!);

		if (user) {
			fetch(`https://radwan.up.railway.app/listMentor/${user._id}`)
				.then((response) => {
					if (!response.ok) {
						throw new Error("Network response was not ok");
					}
					return response.json();
				})
				.then((data) => {
					setMentor({
						userName: data.mentor.userName,
						specialization: data.mentor.specialization,
						imageUrl: data.mentor.imageUrl,
					});
					setLoading(false);
				})
				.catch((error) => {
					console.error("Error fetching mentor data:", error);
					setLoading(false);
				});
		} else {
			setLoading(false);
		}
	}, []);

	return (
		<section className="py-12 px-4 md:px-12">
			{loading ? (
				<p>Loading...</p>
			) : mentor ? (
				<>
					<MentorProfileTop
						userName={mentor.userName}
						professionalTitle={mentor.specialization}
						imageUrl={mentor.imageUrl}
					/>
					<MentorSection />
				</>
			) : (
				<p>No mentor data available.</p>
			)}
		</section>
	);
};

export default MentorProfile;
