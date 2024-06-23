import SignUpForm from "@/auth/SignUpForm";
import LoginLayout from "@/components/LoginLayout";
import WelcomeImg from "@/components/WelcomeImg";

const SignUp = () => {
  return (
    <LoginLayout>
      <SignUpForm />
      <WelcomeImg />
    </LoginLayout>
  );
};

export default SignUp;
