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
import { useNavigate } from "react-router-dom";
import { useSignup } from "@/contexts/SignupContext";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// const tracks = [
//   {
//     id: "ui/ux",
//     label: "UI/UX",
//   },
//   {
//     id: "frontend",
//     label: "Frontend",
//   },
//   {
//     id: "backend",
//     label: "Backend",
//   },
//   {
//     id: "flutter",
//     label: "Flutter",
//   },
//   {
//     id: "android",
//     label: "Android",
//   },
//   {
//     id: "ios",
//     label: "iOS",
//   },
// ] as const;

const services = [
	{
		id: "mentoring",
		label: "Mentoring",
	},
	{
		id: "consultation",
		label: "Consultation",
	},
	{
		id: "mock-interview",
		label: "Mock Interview",
	},
] as const;

// const levels = [
//   { id: "entry", label: "Entry" },
//   { id: "beginner", label: "Beginner" },
//   { id: "intermediate", label: "Intermediate" },
//   { id: "professional", label: "Professional" },
// ];

const formSchema = z.object({
	specialization: z
		.string()
		.min(3, { message: "username must be at least 3 characters" })
		.max(50, { message: "username is too long!" }),
	services: z.array(z.string()).refine((value) => value.some((item) => item), {
		message: "You have to select at least one service.",
	}),
	experience: z.string(),
	linkedin: z.string().url({
		message: "Please enter a valid linkedin URL",
	}),
	description: z.string(),
	// levels: z.enum(["entry", "beginner", "intermediate", "professional"], {
	//   required_error: "You have to select one level.",
	// }),
});

const MentorSignupForm = () => {
	const { value, setValue } = useSignup()!;
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			specialization: "",
			services: [],
			experience: "",
			linkedin: "",
			description: "",
		},
	});

	const navigate = useNavigate();

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setValue({ ...value, ...values });
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		const res = await fetch("https://radwan.up.railway.app/mentor/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(value),
		});
		const data = await res.json();
		console.log(data);
		navigate("/home");
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-3.5 basis-full sm:basis-1/3 relative">
				<FormField
					control={form.control}
					name="specialization"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Specialization</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter your specialization"
									{...field}
									className="px-4 py-6"
									type="text"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Label htmlFor="services" className="relative top-2.5">
					Service
				</Label>
				<Dialog>
					<DialogTrigger asChild>
						<Button
							variant="outline"
							className="w-full flex justify-start text-[#79859a] font-normal px-4 py-6">
							{form.getValues("services").length
								? form.getValues("services").join(", ")
								: "Enter your service"}
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
								name="services"
								render={() => (
									<FormItem>
										{services.map((service) => (
											<FormField
												key={service.id}
												control={form.control}
												name="services"
												render={({ field }) => (
													<FormItem key={service.id}>
														<div className="flex gap-4 p-4">
															<Checkbox
																id={service.id}
																checked={field.value?.includes(service.id)}
																onCheckedChange={(checked) => {
																	return checked
																		? field.onChange([
																				...field.value,
																				service.id,
																		  ])
																		: field.onChange(
																				field.value?.filter(
																					(value) => value !== service.id
																				)
																		  );
																}}
															/>
															<Label
																htmlFor={service.id}
																className="text-right">
																{service.label}
															</Label>
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
				{/* <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  {...field}
                  type="text"
                  className="px-4 py-6"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
				<FormField
					control={form.control}
					name="experience"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Years of Experience</FormLabel>
							<FormControl>
								<Input {...field} type="text" className="px-4 py-6" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="linkedin"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Linkedin URL</FormLabel>
							<FormControl>
								<Input {...field} type="text" className="px-4 py-6" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Input {...field} type="text" className="px-4 py-6 h-12" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* <Label htmlFor="description" className="relative top-2.5">
          Your track
        </Label>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full flex justify-start text-[#79859a] font-normal px-4 py-6"
            >
              {form.getValues("tracks").length
                ? form.getValues("tracks").join(", ")
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
                name="tracks"
                render={() => (
                  <FormItem>
                    {tracks.map((track) => (
                      <FormField
                        key={track.id}
                        control={form.control}
                        name="tracks"
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
                        <div className="flex items-center space-x-2 p-4 border-t">
                          <RadioGroupItem
                            key={level.id}
                            value={level.id}
                            id={level.id}
                            checked={field.value?.includes(level.id)}
                          />
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
        </Dialog> */}

				<Button type="submit" size="lg" className="w-full bg-primary">
					Sign up
				</Button>
			</form>
		</Form>
	);
};

export default MentorSignupForm;
