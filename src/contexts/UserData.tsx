import { createContext, useState, useContext, ReactNode } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [userData, setUserData] = useState(null);

	return (
		<UserContext.Provider value={{ userData, setUserData }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => {
	return useContext(UserContext);
};
