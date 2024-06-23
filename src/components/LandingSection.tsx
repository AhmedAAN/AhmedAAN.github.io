import { useTheme } from "./ui/theme-provider";

const LandingSection = () => {
  const { theme } = useTheme();

  return (
    <section
      id="home"
      className="h-[calc(100dvh-56px)] flex justify-center md:justify-between items-center"
    >
      <div className="basis-[60%] block text-center md:text-start">
        <p
          className={`uppercase mb-4 ${
            theme === "dark" ? "text-primary" : "text-[#608DC4]"
          } font-bold`}
        >
          best online learning experience
        </p>
        <h1
          className={`font-extrabold text-6xl md:text-7xl leading-snug ${
            theme === "dark" ? "text-white" : "text-[#272444]"
          }`}
        >
          The Mentorship guide for{" "}
          <span
            className={`${
              theme === "dark" ? "text-primary" : "text-[#608DC4]"
            }`}
          >
            college students
          </span>
        </h1>
        <p
          className={`${
            theme === "dark" ? "text-primary" : "text-[#272444]"
          } font-bold opacity-70 mt-4 `}
        >
          We will help you to get your dream job
        </p>
      </div>
      <div className="hidden md:block md:flex-1">
        <img
          src="/src/assets/landing-1.webp"
          alt="landing-1"
          width={500}
          height={500}
          className="object-contain"
        />
      </div>
    </section>
  );
};

export default LandingSection;
