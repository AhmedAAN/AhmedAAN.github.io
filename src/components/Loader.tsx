import { useTheme } from "./ui/theme-provider";
import logo from "../assets/logo.svg";
import darkLogo from "../assets/logo-dark.svg";

const Loader = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`h-screen flex justify-center items-center ${
        window.matchMedia("(prefers-color-scheme: dark)") && theme === "dark"
          ? "bg-black"
          : "bg-white"
      }`}
    >
      <img
        src={`${
          window.matchMedia("(prefers-color-scheme: dark)") && theme === "dark"
            ? darkLogo
            : logo
        }`}
        alt="logo"
        className="animate-pulse"
        width={50}
        height={50}
      />
    </div>
  );
};

export default Loader;
