import { FaPen } from "react-icons/fa";
// import ProfilePicture from "../assets/mentor-2.webp";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

function ProfilePic() {
  return (
    <div className="px-4 py-2 ">
      <Avatar className=" relative  w-40 h-40  flex items-center justify-center mx-auto   ">
        <AvatarImage
          src="https://github.com/shadcn.png"
          alt="@shadcn"
          className="rounded-full w-full h-full object-cover"
        />
        <AvatarFallback>CN</AvatarFallback>
        <Link
          to={`../components/EditProfile`}
          className="p-2 absolute bottom-3 right-0 bg-white rounded-full"
        >
          <FaPen className="w-4 h-4 text-gray-600" />
        </Link>
      </Avatar>
    </div>
  );
}

export default ProfilePic;
