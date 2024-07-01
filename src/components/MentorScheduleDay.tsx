import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import { useState, useEffect } from "react";
import { useScheduleMentor } from "@/contexts/ScheduleContext";

const timeSlots = [
	"12:00",
	"12:30",
	"13:00",
	"13:30",
	"14:00",
	"15:00",
	"15:30",
	"16:00",
	"16:30",
	"17:00",
	"17:30",
	"18:00",
	"18:30",
	"19:00",
	"19:30",
	"20:00",
	"20:30",
	"21:00",
	"21:30",
	"22:00",
	"23:30",
	"00:00",
];

const days = [
	"Sundays",
	"Mondays",
	"Tuesdays",
	"Wednesdays",
	"Thursdays",
	"Fridays",
	"Saturdays",
];

const MentorScheduleDay = ({ day }: { day: any }) => {
	const { value, setValue } = useScheduleMentor();
	const dayIndex = days.indexOf(day);
	const [selected, setSelected] = useState(value[dayIndex]?.slots || []);
	const [checked, setChecked] = useState(value[dayIndex]?.available || false);
	const user = JSON.parse(localStorage.getItem("user")!);

	const handleCheckbox = (e: any) => {
		const slot = e.target.value;
		setSelected((prevSelected: any) =>
			prevSelected.includes(slot)
				? prevSelected.filter((time: any) => time !== slot)
				: [...prevSelected, slot]
		);
	};
	useEffect(() => {
		if (user) {
			setValue((prevValue: any) => ({
				...prevValue,
				day: dayIndex,
				sessionPrice: 200,
				mentorID: user._id,
				availablity: [
					...(prevValue.availablity || []),
					{
						day: dayIndex,
						available: checked,
						slots: selected,
					},
				],
			}));
		}
	}, [checked, selected, setValue, user, dayIndex]);

	const handleChecked = () => {
		setChecked(!checked);
	};

	return (
		<>
			<div className="flex items-center gap-14 justify-between space-x-2 my-6">
				<div className="flex items-center space-x-2">
					<Switch id={day} checked={checked} onCheckedChange={handleChecked} />
					<Label className="uppercase" htmlFor={day}>
						{day}
					</Label>
				</div>
				{checked ? (
					<div className="flex flex-wrap gap-2">
						{timeSlots.map((el, index) => {
							const isSelected = selected.includes(el);
							return (
								<div key={index} className="checkboxPad">
									<div className="flex flex-row gap-2">
										<label
											className={`px-3 rounded-md py-2 ${
												isSelected
													? "bg-blue-950 text-white"
													: "border-blue-950 border"
											}`}>
											<input
												className="hidden"
												type="checkbox"
												name="timeslots"
												id={el}
												value={el}
												onChange={handleCheckbox}
												checked={isSelected}
											/>
											{el}
										</label>
									</div>
								</div>
							);
						})}
					</div>
				) : (
					<div>
						<p className="text-slate-600">Unavailable</p>
					</div>
				)}
			</div>
			<Separator />
		</>
	);
};

export default MentorScheduleDay;
