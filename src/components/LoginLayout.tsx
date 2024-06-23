// import Navbar from "./Navbar";

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-dvh p-4">
      {/* <Navbar auth={true} /> */}
      <section className="flex justify-center items-center sm:gap-20 h-[calc(100%-56px)] ">
        {children}
      </section>
    </div>
  );
};

export default LoginLayout;
