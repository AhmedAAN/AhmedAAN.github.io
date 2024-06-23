import {
  AiOutlineUser,
  AiOutlineDelete,
  AiOutlineDown,
  AiOutlineKey,
} from "react-icons/ai";
import { Separator } from "@/components/ui/separator";
import PasswordManager from "./PasswordManager";
import DeleteAccount from "./DeleteAccount";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

const Settings = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className='text-secondary-foreground'>Settings</button>
      </DialogTrigger>
      <DialogContent className="dialog-content  ">
        <div className="mb-2 flex justify-between items-center mx-12 ">
          <div className="flex justify-start items-center gap-4">
            <AiOutlineUser />
            <p>Notification Settings</p>
          </div>
          <AiOutlineDown />
        </div>
        <Separator className="mb-2" />
        <div className="mb-2 flex justify-between items-center	mx-12">
          <div className="flex justify-start items-center gap-3">
            <AiOutlineKey />
            <PasswordManager />
          </div>
          <AiOutlineDown />
        </div>
        <Separator className="mb-2" />
        <div className="mb-5 flex justify-between items-center	mx-12">
          <div className="flex justify-start items-center ">
            <AiOutlineDelete />
            <DeleteAccount />
          </div>
          <AiOutlineDown />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Settings;
