import MentorCard from "./MentorCard";

const MentorList = ({ mentors }) => {
  return (
    <div className="py-6 mx-auto">
      <div className="flex flex-wrap justify-center gap-4">
        {mentors?.map((mentor, index) => (
          <MentorCard
            key={index}
            mentorImg={mentor.imageUrl}
            mentorName={mentor.userName}
            mentorTrack={mentor.specialization}
            MentorRate={mentor.averageStars}
            mentorExp={mentor.levelOfExperience}
            mentorId={mentor._id}
          />
        ))}
      </div>
    </div>
  );
};

export default MentorList;
