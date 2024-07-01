import MentorScheduleDay from "@/components/MentorScheduleDay";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useScheduleMentor } from "@/contexts/ScheduleContext";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const days = [
	"Sundays",
	"Mondays",
	"Tuesdays",
	"Wednesdays",
	"Thursdays",
	"Fridays",
	"Saturdays",
];

const MentorSchedule = () => {
	const { value, setValue } = useScheduleMentor();
	const navigate = useNavigate();
	const [sessionPrice, setSessionPrice] = useState("");

	const handlePriceChange = (e: any) => {
		const inputPrice = e.target.value;

		const regex = /^[0-9]*\.?[0-9]*$/;

		if (regex.test(inputPrice)) {
			setSessionPrice(inputPrice);
		}
	};
	const handleSubmit = async () => {
		try {
			const res = await fetch(
				`https://ali.up.railway.app/api/v1/availability/set`,
				{
					method: "POST",
					body: JSON.stringify({ ...value, sessionPrice: sessionPrice }),
					headers: {
						"Content-type": "application/json",
					},
					credentials: "include",
				}
			);
			const data = await res.json();
			if (res.ok) {
				navigate("/");
				toast.success("Your Schedule saved Successfully");
			}
			return data;
		} catch (error) {
			console.log(error);
			toast.error("Failed to save schedule");
		}
	};

	return (
		<section className="py-6 flex flex-col justify-center items-center md:px-20">
			<div className="flex justify-between">
				<div className="w-1/2 flex flex-col justify-center">
					<h2 className="font-bold text-2xl mb-8">Set Your Schedule</h2>
					<p>
						Choose a Schedule below to edit your default hours that you can
						apply to your sessions types.
					</p>
				</div>
				<div>
					<img
						src="/src/assets/schedule.webp"
						className="block md:w-96 md:h-96 w-56 h-56 object-cover"
						alt="Schedule"
					/>
				</div>
			</div>
			<div className="px-8 py-4 border rounded-lg w-full">
				{days.map((day, index) => (
					<MentorScheduleDay key={index} day={day} />
				))}
			</div>
			<div className="flex items-center gap-2">
				<label htmlFor="sessionPrice">Session Price:</label>
				<Input
					id="sessionPrice"
					value={sessionPrice}
					onChange={handlePriceChange}
					className="border rounded p-2"
				/>
			</div>
			<Button
				onClick={handleSubmit}
				className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
				Submit
			</Button>
		</section>
	);
};

export default MentorSchedule;
