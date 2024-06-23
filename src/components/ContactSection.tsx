import { useForm } from "react-hook-form";
import { AiOutlineUser, AiOutlinePhone, AiOutlineMail } from "react-icons/ai";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "./ui/textarea";
interface FormData {
  name: string;
  email: string | number;
  phone: number;
  message: string | number;
}
const EditProfileSchema = z.object({
  name: z.string(),
  phone: z.number(),
  email: z.string(),
  message: z.string(),
});
const ContactSection = () => {
  const form = useForm<z.infer<typeof EditProfileSchema>>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      name: "John Doe",
      email: "john@example.com",
      phone: 12345678910,
      message: "",
    },
  });
  const onSubmit = (data: FormData) => {
    console.log(data); // Handle form submission here
  };
  // const {
  //     register,
  //     formState: { errors },
  // } = useForm<FormData>();
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 basis-full sm:basis-1/3 relative py-14"
      >
        <div className=" mx-auto overflow-hidden my-10 w-full md:w-1/3 border rounded-lg shadow-lg">
          <div className=" px-4 py-2 my-3">
            <h1 className="text-3xl font-semibold m-5 text-center text-primary">
              Contact Us
            </h1>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="text-sm">Name</FormLabel>
                  <FormControl>
                    <Input type="text" id="name" {...field} className="py-6" />
                  </FormControl>
                  <AiOutlineUser className="absolute top-12 right-3 transform -translate-y-1/2 text-gray-400" />
                </FormItem>
              )}
            />
            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="text-sm">Phone number</FormLabel>
                  <FormControl>
                    <Input type="tel" id="phone" {...field} className="py-6" />
                  </FormControl>
                  <AiOutlinePhone className="absolute top-12 right-3 transform -translate-y-1/2 text-gray-400" />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="text-sm">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      id="email"
                      {...field}
                      className="py-6"
                      // {...register("email", { required: "Email is required" })}
                    />
                  </FormControl>
                  <AiOutlineMail className="absolute top-12 right-3 transform -translate-y-1/2 text-gray-400" />
                  {/* {errors.email && (
                                        <span className="text-red-500 text-sm">{errors.email.message}</span>
                                    )} */}
                </FormItem>
              )}
            />
            <FormField
              name="message"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Your Message</FormLabel>
                  <Textarea
                    id="message"
                    {...field}
                    // {...register("message", { required: "Message is required" })}
                    rows={5}
                    className="opacity-70 bg-transparent w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-indigo-500"
                  ></Textarea>
                  {/* {errors.message && (
                                        <span className="text-red-500 text-sm">{errors.message.message}</span>
                                    )} */}
                </FormItem>
              )}
            />
            <Button
              type="submit"
              size="lg"
              className="w-full py-7 text-lg bg-primary mt-5 "
            >
              Send
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ContactSection;
