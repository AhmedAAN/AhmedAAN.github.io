// import React, { useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";
import ProfilePic from "./ProfilePic";
import {
  AiOutlineEdit,
  AiOutlineShareAlt,
  AiOutlineLogout,
  AiOutlineSetting,
} from "react-icons/ai";
import EditStudentProfile from "@/components/EditStudentProfile";
import AsAMentor from "@/components/AsAMentor";
import Settings from "@/components/Settings";

// interface Profile {
//   name: string;
// }

const StudentSection: React.FC = () => {
  // const [profile] = useState<Profile>({
  //   name: "John Doe",
  // });

  const user = JSON.parse(localStorage.getItem("user")!);

  return (
    <div className="max-w-md mx-auto border shadow w-full md:w-1/3  overflow-hidden my-10 text-gray-500 ">
      <div className="px-4 py-2 my-5 ">
        <ProfilePic />
        <h2 className="text-2xl font-semibold text-primary mt-2 text-center">
          {user.userName}
        </h2>
      </div>
      <div className="px-4 py-2 my-3">
        <div className="border p-5  flex justify-content gap-4 w-full rounded mb-2 text-[#272444]">
          <AiOutlineEdit className="w-6 h-6 text-[#DCDCDC]" />
          <EditStudentProfile />
        </div>
        <div className="border p-5  flex justify-content gap-4 w-full rounded mb-2 text-[#272444]">
          <FaExchangeAlt className="w-6 h-6 text-[#DCDCDC]" />
          <AsAMentor />
        </div>
        <div className="border p-5  flex justify-content gap-4 w-full rounded mb-2 text-[#272444]">
          <AiOutlineSetting className="w-6 h-6 text-[#DCDCDC]" />
          <Settings />
        </div>
        <button className="w-full">
          <div className="border p-5  flex justify-content gap-4 w-full rounded mb-2 text-secondary-foreground">
            <AiOutlineLogout className="w-6 h-6 text-[#DCDCDC]" />
            Share App
          </div>
        </button>

        <button className="w-full">
          <div className="border p-5  flex justify-content gap-4 w-full rounded mb-2 text-secondary-foreground">
            <AiOutlineShareAlt className="w-6 h-6 text-[#DCDCDC]" />
            Log Out
          </div>
        </button>
      </div>
    </div>
  );
};

export default StudentSection;
