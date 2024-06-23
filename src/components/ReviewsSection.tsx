import { useTheme } from "./ui/theme-provider";
import LandingReview from "./LandingReview";
import { reviews } from "@/constants/reviews";

const ReviewsSection = () => {
  const { theme } = useTheme();
  const landingReviews = reviews.slice(0, 4);

  return (
    <section id="reviews" className="text-center pt-10 pb-28">
      <p
        className={`uppercase mb-4 ${
          theme === "dark" ? "text-primary" : "text-[#608DC4]"
        } font-bold `}
      >
        reviews
      </p>
      <h1
        className={`capitalize text-3xl sm:text-4xl md:text-6xl font-bold mt-8  ${
          theme === "dark" ? "text-white" : "text-[#272444]"
        }`}
      >
        what our students say about us
      </h1>
      <div className="flex flex-wrap justify-center items-center gap-6 mt-12">
        {landingReviews.map((review) => (
          <LandingReview
            key={review.id}
            name={review.name}
            track={review.track}
            review={review.review}
            rate={review.rate}
            image={review.image}
          />
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;
