import LoginLayout from "@/components/LoginLayout";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  return (
    <LoginLayout>
      <div className="flex flex-col justify-center items-center gap-7">
        <h1 className="font-bold text-foreground">4 Digits OTP</h1>
        <p className="">Enter the 4 digits OTP sent to your mail</p>
        <InputOTP
          maxLength={4}
          render={({ slots }) => (
            <>
              <InputOTPGroup>
                {slots.slice(0, 4).map((slot, index) => (
                  <>
                    <InputOTPSlot
                      key={index}
                      {...slot}
                      className="border rounded-md text-primary"
                    />
                    {index < 3 ? <InputOTPSeparator key={index + 1} /> : null}
                  </>
                ))}{" "}
              </InputOTPGroup>
            </>
          )}
        />
        <Button size="lg" className="w-full">
          <Link to="/reset-password" className="">
            Next
          </Link>
        </Button>
      </div>
    </LoginLayout>
  );
};

export default ForgetPassword;
