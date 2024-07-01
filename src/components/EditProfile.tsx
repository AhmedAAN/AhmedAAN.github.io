import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const EditProfileSchema = z.object({
  userName: z.string().nonempty("Name is required"),
  image: z.any().optional(),
});

const EditMentorProfile = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const user = JSON.parse(localStorage.getItem("user")!);

  const form = useForm<z.infer<typeof EditProfileSchema>>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      userName: user.userName || "",
      image: null,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      form.setValue("image", file);
    }
  };

  const onSubmit = async (data: z.infer<typeof EditProfileSchema>) => {
    const formData = new FormData();
    formData.append("userName", data.userName);
    if (data.image) {
      formData.append("image", data.image);
    }

    try {
      const res = await fetch("https://radwan.up.railway.app/updateOne", {
        method: "PATCH",
        body: formData,
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });

      if (res.ok) {
        const result = await res.json();
        console.log("Profile updated successfully", result);
      } else {
        const errorText = await res.text();
        console.error("Failed to update profile:", errorText);
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="dialog-content overflow-y-scrol py-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 basis-full sm:basis-1/3 relative"
          >
            <DialogHeader>
              <DialogTitle className="text-center">Edit Profile</DialogTitle>
            </DialogHeader>

            <FormField
              name="userName"
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
            <FormItem>
              <FormLabel className="text-sm">Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  id="image"
                  onChange={handleImageChange}
                  className="py-4"
                />
              </FormControl>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="mt-2 w-32 h-32 object-cover"
                />
              )}
            </FormItem>
            <Button type="submit" className="w-full">
              Update Profile
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMentorProfile;
