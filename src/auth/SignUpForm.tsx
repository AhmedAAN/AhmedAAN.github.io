import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useNavigate } from "react-router-dom";
import { useSignup } from "@/contexts/SignupContext";

import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const tracks = [
  {
    id: "ui/ux",
    label: "UI/UX",
  },
  {
    id: "frontend",
    label: "Frontend",
  },
  {
    id: "backend",
    label: "Backend",
  },
  {
    id: "flutter",
    label: "Flutter",
  },
  {
    id: "android",
    label: "Android",
  },
  {
    id: "ios",
    label: "iOS",
  },
] as const;

const levels = [
  { id: "entry", label: "Entry" },
  { id: "beginner", label: "Beginner" },
  { id: "intermediate", label: "Intermediate" },
  { id: "professional", label: "Professional" },
];

const roles = [
  { id: "student", label: "Student" },
  { id: "mentor", label: "Mentor" },
];

const formSchema = z.object({
  userName: z
    .string()
    .min(3, { message: "username must be at least 3 characters" })
    .max(50, { message: "username is too long!" }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "password must be at least 3 characters" })
    .max(50, { message: "password is too long!" }),
  confirmPassword: z
    .string()
    .min(8, { message: "password must be at least 3 characters" })
    .max(50, { message: "password is too long!" }),
  specialization: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
  levels: z.enum(["entry", "beginner", "intermediate", "professional"], {
    required_error: "You have to select one level.",
  }),
  role: z.enum(["student", "mentor"], {
    required_error: "You have to select one role.",
  }),
});

const SignUpForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      specialization: [],
      levels: "entry",
      role: "student",
    },
  });

  const navigate = useNavigate();
  const { value, setValue } = useSignup()!;

  const { mutate: signup, isPending: isSigningUp } = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const res = await fetch("https://radwan.up.railway.app/student/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("Account created successfully");
      navigate("/login");
    },
    onError: (error) => {
      console.error(error);
      toast.error("An error occurred");
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // fetch("http://localhost:3000/users", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(values),
    // })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
    if (form.getValues("role") === "student") {
      signup(values);
      // navigate("/login");
      return;
    } else {
      console.log(values);
      setValue({ ...value, ...values });
      console.log(value);
      navigate("/sign-up/mentor");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-1 basis-full sm:basis-1/3 relative"
      >
        <h2 className="text-center font-bold">Create account</h2>
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your name"
                  {...field}
                  className="px-4 py-6"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  {...field}
                  type="email"
                  className="px-4 py-6"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="*********"
                  {...field}
                  type="password"
                  className="px-4 py-6"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="*********"
                  {...field}
                  type="password"
                  className="px-4 py-6"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Label htmlFor="tracks" className="relative top-2.5">
          Your track
        </Label>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full flex justify-start text-[#79859a] font-normal px-4 py-6"
            >
              {form.getValues("specialization").length
                ? form.getValues("specialization").join(", ")
                : "Enter your track"}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Enter your track</DialogTitle>
              <DialogDescription>
                Choose the track you interested in.
              </DialogDescription>
            </DialogHeader>
            <div className="grid  py-4">
              <FormField
                control={form.control}
                name="specialization"
                render={() => (
                  <FormItem>
                    {tracks.map((track) => (
                      <FormField
                        key={track.id}
                        control={form.control}
                        name="specialization"
                        render={({ field }) => (
                          <FormItem key={track.id}>
                            <div className="grid grid-cols-4 items-center gap-4 p-3 border-b">
                              <Label htmlFor={track.id} className="text-right">
                                {track.label}
                              </Label>
                              <Checkbox
                                id={track.id}
                                checked={field.value?.includes(track.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, track.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== track.id
                                        )
                                      );
                                }}
                              />
                            </div>
                          </FormItem>
                        )}
                      />
                    ))}
                  </FormItem>
                )}
              />
            </div>
            <DialogClose className="flex justify-end">
              <Button type="button">Done</Button>
            </DialogClose>
          </DialogContent>
        </Dialog>

        <Label htmlFor="tracks" className="relative top-2.5">
          Your level
        </Label>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full flex justify-start text-[#79859a] font-normal px-4 py-6"
            >
              {form.getValues("levels")}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Enter your level</DialogTitle>
              <DialogDescription>
                Select the level of experience you have.
              </DialogDescription>
            </DialogHeader>
            <div className="grid py-4">
              <FormField
                control={form.control}
                name="levels"
                render={({ field }) => (
                  <FormItem>
                    <RadioGroup
                      key={field.name}
                      defaultValue="entry"
                      className="gap-0"
                      onValueChange={field.onChange}
                    >
                      {levels.map((level) => (
                        <div
                          className="flex items-center space-x-2 p-4 border-t"
                          key={level.id}
                        >
                          <FormControl>
                            <RadioGroupItem
                              value={level.id}
                              id={level.id}
                              checked={field.value?.includes(level.id)}
                            />
                          </FormControl>
                          <Label htmlFor={level.id} className="cursor-pointer">
                            {level.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormItem>
                )}
              />
            </div>
            <DialogClose className="flex justify-end">
              <Button type="button">Done</Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
        <Label htmlFor="role" className="relative top-2.5">
          Your role
        </Label>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full flex justify-start text-[#79859a] font-normal px-4 py-6"
            >
              {form.getValues("role")}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Enter your role</DialogTitle>
              <DialogDescription>
                Choose whether you are a mentor or a student.
              </DialogDescription>
            </DialogHeader>
            <div className="grid py-4">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <RadioGroup
                      key={field.name}
                      defaultValue="student"
                      className="gap-0"
                      onValueChange={field.onChange}
                    >
                      {roles.map((role) => (
                        <div
                          className="flex items-center space-x-2 p-4 border-t"
                          key={role.id}
                        >
                          <FormControl>
                            <RadioGroupItem
                              value={role.id}
                              id={role.id}
                              checked={field.value?.includes(role.id)}
                            />
                          </FormControl>
                          <FormMessage />
                          <Label htmlFor={role.id} className="cursor-pointer">
                            {role.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormItem>
                )}
              />
            </div>
          </DialogContent>
        </Dialog>

        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms">I Agree to the terms and conditions</Label>
        </div>
        <Button
          type="submit"
          size="lg"
          className="w-full bg-primary"
          disabled={isSigningUp}
        >
          Continue
        </Button>
        {/* <Dialog>
          <DialogTrigger asChild>
            <Button type="submit" size="lg" className="w-full bg-primary">
              Continue
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Select your role</DialogTitle>
              <DialogDescription>
                please choose whether you are a mentor or a student.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex justify-end">
              <Button type="button" onClick={() => setRole("mentor")}>
                Mentor
              </Button>
              <Button type="button" onClick={() => setRole("student")}>
                Student
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog> */}
      </form>
    </Form>
  );
};

export default SignUpForm;

{
  /* <Dialog>
          <DialogTrigger asChild formMethod="dialog">
            <Button
              variant="outline"
              className="w-full flex justify-start text-[#79859a] font-normal"
            >
              Enter your track
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Enter your track</DialogTitle>
              <DialogDescription>
                Choose the track you interested in.
              </DialogDescription>
            </DialogHeader>
            <div className="grid  py-4">
              <div className="grid grid-cols-4 items-center gap-4 p-3 border-b">
                <Label htmlFor="name" className="text-right">
                  UI/UX
                </Label>
                <Checkbox />
              </div>
              <div className="grid grid-cols-4 items-center gap-4 p-3 border-b">
                <Label htmlFor="username" className="text-right">
                  Frontend
                </Label>
                <Checkbox />
              </div>
              <div className="grid grid-cols-4 items-center gap-4 p-3 border-b">
                <Label htmlFor="username" className="text-right">
                  Backend
                </Label>
                <Checkbox />
              </div>
              <div className="grid grid-cols-4 items-center gap-4 p-3 border-b">
                <Label htmlFor="username" className="text-right">
                  Flutter
                </Label>
                <Checkbox />
              </div>
              <div className="grid grid-cols-4 items-center gap-4 p-3 border-b">
                <Label htmlFor="username" className="text-right">
                  Android
                </Label>
                <Checkbox />
              </div>
              <div className="grid grid-cols-4 items-center gap-4 p-3 border-b">
                <Label htmlFor="username" className="text-right">
                  iOS
                </Label>
                <Checkbox />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog> */
}

{
  /* <RadioGroup defaultValue="entry" className="gap-0">
                <div className="flex items-center space-x-2 p-4 border-t">
                  <RadioGroupItem value="entry" id="entry" />
                  <Label htmlFor="entry">Entry</Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border-t">
                  <RadioGroupItem value="beginner" id="beginner" />
                  <Label htmlFor="beginner">Beginner</Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border-t">
                  <RadioGroupItem value="intermediate" id="intermediate" />
                  <Label htmlFor="intermediate">Intermediate</Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border-t">
                  <RadioGroupItem value="professional" id="professional" />
                  <Label htmlFor="professional">Professional</Label>
                </div>
              </RadioGroup> */
}
