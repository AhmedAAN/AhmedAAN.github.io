import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaLinkedin } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";
import Separator from "@/components/Separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
// import { login } from "@/services/apiAuth";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(50),
  remember: z.boolean().optional(),
});

const LoginForm = () => {

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const res = await fetch("https://radwan.up.railway.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values),
      });
      const data = await res.json();

      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("Logged in successfully");
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/home");
    },
    onError: (error) => {
      toast.error(error.message);
      console.error(error);
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    login(values);
  }
  

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 basis-full sm:basis-1/4 "
      >
        <h2 className="text-center font-bold">Welcome Back !</h2>
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
          name="remember"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <div className="flex items-center justify-start gap-2">
                <Checkbox
                  id={field.name}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <Label htmlFor={field.name} className="font-medium">
                  Remember me
                </Label>
              </div>
              <Link
                to="/forget-password"
                className="text-primary hover:text-primary/90 -translate-y-[0.3rem] font-medium"
              >
                Forget password ?
              </Link>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          size="lg"
          className="w-full bg-primary"
          disabled={isLoggingIn}
        >
          Login
        </Button>
        <Separator />
        <div className="flex gap-6 items-center translate-y-6">
          <Button
            size="lg"
            className="bg-background text-primary hover:text-white border border-primary flex basis-1/2 items-center justify-center"
          >
            <FcGoogle size={20} className="mr-2" />
            Google
          </Button>
          <Button
            size="lg"
            className="bg-background text-primary hover:text-white border border-primary flex basis-1/2 items-center justify-center"
          >
            <FaLinkedin size={20} className="mr-2" />
            LinkedIn
          </Button>
        </div>
        <p className="translate-y-6 flex justify-center items-center gap-2">
          Don’t have an account ?{" "}
          <Link
            className="text-primary hover:text-primary/90 text-sm font-bold"
            to="/sign-up"
          >
            sign up
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default LoginForm;
