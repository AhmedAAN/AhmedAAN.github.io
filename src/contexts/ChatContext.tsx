import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the shape of the context state
interface ChatContextType {
	chat: any;
	setChat: (chat: any) => void;
	typing: boolean;
	setTyping: (typing: boolean) => void;
}

// Create the context
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Create the provider component
export const ChatProvider = ({ children }: { children: ReactNode }) => {
	const [chat, setChat] = useState<any>(null);
	const [typing, setTyping] = useState<boolean>(false);

	return (
		<ChatContext.Provider
			value={{
				chat,
				setChat,
				typing,
				setTyping,
			}}>
			{children}
		</ChatContext.Provider>
	);
};

// Create a custom hook to use the ChatContext
export const useChat = (): ChatContextType => {
	const context = useContext(ChatContext);
	if (context === undefined) {
		throw new Error("useChat must be used within a ChatProvider");
	}
	return context;
};
