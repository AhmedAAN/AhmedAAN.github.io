import { Link, useNavigate } from "react-router-dom";
import ModeToggle from "./ModeToggle";
import { Button } from "./ui/button";
import { useTheme } from "./ui/theme-provider";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Bell, Menu } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

const Navbar = () => {
  const { theme } = useTheme();
  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between sm:px-16">
      <Link className="logo flex items-center" to="/">
        <img
          src={`${
            theme === "dark"
              ? "/src/assets/logo-dark.svg"
              : "/src/assets/logo.svg"
          }`}
          alt="logo"
          width={32}
          height={32}
        />
        <h1 className="text-primary font-bold text-xl ml-2">Mentor</h1>
      </Link>
      {user ? (
        <div className="flex items-center justify-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="flex items-center justify-center"
              >
                <Bell />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel className="text-center">
                Notifications
              </DropdownMenuLabel>
              <div className="flex justify-between p-2 items-center">
                <span className="font-semibold text-primary text-sm">
                  Today
                </span>
                <span className="text-primary text-xs cursor-pointer">
                  Mark all as read
                </span>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuGroup className="list-none"></DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <ModeToggle />
          <AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="flex items-center justify-center"
                >
                  <Menu />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup className="list-none">
                  <DropdownMenuItem className="py-2 px-4 hover:text-primary transition">
                    <a href="/home" className="active font-semibold">
                      Home
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="py-2 px-4 hover:text-primary transition">
                    <Link to="/home" className="active font-semibold">
                      Mentors
                    </Link>
                  </DropdownMenuItem>
                  {/* <li className="py-2 px-4 hover:text-primary transition font-semibold">
              <a href="#about-us">About Us</a>
              </li> */}
                  <DropdownMenuItem className="py-2 px-4 hover:text-primary transition font-semibold">
                    <a href="#services">Services</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="py-2 px-4 hover:text-primary transition font-semibold">
                    <a href="#reviews">Reviews</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="py-2 px-4 hover:text-primary transition font-semibold">
                    <Link to="contact">Contact Us</Link>
                  </DropdownMenuItem>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem className="py-2 px-4 hover:text-primary transition font-semibold cursor-pointer">
                      Logout
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialogContent>
              <AlertDialogHeader>
                Are you sure you want to logout?
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction
                  onClick={() => {
                    localStorage.removeItem("user");
                    navigate("/");
                  }}
                >
                  Logout
                </AlertDialogAction>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ) : (
        <>
          {/* <ul className="hidden lg:flex">
            <li className="py-2 px-4 hover:text-primary transition">
              <a href="/home" className="active font-semibold">
                Home
              </a>
            </li> */}
          {/* <li className="py-2 px-4 hover:text-primary transition font-semibold">
              <a href="#about-us">About Us</a>
            </li> */}
          {/* <li className="py-2 px-4 hover:text-primary transition font-semibold">
              <a href="/#services">Services</a>
            </li>
            <li className="py-2 px-4 hover:text-primary transition font-semibold">
              <a href="/#reviews">Reviews</a>
            </li>
            <li className="py-2 px-4 hover:text-primary transition font-semibold">
              <Link to="contact">Contact Us</Link>
            </li>
          </ul> */}
          <div className="flex items-center">
            <Link to="/login">
              <Button className="bg-white text-primary border border-primary hover:text-white">
                Login
              </Button>
            </Link>
            <Link to="/sign-up">
              <Button className="mx-2 md:mx-4">Sign up</Button>
            </Link>

            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="ml-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="flex items-center justify-center"
                >
                  <Menu />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup className="list-none">
                  <DropdownMenuItem className="py-2 px-4 hover:text-primary transition">
                    <a href="/home" className="active font-semibold">
                      Home
                    </a>
                  </DropdownMenuItem>
                  {/* <li className="py-2 px-4 hover:text-primary transition font-semibold">
              <a href="#about-us">About Us</a>
            </li> */}
                  <DropdownMenuItem className="py-2 px-4 hover:text-primary transition font-semibold">
                    <a href="#services">Services</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="py-2 px-4 hover:text-primary transition font-semibold">
                    <a href="#reviews">Reviews</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="py-2 px-4 hover:text-primary transition font-semibold">
                    <Link to="contact">Contact Us</Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
