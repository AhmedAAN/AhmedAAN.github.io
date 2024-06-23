/** @format */
import { NotificationItem } from "./mentorNotificationData";
import clsx from "clsx";

export function NotificationMentor({
    action,
    details,
    timeAgo,
    read,
}: NotificationItem) {
    return (
        <div
            className={clsx("p-4 transition-all rounded-md mb-4", {
                "bg-blue-100": !read
            }, { "border-b ": read }
            )}
        >
            <div className="flex items-start gap-2 w-full  ">
                <section className="flex flex-col w-full  ">
                    <div className="flex w-full justify-between gap-2">
                        <div className="mb-2 space-x-2 ">
                            <span className={clsx("font-bold", {
                                "text-black": !read
                            }
                            )}>
                                {action}
                            </span>
                            {/* red notification */}
                            {!read && (
                                <span className="bg-red-500 h-2 w-2 min-w-2 inline-block rounded-full" />
                            )}
                        </div>
                        {/* time */}
                        <span
                            className="text-gray-500 text-sm"
                        >
                            {timeAgo}
                        </span>
                    </div>
                    <div className="mb-2 space-x-2">
                        <span className="text-gray-600">{details}</span>
                    </div>
                </section>
            </div>
        </div>
    );
}
