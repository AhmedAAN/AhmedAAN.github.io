import { mentors } from "@/constants/mentors";
import { useTheme } from "./ui/theme-provider";
import MentorCard from "./MentorCard";

const TopMentorsSection = () => {
  const { theme } = useTheme();
  const landingMentors = mentors.slice(0, 4);

  return (
    <section className="text-center">
      <p
        className={`uppercase mb-4 ${
          theme === "dark" ? "text-primary" : "text-[#608DC4]"
        } font-bold `}
      >
        top mentors
      </p>
      <h1
        className={`capitalize text-3xl sm:text-4xl md:text-6xl font-bold mt-8 ${
          theme === "dark" ? "text-white" : "text-[#272444]"
        }`}
      >
        explore top mentor
      </h1>
      <div className="flex flex-wrap justify-center gap-6 mt-16 ">
        {landingMentors.map((mentor) => (
          <MentorCard
            mentorId={mentor._id}
            key={mentor.name}
            mentorName={mentor.name}
            mentorImg={mentor.image}
            mentorExp={mentor.exp}
            MentorRate={mentor.rate}
            mentorTrack={mentor.track}
          />
        ))}
      </div>
    </section>
  );
};

export default TopMentorsSection;
