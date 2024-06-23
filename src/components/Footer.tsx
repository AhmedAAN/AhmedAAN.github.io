import { Link } from "react-router-dom";
import { useTheme } from "./ui/theme-provider";
import { FaGoogle, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className=" mx-16  ">
      <nav className="flex  justify-between flex-wrap pt-6 pb-12 border-y-2">
        <div className="basis-[30%]">
          <Link className="logo flex items-center" to="/">
            <img
              src={`${
                theme === "dark"
                  ? "/src/assets/logo-dark.svg"
                  : "/src/assets/logo.svg"
              }`}
              alt="logo"
              width={32}
              height={32}
            />
            <h1 className="text-primary font-bold text-xl ml-2">Mentor</h1>
          </Link>
          <p
            className={`${
              theme === "dark" ? "text-white" : "text-primary"
            } my-7`}
          >
            Join thousands of students in the most powerful follow-up and
            training program that helps you reach the professional job you dream
            of under the supervision of specialists.
          </p>
          <div className="text-primary flex gap-4">
            <div className="w-10 h-10 bg-white shadow-[0_25px_50px_-1px_rgba(0,0,0,0.30)] flex items-center justify-center rounded-full">
              <FaGoogle width={30} height={30} />
            </div>
            <div className="w-10 h-10 bg-white shadow-[0_25px_50px_-1px_rgba(0,0,0,0.30)] flex items-center justify-center rounded-full">
              <FaLinkedin width={30} height={30} />
            </div>
            <div className="w-10 h-10 bg-white shadow-[0_25px_50px_-1px_rgba(0,0,0,0.30)] flex items-center justify-center rounded-full">
              <FaTwitter width={30} height={30} />
            </div>
          </div>
        </div>
        <div>
          <h3 className="p-2 mb-3 font-semibold text-primary">Pages</h3>
          <ul>
            <li
              className={`p-2 ${
                theme === "dark"
                  ? "text-white hover:text-primary"
                  : "text-primary"
              } `}
            >
              <a href="">About Us</a>
            </li>
            <li
              className={`p-2 ${
                theme === "dark"
                  ? "text-white hover:text-primary"
                  : "text-primary"
              } `}
            >
              <a href="">Profile</a>
            </li>
            <li
              className={`p-2 ${
                theme === "dark"
                  ? "text-white hover:text-primary"
                  : "text-primary"
              } `}
            >
              <a href="">Service</a>
            </li>
            <li
              className={`p-2 ${
                theme === "dark"
                  ? "text-white hover:text-primary"
                  : "text-primary"
              } `}
            >
              <a href="">Reviews</a>
            </li>
            <li
              className={`p-2 ${
                theme === "dark"
                  ? "text-white hover:text-primary"
                  : "text-primary"
              } `}
            >
              <a href="">Contact Us</a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="p-2 mb-3 font-semibold text-primary">Help</h3>
          <ul>
            <li
              className={`p-2 ${
                theme === "dark"
                  ? "text-white hover:text-primary"
                  : "text-primary"
              } `}
            >
              <Link to="">Help/FAQ</Link>
            </li>
            <li
              className={`p-2 ${
                theme === "dark"
                  ? "text-white hover:text-primary"
                  : "text-primary"
              } `}
            >
              <Link to="">Cancel your session</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="p-2 mb-3 font-semibold text-primary">Term</h3>
          <ul>
            <li
              className={`p-2 ${
                theme === "dark"
                  ? "text-white hover:text-primary"
                  : "text-primary"
              } `}
            >
              <Link to="">Privacy Policy</Link>
            </li>
            <li
              className={`p-2 ${
                theme === "dark"
                  ? "text-white hover:text-primary"
                  : "text-primary"
              } `}
            >
              <Link to="">Terms & Conditions</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="p-2 mb-3 font-semibold text-primary">Contact Us</h3>
          <div>
            <h4
              className={`p-2 ${
                theme === "dark"
                  ? "text-white hover:text-primary"
                  : "text-primary"
              } `}
            >
              Email
            </h4>
            <span
              className={`p-2 ${
                theme === "dark" ? "text-white" : "text-primary"
              }`}
            >
              needhelp@Mentor.com
            </span>
            <h4
              className={`p-2 ${
                theme === "dark"
                  ? "text-white hover:text-primary"
                  : "text-primary"
              } `}
            >
              Phone
            </h4>
            <span
              className={`p-2 ${
                theme === "dark" ? "text-white" : "text-primary"
              }`}
            >
              000000000000
            </span>
          </div>
        </div>
      </nav>
      <div
        className={`flex justify-center items-center ${
          theme === "dark" ? "text-white" : "text-[#272444] opacity-[50%]"
        }  font-semibold my-4`}
      >
        Mentor 2024 . All Right Reserved
      </div>
    </footer>
  );
};

export default Footer;
