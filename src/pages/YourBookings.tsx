import Loader from "@/components/Loader";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const YourBookings = () => {
	const [schedule, setSchedule] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		console.log("schedule", schedule);
	}, [schedule]);

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user")!);
		if (user) {
			const fetchSchedule = async () => {
				try {
					const response = await fetch(
						"https://ali.up.railway.app/api/v1/bookings",
						{
							method: "POST",
							headers: {
								"Content-type": "application/json",
							},
							credentials: "include",
							body: JSON.stringify({ userID: user._id }),
						}
					);
					console.log(response);
					if (!response.ok) {
						throw new Error("Network response was not ok");
					}
					const data = await response.json();
					console.log(data.data);

					setSchedule(data.data);
					setLoading(false);
				} catch (error) {
					console.error("Error fetching schedule data:", error);
					setLoading(false);
				}
			};
			fetchSchedule();
		}
	}, []);
	if (loading) {
		return <Loader />;
	}
	return (
		<div className="min-h-[600px] px-24 py-8">
			<h1 className="font-bold">Your Bookings</h1>
			<div>
				{schedule.length > 0 ? (
					<table>
						<thead>
							<tr>
								<th>Mentor ID</th>
								<th>Mentee ID</th>
								<th>Day</th>
								<th>Timeslot</th>
							</tr>
						</thead>
						<tbody>
							{schedule.map((item, index) => (
								<tr key={index}>
									<td>{item.mentorID}</td>
									<td>{item.menteeID}</td>
									<td>{item.day}</td>
									<td>{item.timeslot}</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<>
						<div className="text-red-700 font-extrabold py-2 text-center">
							There's No Bookings Yet
						</div>
						<Link
							to="/home"
							className="py-2 bg-slate-400 w-[150px] mx-auto rounded my-2 text-center block">
							Go To mentors
						</Link>
					</>
				)}
			</div>
		</div>
	);
};
export default YourBookings;
