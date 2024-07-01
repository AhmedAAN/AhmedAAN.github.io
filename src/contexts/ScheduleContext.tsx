/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useState } from "react";

type ScheduleMentorContextType = {
	value: Record<string, any> | null;
	setValue: React.Dispatch<React.SetStateAction<Record<string, any>>> | null;
};

const ScheduleMentorContext = createContext<ScheduleMentorContextType | null>(
	null
);

function ScheduleMentorProvider({ children }: { children: React.ReactNode }) {
	const [value, setValue] = useState<Record<string, any>>({});
	return (
		<ScheduleMentorContext.Provider value={{ value, setValue }}>
			{children}
		</ScheduleMentorContext.Provider>
	);
}

export default ScheduleMentorProvider;

export const useScheduleMentor = () => {
	return useContext(ScheduleMentorContext);
};
