import Loader from "@/components/Loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useBookingsMentor } from "@/contexts/BookingsMentorContext";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const SelectTimeAvailable = () => {
  const [selected, setSelected] = useState("");
  const [freeSlots, setFreeSlots] = useState([]);

  const navigate = useNavigate();
  const { value, setValue } = useBookingsMentor()!;
  const mentorID = useParams().id;
  const day = useParams().day;
  const { data: mentor, isLoading: isLoadingMentor } = useQuery({
    queryKey: ["mentor", mentorID],
    queryFn: async () => {
      const res = await fetch(
        `https://radwan.up.railway.app/listMentor/${mentorID}`
      );
      const data = await res.json();
      return data.mentor;
    },
  });

  const { data: mentorAvailability } = useQuery({
    queryKey: ["mentorAvailability", mentorID],
    queryFn: async () => {
      const res = await fetch(
        `https://ali.up.railway.app/api/v1/availability/check`,
        {
          method: "POST",
          body: JSON.stringify({ mentorID: "ali-zaki-id" }),
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await res.json();
      return data.data;
    },
  });

  useEffect(() => {
    if (mentorAvailability) {
      const slotsForDay = mentorAvailability.availableDates.find(
        (el) => el.date === day
      );
      if (slotsForDay) {
        setFreeSlots(slotsForDay.freeSlots);
      }
    }
  }, [mentorAvailability, day]);

  const handleRadio = (e) => {
    setSelected(e.target.value);
    const user = JSON.parse(localStorage.getItem("user")!);
    setValue({
      day: day,
      timeslot: e.target.value,
      mentorEmail: mentor.email,
      mentorID: "ali-zaki-id",
      menteeID: user._id,
      menteeEmail: user.email,
    });
  };
  async function onSubmit() {
    try {
      const res = await fetch(
        `https://ali.up.railway.app/api/v1/bookings/paymob-session`,
        {
          method: "POST",
          body: JSON.stringify(value),
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await res.json();
      if (res.ok) {
        window.location.href = data.payURL;
      }

      return data;
    } catch (error) {
      console.log(error);
    }
  }
  const timeSlots = ["10:30", "11:45", "16:10"];

  if (isLoadingMentor) {
    return <Loader />;
  }

  return (
    <>
      <section className="h- flex flex-col justify-center items-center">
        <h2>Step 2 of 2</h2>
        <div className="flex gap-4 md:gap-28 w-full justify-center ">
          <div className="flex basis-1/2 flex-col gap-3 justify-center items-center border-b p-2">
            <div className="flex justify-center items-center gap-3">
              <Avatar className="w-[75px] h-[75px]">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                  width={100}
                  height={100}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-bold text-primary text-xl">
                  {mentor.userName}
                </h2>
                <span className="text-gray-500">{mentor.specialization}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <h2 className="font-bold text-primary text-xl">
                30-mins 1:1 Session
              </h2>
              <p className="mt-8 text-gray-500">session duration</p>
              <h2 className="font-bold text-primary text-xl">30 minutes</h2>
              <p className="mt-8 text-gray-500">About</p>
              <h2 className="font-bold text-primary text-xl">
                {mentor.services}
              </h2>
            </div>
          </div>
          <div className="py-10 flex border my-4 rounded-md  md:basis-1/2 flex-col gap-3 justify-center items-center border-b p-2">
            <h2 className="font-bold text-primary">Selecte date and time</h2>
            <div>
              <div className="flex flex-col w-full gap-[20px]">
                <div className="flex justify-between items-center gap-2">
                  <h3>Date:</h3>
                  <p className="mt-[4px] text-gray-400">{day}</p>
                  <div className="flex flex-row justify-center pt-1">
                    <a
                      href={`/booking/calendar/${mentorID}`}
                      className=" text-blue-600 font-normal"
                    >
                      Change
                    </a>
                  </div>
                </div>
                <h2>Selecte available time</h2>
                <div className="flex justify-start items-center w-[98%] gap-2 pb-8">
                  {freeSlots.map((el, index) => {
                    const isCurrent = selected === el;

                    return (
                      <div key={index} className="radioPad">
                        <div>
                          <label
                            className={`px-3 rounded-md py-2 ${
                              isCurrent
                                ? " bg-blue-950 text-white"
                                : "border-blue-950 border"
                            }`}
                          >
                            <input
                              className="hidden"
                              type="radio"
                              name="timeslots"
                              id={el}
                              value={el}
                              onChange={handleRadio}
                            />
                            {el}
                          </label>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <Button
                className="w-full mt-4"
                onClick={() => {
                  onSubmit();
                }}
              >
                Pay
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default SelectTimeAvailable;
