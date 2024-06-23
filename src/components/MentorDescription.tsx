import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useBookingsMentor } from "@/contexts/BookingsMentorContext";
import { useEffect, useState } from "react";

const MentorDescription = ({ mentorId }: { mentorId: string }) => {
  const navigate = useNavigate();
  const { value, setValue } = useBookingsMentor()!;
  const [menteeId, setMenteeId] = useState();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setMenteeId(JSON.parse(localStorage.getItem("user")!)._id);
    }
  }, []);

  return (
    <div className="py-4">
      <div>
        <h2 className="font-bold text-lg">Description about me</h2>
        <p>
          I've been working with Students remotely for seven years . My
          experience has likely allowed you to build strong communication
          skills, enabling me to connect with students , understand their needs,
          and deliver effective and inspiring sessions. My goal is support
          stutends in achieving their educational and professional objectives .
        </p>
      </div>
      <div className="my-6">
        <Button
          className="mr-5 text-primary bg-white border-2 border-primary hover:text-white"
          onClick={() => navigate("/chats")}
        >
          Message
        </Button>
        <Link to={`/booking/calendar/${mentorId}`}>
          <Button
            onClick={() => {
              setValue({ ...value, mentorId: mentorId, menteeId: menteeId });
              console.log(value);
            }}
            className="mr-5 text-primary bg-white border-2 border-primary hover:text-white"
          >
            Book a session
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MentorDescription;
