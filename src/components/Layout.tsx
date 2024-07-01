import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Layout = () => {
	const location = useLocation();
	if (
		!location.pathname.startsWith("/chats") &&
		!location.pathname.startsWith("/meeting")
	) {
		return (
			<main className="p-4">
				<Navbar />
				<Outlet />
				<Footer />
			</main>
		);
	} else {
		return (
			<main className="">
				<Outlet />
			</main>
		);
	}
};

export default Layout;
