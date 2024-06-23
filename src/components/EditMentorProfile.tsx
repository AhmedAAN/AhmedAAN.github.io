import { useForm } from "react-hook-form";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  // DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "./ui/textarea";

interface profile {
  name: string;
  phone: number;
  email: number | string;
  specialization: string;
  service: string;
  yearsOfExperience: number;
  linkedInURL: string;
  description: string;
}

const EditProfileSchema = z.object({
  name: z.string(),
  phone: z.number(),
  email: z.string(),
  specialization: z.string(),
  service: z.string(),
  yearsOfExperience: z.number(),
  linkedInURL: z.string(),
  description: z.string(),
});


const EditMentorProfile = () => {
  const form = useForm<z.infer<typeof EditProfileSchema>>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      name: "John Doe",
      email: "john@example.com",
      phone: 12345678910,
      specialization: "frontend",
      service: "mentoring",
      yearsOfExperience: 2,
      linkedInURL: "https://www.linkedin.com",
      description:
        "I've been working with Students remotely for seven years . My experience has likely allowed you to build strong communication skills, enabling me to connect with students , understand their needs, and deliver effective and inspiring sessions. My goal is support stutends in achieving their educational and professional objectives .",
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
            <Button variant="outline">Edit Profile</Button>
          </DialogTrigger>
          <DialogContent className="dialog-content overflow-y-scroll h-screen ">
            <DialogHeader>
              <DialogTitle className="text-center">Edit Profile</DialogTitle>
              {/* <DialogDescription>Edit your profile</DialogDescription> */}
            </DialogHeader>

            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Name</FormLabel>
                  <FormControl>
                    <Input type="text" id="name" {...field} className="py-4" />
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
                      className="py-4"
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
                    <Input type="text" id="phone" {...field} className="py-4" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="specialization"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Specialization</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      id="specialization"
                      {...field}
                      className="py-4"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="yearsOfExperience"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Years of Experience</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      id="linkedInURL"
                      {...field}
                      className="py-4"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="linkedInURL"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="linkedInURL" className="text-sm">
                    LinkedIn URL
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      id="linkedInURL"
                      {...field}
                      className="py-4"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="description" className="text-sm">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="resize-none"
                      placeholder="tell us about yourself"
                    ></Textarea>
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogClose className="flex justify-center pt-2">
              <Button type="button" className="w-full">Update Pofile</Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
};

export default EditMentorProfile;
