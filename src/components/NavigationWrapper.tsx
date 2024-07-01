import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NavigationWrapper: React.FC = ({ children }) => {
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const redirect = params.get("redirect");

		if (redirect && location.pathname === "/") {
			navigate(redirect, { replace: true });
		}
	}, [navigate, location]);

	// Expose navigate function globally for debugging
	(window as any).navigate = navigate;

	return <>{children}</>;
};

export default NavigationWrapper;
