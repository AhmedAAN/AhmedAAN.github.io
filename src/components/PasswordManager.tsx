import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";

import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"

interface profile {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const EditProfileSchema = z
  .object({
    currentPassword: z.string().min(4),
    newPassword: z.string().min(4),
    confirmNewPassword: z.string().min(4),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ["confirmNewPassword"], // path of error
  });
// EditProfileSchema.parse({ newPassword: "asdf", confirmNewPassword: "qwer" });

const PasswordManager = () => {
  const form = useForm<z.infer<typeof EditProfileSchema>>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });
  const onSubmit = (data: profile) => {
    console.log(data); // Handle form submission here
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 basis-full sm:basis-1/3 relative"
      >
        <Dialog>
          <DialogTrigger asChild>
            <button className="w-36">Password Manager</button>
          </DialogTrigger>
          <DialogContent className="dialog-content">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl pt-5">
                Password Manager
              </DialogTitle>
            </DialogHeader>
            <FormField
              name="currentPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Current Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      id="currentPassword"
                      {...field}
                      className="py-6"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="newPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      id="newPassword"
                      {...field}
                      className="py-6"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="confirmNewPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">
                    Confirm New Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      id="currentNewPassword"
                      {...field}
                      className="py-6 "
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
};

export default PasswordManager;
