import MentorList from "@/components/MentorList";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  getConsultMentors,
  getMentoringMentors,
  getMentorsList,
  getMockMentors,
} from "@/services/apiMentors";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Search from "@/components/Search";
import Filter from "@/components/Filter";
import Loader from "@/components/Loader";

const Homepage = () => {
  const [filter, setFilter] = useState("all");
  const [efilter, seteFilter] = useState({
    specialization: "",
    levelOfExperience: "",
  });

  const filterMentors = async (mentors) => {
    const { specialization, levelOfExperience } = efilter;

    if (specialization) {
      mentors = mentors.filter(
        (mentor) => mentor.specialization === specialization
      );
    }

    if (levelOfExperience) {
      mentors = mentors.filter(
        (mentor) => mentor.levelOfExperience === levelOfExperience
      );
    }

    return mentors;
  };

  const { isLoading, data: mentorsList } = useQuery({
    queryKey: ["mentorsList", filter, efilter],
    queryFn: async () => {
      let mentors;
      if (filter === "mock") {
        mentors = await getMockMentors();
      } else if (filter === "consultation") {
        mentors = await getConsultMentors();
      } else if (filter === "mentoring") {
        mentors = await getMentoringMentors();
      } else {
        mentors = await getMentorsList();
      }

      return filterMentors(mentors);
    },
  });

  if (isLoading) return <Loader />;

  return (
    <section id="home" className="py-12 flex flex-col items-center">
      <h1 className="text-center font-bold text-xl">Find Your Best Mentor</h1>
      <Search filter={efilter} setFilter={seteFilter} />
      <Filter filter={filter} setFilter={setFilter} />
      <MentorList mentors={mentorsList} />
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
};

export default Homepage;
