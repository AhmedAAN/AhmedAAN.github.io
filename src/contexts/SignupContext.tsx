/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useState } from "react";

type SignupContextType = {
  value: Record<string, any>;
  setValue: React.Dispatch<React.SetStateAction<Record<string, any>>>;
};

const SignupContext = createContext<SignupContextType | null>(null);

function SignupProvider({ children }: { children: React.ReactNode }) {
  const [value, setValue] = useState<Record<string, any>>({});

  return (
    <SignupContext.Provider value={{ value, setValue }}>
      {children}
    </SignupContext.Provider>
  );
}

export default SignupProvider;

export const useSignup = () => {
  return useContext(SignupContext);
};
