import { Link } from "react-router-dom";
import { AiFillLinkedin } from "react-icons/ai";

const MentorCounter: React.FC = ({ linkedIn }) => {
  return (
    <div className="flex justify-center">
      <div className="flex border-2 text-center rounded-lg">
        <div className="px-4 md:px-12 py-5 border-r-2">
          <p className="text-primary  font-bold">46</p>
          <p className="font-bold">completed</p>
        </div>
        <div className="px-4 md:px-12 py-5 border-r-2">
          <p className="text-primary  font-bold">3 years</p>
          <p className="font-bold">Experience</p>
        </div>
        <div className="px-4 md:px-12 py-5">
          <p className="text-primary  font-bold">25</p>
          <p className="font-bold">Active student</p>
        </div>
      </div>
      <a
        href={`${linkedIn}`}
        target="_blank"
        className="flex justify-center items-center pl-10 "
      >
        <AiFillLinkedin
          size={30}
          color="#0A66C2"
          style={{ borderRadius: 50 }}
        />
      </a>
    </div>
  );
};

export default MentorCounter;
