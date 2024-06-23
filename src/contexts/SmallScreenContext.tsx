import React, {
	createContext,
	useState,
	useContext,
	ReactNode,
	useEffect,
} from "react";

// Define the shape of the context state
interface SmallScreenContextType {
	smallScreen: boolean;
	setSmallScreen: (value: boolean) => void;
}

// Create the context
const SmallScreenContext = createContext<SmallScreenContextType | undefined>(
	undefined
);

// Create the provider component
export const SmallScreenProvider = ({ children }: { children: ReactNode }) => {
	const [smallScreen, setSmallScreen] = useState<boolean>(false);

	return (
		<SmallScreenContext.Provider
			value={{
				smallScreen,
				setSmallScreen,
			}}>
			{children}
		</SmallScreenContext.Provider>
	);
};

// Create a custom hook to use the ChatContext
export const useSmallScreen = (): SmallScreenContextType => {
	const context = useContext(SmallScreenContext);
	if (context === undefined) {
		throw new Error("useSmallScreen must be used within a SmallScreenProvider");
	}
	return context;
};
