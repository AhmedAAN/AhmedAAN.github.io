import MentorSignupForm from "@/auth/MentorSignupForm";
import LoginLayout from "@/components/LoginLayout";
import WelcomeImg from "@/components/WelcomeImg";

const MentorSignup = () => {
  return (
    <LoginLayout>
      <MentorSignupForm />
      <WelcomeImg />
    </LoginLayout>
  );
};

export default MentorSignup;
