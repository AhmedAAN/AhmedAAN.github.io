import { Input } from "./ui/input";
import { FaFilter, FaSearch } from "react-icons/fa";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Label } from "@radix-ui/react-dropdown-menu";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"; // Assume you have these components
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  search: z.string().min(3),
  specialization: z.string().min(1),
  levelOfExperience: z.string().min(1),
});

const yearsExp = ["1-3", "2-5", "3-6"];
const specializations = [
  "full stack mean",
  "full stack mern",
  "Full Stack Java",
  "Full Stack MEAN",
  "Full Stack Django",
  "AI engineer",
];

const Search = ({ filter, setFilter }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
      specialization: filter.specialization || "",
      levelOfExperience: filter.levelOfExperience || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="relative py-3 mx-auto md:w-96">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 basis-full sm:basis-1/3 relative"
        >
          <div>
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Search"
                      {...field}
                      className="px-4 py-6 rounded-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FaSearch className="absolute right-10 top-2" />

          <Dialog>
            <DialogTrigger className="absolute right-0 -top-2" asChild>
              <Button
                variant="outline"
                className="flex justify-start text-black bg-transparent border-none hover:bg-transparent font-normal px-4 py-6"
              >
                <FaFilter size={16} />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px] max-h-[600px] overflow-scroll">
              <DialogHeader>
                <DialogTitle>Years Of Experience</DialogTitle>
              </DialogHeader>
              <div className="grid py-4">
                <FormField
                  control={form.control}
                  name="levelOfExperience"
                  render={({ field }) => (
                    <FormItem>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        {yearsExp.map((year) => (
                          <div
                            key={year}
                            className="grid grid-cols-4 items-center gap-4 p-3 border-b"
                          >
                            <Label className="text-right">{year}</Label>
                            <FormControl>
                              <RadioGroupItem
                                onClick={() => {
                                  setFilter(() => ({
                                    levelOfExperience: year,
                                  }));
                                }}
                                value={year}
                                id={year}
                              />
                            </FormControl>
                          </div>
                        ))}
                      </RadioGroup>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid py-4">
                <h2 className="font-bold">Specialization</h2>
                <FormField
                  control={form.control}
                  name="specialization"
                  render={({ field }) => (
                    <FormItem>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        {specializations.map((el) => (
                          <div
                            key={el}
                            className="grid grid-cols-4 items-center gap-4 p-3 border-b"
                          >
                            <Label className="text-right">{el}</Label>
                            <FormControl>
                              <RadioGroupItem
                                onClick={() => {
                                  setFilter(() => ({
                                    specialization: el,
                                  }));
                                }}
                                value={el}
                                id={el}
                              />
                            </FormControl>
                          </div>
                        ))}
                      </RadioGroup>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-between items-center">
                <Button
                  onClick={() => {
                    setFilter(() => ({
                      specialization: "",
                      levelOfExperience: "",
                    }));
                  }}
                >
                  Clear
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </form>
      </Form>
    </div>
  );
};

export default Search;
