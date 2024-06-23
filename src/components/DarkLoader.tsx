import { useTheme } from "./ui/theme-provider";

const DarkLoader = () => {
  const { theme } = useTheme();

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black">
      <img
        src={`${
          window.matchMedia("(prefers-color-scheme: dark)") && theme === "dark"
            ? "/src/assets/logo-dark.svg"
            : "/src/assets/logo.svg"
        }`}
        alt="logo"
        className="animate-pulse"
        width={50}
        height={50}
      />
    </div>
  );
};

export default DarkLoader;
