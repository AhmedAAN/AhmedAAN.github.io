import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm, FormProvider } from "react-hook-form";
import { FaRegStar, FaStar } from "react-icons/fa";
import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import StarRating from "./StarRating";
import { Button } from "./ui/button";
import { useCookies } from "react-cookie";
import Loader from "./Loader";

const formSchema = z.object({
  stars: z
    .number()
    .min(0, { message: "Rating must be at least 0 stars" })
    .max(5, { message: "Rating cannot be more than 5 stars" }),
  comment: z
    .string()
    .min(6, { message: "Comment must be at least 6 characters" }),
});

const Reviews = ({
  mentorId,
  mentorService,
}: {
  mentorId: string;
  mentorService: string;
}) => {
  const [cookie, setCookie] = useCookies();
  const { isLoading, data } = useQuery({
    queryKey: ["mentorReviews", mentorId],
    queryFn: async () => {
      const res = await fetch(
        `https://radwan.up.railway.app/reviews/${mentorId}`
      );
      const data = await res.json();
      return data;
    },
  });

  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stars: 0,
      comment: "",
    },
  });
  console.log();
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    values = {
      ...values,
      service: mentorService ? mentorService : data.reviews[0].service,
    };
    console.log(values);

    fetch(`https://radwan.up.railway.app/review/${mentorId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie.io}`,
      },
      credentials: "include",

      body: JSON.stringify(values),
    })
      .then((res) => {
        if (res.ok) {
          window.location.reload();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (isLoading) return <Loader />;

  return (
    <section className="text-center pt-10 pb-28 flex justify-between items-start">
      <div className="w-1/2">
        {data.reviews.length > 0 ? (
          data.reviews.map((el: any) => (
            <div key={el._id} className="border p-4 m-2 rounded-lg flex">
              <div className="flex items-center gap-2">
                <img
                  className="w-[60px] rounded-full h-[60px]"
                  src={el.reviewerAvatar || "/src/assets/mentor-1.webp"}
                  alt={`${el.reviewerName}'s avatar`}
                />
                <div className="flex flex-col items-start justify-between gap-2">
                  <div>
                    <p className="text-black font-bold text-lg">
                      {el.reviewerName}
                    </p>
                    <p className="flex">
                      {Array.from({ length: 5 }, (_, index: number) =>
                        5 - index > Number(el.stars) ? (
                          <FaRegStar key={index} className="text-yellow-300" />
                        ) : (
                          <FaStar key={index} className="text-yellow-300" />
                        )
                      ).reverse()}
                    </p>
                  </div>
                  <p>{el.comment}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="p-4 m-2 rounded-lg flex font-bold text-2xl">
            no reviews yet
          </p>
        )}
      </div>

      {/* {data.map((el: any) => (
        <div key={el._id} className="border p-4 m-2 rounded-lg flex">
          <div className="flex items-center gap-2">
            <img
              className="w-[60px] rounded-full h-[60px]"
              src={el.reviewerAvatar || "/src/assets/mentor-1.webp"}
              alt={`${el.reviewerName}'s avatar`}
            />
            <div className="flex flex-col items-start justify-between gap-2">
              <div>
                <p className="text-black font-bold text-lg">
                  {el.reviewerName}
                </p>
                <p className="flex">
                  {Array.from({ length: 5 }, (_, index: number) =>
                    5 - index > Number(el.stars) ? (
                      <FaRegStar key={index} className="text-yellow-300" />
                    ) : (
                      <FaStar key={index} className="text-yellow-300" />
                    )
                  ).reverse()}
                </p>
              </div>
              <p>{el.comment}</p>
            </div>
          </div>
        </div>
      ))} */}

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="space-y-2 basis-full sm:basis-1/3 w-[400px] mx-auto relative border p-4 mt-2 rounded-sm"
        >
          <h2 className="text-center font-bold">Add Review</h2>
          <div>
            <FormField
              control={methods.control}
              name="stars"
              render={({ field }) => (
                <FormItem className="mx-auto flex justify-center items-center flex-col m-6">
                  <FormLabel>Your Rating</FormLabel>
                  <FormControl>
                    <StarRating value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={methods.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your comment"
                      {...field}
                      className="px-4 py-6"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="btn btn-primary">
            Submit
          </Button>
        </form>
      </FormProvider>
    </section>
  );
};

export default Reviews;
