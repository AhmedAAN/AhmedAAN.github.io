import { useTheme } from "./ui/theme-provider";
import { SiMockserviceworker } from "react-icons/si";
import { FaElementor } from "react-icons/fa";

const OffersSection = () => {
  const { theme } = useTheme();

  return (
    <section id="services" className="pt-40 pb-20 text-center md:text-start">
      <p
        className={`uppercase mb-4 ${
          theme === "dark" ? "text-primary" : "text-[#608DC4]"
        } font-bold `}
      >
        what we offer
      </p>
      <h1
        className={`capitalize text-3xl sm:text-4xl md:text-6xl font-bold mt-8  ${
          theme === "dark" ? "text-white" : "text-[#272444]"
        }`}
      >
        we offer the best set of services
      </h1>
      <div className="flex justify-center  items-center mt-8 ">
        <div className="basis-[100%] md:basis-[55%] flex flex-col gap-8 text-center md:text-start">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div
              className={`border min-w-[80px] h-[80px] flex justify-center items-center rounded-md ${
                theme === "dark" ? "border-primary" : "border-[#294C74]"
              }`}
            >
              <SiMockserviceworker
                className={`text-4xl ${
                  theme === "dark" ? "text-primary" : "text-[#294C74]"
                }`}
              />
            </div>
            <div>
              <h1
                className={`text-xl font-semibold ${
                  theme === "dark" ? "text-white" : "text-[#272444]"
                }`}
              >
                Mock Interview
              </h1>
              <p
                className={`${
                  theme === "dark" ? "text-primary" : "text-[#272444]"
                } font-normal opacity-90 mt-1`}
              >
                Allow students to practice interviews with simulated scenarios
                to prepare well for real interview
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div
              className={`border min-w-[80px] h-[80px] flex justify-center items-center rounded-md ${
                theme === "dark" ? "border-primary" : "border-[#294C74]"
              }`}
            >
              <SiMockserviceworker
                className={`text-4xl ${
                  theme === "dark" ? "text-primary" : "text-[#294C74]"
                }`}
              />
            </div>
            <div>
              <h1
                className={`text-xl font-semibold ${
                  theme === "dark" ? "text-white" : "text-[#272444]"
                }`}
              >
                Consultation
              </h1>
              <p
                className={`${
                  theme === "dark" ? "text-primary" : "text-[#272444]"
                } font-normal opacity-90 mt-1`}
              >
                Students seek guidance from experts or mentors via an online
                video session
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div
              className={`border min-w-[80px] h-[80px] flex justify-center items-center rounded-md ${
                theme === "dark" ? "border-primary" : "border-[#294C74]"
              }`}
            >
              <FaElementor
                className={`text-4xl ${
                  theme === "dark" ? "text-primary" : "text-[#294C74]"
                }`}
              />
            </div>
            <div>
              <h1
                className={`text-xl font-semibold ${
                  theme === "dark" ? "text-white" : "text-[#272444]"
                }`}
              >
                Mentoring
              </h1>
              <p
                className={`${
                  theme === "dark" ? "text-primary" : "text-[#272444]"
                } font-normal opacity-90 mt-1`}
              >
                Mentors provide personalized guidance and support to students
                including coursework and projects with rating and feedback
              </p>
            </div>
          </div>
        </div>
        <div className="hidden md:flex md:justify-end md:flex-1 ">
          <img
            src="/src/assets/landing-2.webp"
            alt="landing-2"
            width={600}
            height={600}
          />
        </div>
      </div>
    </section>
  );
};

export default OffersSection;
