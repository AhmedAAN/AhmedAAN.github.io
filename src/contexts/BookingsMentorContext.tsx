/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useState } from "react";

type BookingsMentorContextType = {
  value: Record<string, any>;
  setValue: React.Dispatch<React.SetStateAction<Record<string, any>>>;
};

const BookingsMentorContext = createContext<BookingsMentorContextType | null>(
  null
);

function BookingsMentorProvider({ children }: { children: React.ReactNode }) {
  const [value, setValue] = useState<Record<string, any>>({});
  console.log(value);
  return (
    <BookingsMentorContext.Provider value={{ value, setValue }}>
      {children}
    </BookingsMentorContext.Provider>
  );
}

export default BookingsMentorProvider;

export const useBookingsMentor = () => {
  return useContext(BookingsMentorContext);
};
