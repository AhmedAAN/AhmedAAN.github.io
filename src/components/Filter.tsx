import { Button } from "@/components/ui/button";

const Filter = ({ filter, setFilter }) => {
  return (
    <div className="flex gap-2 flex-wrap justify-center">
      <Button
        onClick={() => setFilter("all")}
        className={`bg-muted border-2 border-border text-primary hover:text-white hover:bg-primary/90 px-4 md:px-10 
          ${filter === "all" ? "bg-primary text-white" : ""}`}
      >
        All
      </Button>
      <Button
        onClick={() => setFilter("mock")}
        className={`bg-muted border-2 border-border text-primary hover:text-white hover:bg-primary/90 px-4 md:px-10 
        ${filter === "mock" ? "bg-primary text-white" : ""}`}
      >
        Mock interview
      </Button>
      <Button
        onClick={() => setFilter("consultation")}
        className={`bg-muted border-2 border-border text-primary hover:text-white hover:bg-primary/90 px-4 md:px-10 
        ${filter === "consultation" ? "bg-primary text-white" : ""}`}
      >
        Consultation
      </Button>
      <Button
        onClick={() => setFilter("mentoring")}
        className={`bg-muted border-2 border-border text-primary hover:text-white hover:bg-primary/90 px-4 md:px-10 
        ${filter === "mentoring" ? "bg-primary text-white" : ""}`}
      >
        Mentoring
      </Button>
    </div>
  );
};

export default Filter;
