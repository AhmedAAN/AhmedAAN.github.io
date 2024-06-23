import { FiPhoneCall } from "react-icons/fi";
import { TbUserEdit } from "react-icons/tb";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";


const Payment = () => {
  return (
    <>
     <div className="flex flex-col justify-start items-center w-full  gap-10 ">
     <div className=" flex flex-col justify-start items-center  w-1/3">

                  <div className="flex flex-col items-center justify-center w-full">
          <h1 className="text-center font-bold text-2xl p-12">Personal information</h1>
          <div className=" flex flex-col items-start justify-start w-full gap-[15px]">
            <Label htmlFor="Name">Name</Label>
            <TbUserEdit  className=" absolute top-1/3 -translate-y-[2px] translate-x-2 text-slate-500"/>
            <Input className=" h-14 gap-4 px-8"
              type="text"
              name="name"
              placeholder="Enter your name" />
          </div>
        </div>
        <div className="flex flex-col items-start justify-start w-full gap-4 py-4">
          <Label htmlFor="phone">Phone</Label>
          <FiPhoneCall className=" absolute top-1/2 -translate-y-[15px] translate-x-2 text-slate-500"/>
          <Input
            name="phone"
            placeholder="(201) 555-0123"
            className="  h-14 px-8" />
        </div>
      </div>
      <div className=" flex flex-col items-center justify-start w-full gap-8">
        <div className="  flex flex-col items-center justify-start w-[45%] pt-1.5 gap-[22px] ">
          <h2 className="font-bold  text-2xl">Payment methods</h2>
          <p className=" font-medium text-gray-500">choose the right method for you</p>
        </div>
        <div className="flex flex-col items-center justify-start w-full gap-6 ">
          <div className="flex flex-col items-center justify-start w-1/3 gap-6 ">
            <Input type="text" name="name" placeholder="Card Holder Name" className=" h-14" />
            <Input type="number" name="cardnumber" placeholder="Card Number" className=" h-14" />
          </div>
          <div className="flex flex-row items-center justify-start w-1/3 gap-8">

            <Input name="expirymmyy" placeholder="Expiry(MM/YY)" className=" h-14" />
            <Input name="CVC" placeholder="CVC" className=" h-14" />
          </div>
        </div>
      </div>
    </div>
    <div className=" flex flex-col justify-start items-center py-8">
    <Button color="blue_gray_700" className="   font-bold w-1/3 rounded-[5px] h-14 "> I Pay now</Button>
    </div>
    </>
);
};
export default Payment;
