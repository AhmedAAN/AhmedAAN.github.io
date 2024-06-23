import { Button } from "./ui/button";
import { useTheme } from "./ui/theme-provider";

const SubscribeSection = () => {
  const { theme } = useTheme();
  return (
    <section
      className={`${
        theme === "dark" ? "bg-primary/70" : "bg-primary"
      } flex flex-col gap-8 justify-center items-center px-1 py-16 mb-14 rounded-2xl`}
    >
      <h2 className="capitalize text-center font-semibold text-white text-sm sm:text-lg md:text-2xl text-wrap">
        subscribe to our newsletter & get platform news
      </h2>
      <form
        action=""
        className="w-full sm:w-1/2 flex flex-wrap justify-center gap-4 relative px-2"
      >
        <input
          type="email"
          required
          className="w-full h-[30px] sm:h-[42px] p-2 pl-4 rounded-3xl border border-primary focus:outline-primary placeholder:text-primary placeholder:opacity-[60%] placeholder:text-xs sm:placeholder:text-sm"
          placeholder="Enter your email address"
        />
        <Button
          className="bg-white hover:bg-primary text-primary hover:text-white font-semibold border md:py-2 h-[30px] sm:h-[42px] rounded-3xl border-primary sm:absolute sm:right-2"
          type="submit"
        >
          Subscribe
        </Button>
      </form>
    </section>
  );
};

export default SubscribeSection;
