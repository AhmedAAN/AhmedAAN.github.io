import React, { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "./components/ui/theme-provider";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout";
import Mentor from "./pages/Mentor";
import Dashboard from "./pages/Dashboard";
import Payment from "./pages/Payment";
import SelectTimeAvailable from "./pages/SelectTimeAvailable";
import MentorSignup from "./pages/MentorSignup";
import StudentProfile from "./pages/StudentProfile";
import MentorProfile from "./pages/MentorProfile";
import Loader from "./components/Loader";
import ForgetPassword from "./pages/ForgetPassword";
import SignupProvider from "./contexts/SignupContext";
import StudentNotifications from "./pages/StudentNotifications";
import Chats from "./pages/Chats";
import Meeting from "./pages/Meeting";
import MentorNotifications from "./pages/MentorNotifications";
import { socket } from "./socket";
// import EditMentorProfile from "./components/EditMentorProfile";
import TestChat from "./components/realtime/TestChat";
import ChatTest from "./pages/ChatTest";
import { SmallScreenProvider } from "./contexts/SmallScreenContext";
import BookingsMentorProvider from "./contexts/BookingsMentorContext";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import CalendarPage from "./pages/Calendar";
const LandingPage = lazy(() => import("./pages/LandingPage"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Contact = lazy(() => import("./pages/Contact"));
const Homepage = lazy(() => import("./pages/Homepage"));

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 60 * 1000,
		},
	},
});

const App = () => {
	const [isConnected, setIsConnected] = useState(socket.connected);
	const [messageEvent, setMessageEvent] = useState<any[]>([]);

	useEffect(() => {
		socket.connect();
		return () => {
			socket.disconnect();
		};
	}, []);

	useEffect(() => {
		function onConnect() {
			setIsConnected(true);
		}

		function onDisconnect() {
			setIsConnected(false);
		}

		function onMessageEvent(value: any) {
			setMessageEvent(value);
		}

		socket.on("connect", onConnect);
		socket.on("disconnect", onDisconnect);
		socket.on("get chats", onMessageEvent);

		return () => {
			socket.off("connect", onConnect);
			socket.off("disconnect", onDisconnect);
			socket.off("get chats", onMessageEvent);
		};
	}, [messageEvent]);
  return (
    <Suspense fallback={<Loader />}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <SignupProvider>
          <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <BookingsMentorProvider>
              <BrowserRouter>
                <SmallScreenProvider>
                  <Routes>
                    <Route element={<Layout />}>
                      <Route index path="/" element={<LandingPage />} />
                      <Route element={<ProtectedRoutes />}>
                        <Route
                          path="mentor/:id"
                          element={<Mentor messageEvent={messageEvent} />}
                        />
                        <Route path="contact" element={<Contact />} />
                        <Route path="home" element={<Homepage />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="payment" element={<Payment />} />
                        <Route
                          path="studentprofile"
                          element={<StudentProfile />}
                        />
                        <Route
                          path="testchat"
                          element={
                            <TestChat
                              isConnected={isConnected}
                              messageEvent={messageEvent}
                            />
                          }
                        />
                        <Route
                          path="mentorprofile"
                          element={
                            <MentorProfile _id="65dd99b0e731f3477cb5bcb4" />
                          }
                        />
                        <Route path="meeting/:id" element={<Meeting />} />
                        <Route path="chatTest" element={<ChatTest />} />
                        <Route
                          path="selectavailable"
                          element={<SelectTimeAvailable />}
                        />
                        <Route
                          path="studentnotifications"
                          element={<StudentNotifications />}
                        />
                        <Route
                          path="mentornotifications"
                          element={<MentorNotifications />}
                        />
                        <Route
                          path="chats"
                          element={<Chats isConnected={isConnected} />}
                        />
                        <Route
                          path="chats/:id"
                          element={<Chats isConnected={isConnected} />}
                        />
                      <Route path="chatTest" element={<ChatTest />} />
											<Route
												path="testchat"
												element={
													<TestChat
														isConnected={isConnected}
														messageEvent={messageEvent}
													/>
												}
											/>
                      </Route>
                      <Route path="booking">
                        <Route
                          path="calendar/:id"
                          element={<CalendarPage />}
                        ></Route>
                        <Route
                          path=":id/timeslots/:day"
                          element={<SelectTimeAvailable />}
                        ></Route>
                      </Route>
                      <Route path="login" element={<Login />} />
                      <Route path="sign-up" element={<SignUp />} />
                      <Route path="sign-up/mentor" element={<MentorSignup />} />
                      <Route
                        path="forget-password"
                        element={<ForgetPassword />}
                      />
                    </Route>
                  </Routes>
                </SmallScreenProvider>
              </BrowserRouter>
              <Toaster
                position="top-center"
                gutter={12}
                containerStyle={{ margin: "8px" }}
                toastOptions={{
                  success: {
                    duration: 3000,
                  },
                  error: {
                    duration: 5000,
                  },
                  style: {
                    fontSize: "16px",
                    maxWidth: "500px",
                    padding: "16px 24px",
                    backgroundColor: "white",
                    color: "black",
                  },
                }}
              />
            </BookingsMentorProvider>
          </ThemeProvider>
        </SignupProvider>
      </QueryClientProvider>
    </Suspense>
  );
};

export default App;
