import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import ProfilePic from "./ProfilePic";

import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

interface Profile {
  name: string;
  phone: string;
  email: string;
}

const EditProfileSchema = z.object({
  name: z.string(),
  phone: z.string(),
  email: z.string().email(),
});

const user = JSON.parse(localStorage.getItem("user")!);

const EditStudentProfile = () => {
  const form = useForm<Profile>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      name: user.userName,
      email: user.email,
      phone: "12345678910",
    },
  });

  const onSubmit = async (data: Profile) => {
    try {
      const response = await fetch("https://radwan.up.railway.app/updateOne", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "X-Powered-By": "Express",
          "Access-Control-Allow-Origin": "*",
          "Content-Length": "92",
          ETag: 'W/"5c-XE4LqSKK8lMBgnDPfq7vp2yCSG8"',
          Date: "Fri, 01 Mar 2024 17:54:16 GMT",
          Connection: "keep-alive",
          "Keep-Alive": "timeout=5",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Profile updated successfully");
      } else {
        console.error("Failed to update profile:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 basis-full sm:basis-1/3 relative"
      >
        <Dialog>
          <DialogTrigger asChild>
            <button className="text-secondary-foreground">Edit Profile</button>
          </DialogTrigger>
          <DialogContent className="dialog-content overflow-y-scroll h-screen">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl pt-5">
                Edit Profile
              </DialogTitle>
            </DialogHeader>
            <ProfilePic />
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Name</FormLabel>
                  <FormControl>
                    <Input type="text" id="name" {...field} className="py-6" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      id="email"
                      {...field}
                      className="py-6"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      id="phone"
                      {...field}
                      className="py-6 "
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogClose className="flex justify-center ">
              <Button type="submit" className="w-full py-6 ">
                Submit
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
};

export default EditStudentProfile;
