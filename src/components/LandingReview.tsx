import { FaRegStar, FaStar } from "react-icons/fa";
import { useTheme } from "./ui/theme-provider";

interface LandingReviewProps {
  name: string;
  track: string;
  review: string;
  rate: number;
  image: string;
}

const LandingReview = ({
  name,
  track,
  review,
  rate,
  image,
}: LandingReviewProps) => {
  const { theme } = useTheme();

  return (
    <div
      className={`rounded-lg ${
        theme === "dark"
          ? "shadow-[0_15px_30px_0px_rgba(59,130,246,0.3)] hover:shadow-[0_35px_60px_5px_rgba(59,130,246,0.3)]"
          : "shadow-[0_15px_30px_0px_rgba(117,116,136,0.3)] hover:shadow-[0_35px_60px_5px_rgba(117,116,136,0.3)]"
      } relative basis-[250px] px-4 py-8 h-[290px]`}
    >
      <span className="absolute top-0 right-5 h-fit -translate-y-1/4 text-8xl text-[#F17633]">
        ’’
      </span>
      <div className="flex gap-5 mb-3">
        <div className="rounded-full ">
          <img
            src={image}
            alt="mentor"
            className="object-contain w-[55px] h-[55px] rounded-full"
          />
        </div>
        <div className="text-start">
          <h2 className="mb-2 font-semibold">{name}</h2>
          <span
            className={`${
              theme === "dark" ? "text-primary" : "text-[#272444] opacity-[70%]"
            }`}
          >
            {track}
          </span>
        </div>
      </div>
      <p
        className={`text-start ${
          theme === "dark" ? "text-primary" : "text-[#272444] opacity-[70%]"
        } font-semibold  leading-[20px] pt-3`}
      >
        {review}
      </p>
      <div className="flex gap-1 mt-8">
        {Array.from({ length: 5 }, (_, index: number) =>
          5 - index > Number(rate) ? (
            <FaRegStar key={index} className="text-[#F17633]" />
          ) : (
            <FaStar key={index} className="text-[#F17633]" />
          )
        ).reverse()}
      </div>
    </div>
  );
};

export default LandingReview;
