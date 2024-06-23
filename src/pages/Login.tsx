import WelcomeImg from "@/components/WelcomeImg";
import LoginForm from "../auth/LoginForm";
import LoginLayout from "../components/LoginLayout";

const Login = () => {
  return (
    <LoginLayout>
      <LoginForm />
      <WelcomeImg />
    </LoginLayout>
  );
};

export default Login;
