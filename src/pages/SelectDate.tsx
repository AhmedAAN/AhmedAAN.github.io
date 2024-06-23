import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import React from "react";
import { BiChevronRight } from "react-icons/bi";

const SelectDate = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const handleClick = () => {
    if (date) {
      const formattedDate = date.toLocaleDateString();
      console.log(formattedDate);
    }
  };
  return (
    <>
      <div className=" flex flex-col items-center justify-start w-auto gap-[49%] p-10 bg-white-A700 ">
        <p className="mt-[17px] text-base text-slate-600">STEP 1 of 3</p>
        <div className="flex flex-row justify-between items-start w-full pl-20 max-w-[1677px]">
          <div className="flex flex-col items-start justify-start w-[27%] gap-[55px]">
            <div className="flex flex-col items-start justify-start w-full gap-10">
              <div className="flex flex-row justify-start w-full pt-8 pb-[31px] border-gray-500 border-b border-solid">
                <div className="flex flex-row justify-start items-center w-full gap-4">
                  <img
                    src="src/assets/mentor-1.webp"
                    alt="circleimage"
                    className="h-32 w-32 rounded-[50%]"
                  />
                  <div className="flex flex-col items-start justify-center w-[70%] gap-[25px] py-[23px]">
                    <div className="flex flex-row justify-start">
                      <h1 className="mt-px w-52">Mohamed Abdelaziz</h1>
                    </div>
                    <p className=" text-zinc-500">Frontend</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-start">
                <h2 className="  w-52  text-xl">30-mins 1:1 Session</h2>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start w-[40%] ">
              <p className=" text-gray-600">Session duration</p>
              <div className="flex flex-row justify-start">
                <h3 className="mt-px">30 minutes</h3>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start w-[60%] gap-[25px]">
              <p className=" text-gray-500 ">About</p>
              <div className="flex flex-row justify-start pt-[5px]">
                <h4 className=" text-1xl">General mentorship</h4>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-start w-[54%] gap-12 border-gray-600 border-l border-solid">
            <div className="flex flex-col items-center justify-start w-4/5 gap-10">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
              <Button
                color="blue_gray_700"
                size="lg"
                className="font-bold  w-[550px]"
                onClick={handleClick}
              >
                next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SelectDate;
