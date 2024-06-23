import LandingSection from "@/components/LandingSection";
import OffersSection from "@/components/OffersSection";
import ReviewsSection from "@/components/ReviewsSection";
import SubscribeSection from "@/components/SubscribeSection";
import TopMentorsSection from "@/components/TopMentorsSection";
import { useCookies } from "react-cookie";

const LandingPage = () => {
  const [cookie, setCookie] = useCookies();
  console.log(cookie.io);
  return (
    <main className="px-16">
      <LandingSection />
      <TopMentorsSection />
      <OffersSection />
      <ReviewsSection />
      <SubscribeSection />
    </main>
  );
};

export default LandingPage;
