import EditMentorProfile from "@/components/EditMentorProfile";

export default function MentorSection() {
  return (
    <div className="w-full px-20 py-40 text-start">
      <h4 className="mb-5 text-foreground ">Description about me</h4>
      <p className="mb-10 text-foreground w-full ">
        I've been working with Students remotely for seven years . My experience
        has likely allowed you to build strong <br></br>communication skills,
        enabling me to connect with students , understand their needs, and
        deliver effective and <br></br>inspiring sessions. My goal is support
        stutends in achieving their educational and professional objectives .
      </p>
      <EditMentorProfile />
    </div>
  );
}
