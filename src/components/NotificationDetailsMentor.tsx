/** @format */
"use client";

import { NotificationItem, socialMediaActivity } from "./mentorNotificationData";
import { NotificationMentor } from "@/components/NotificationMentor";
import { useState } from "react";

export default function NotificationDetailsStudent() {
    const [notifications, setNotification] =
        useState<NotificationItem[]>(socialMediaActivity);


    function handleMarkAsRead() {
        setNotification(
            notifications.map((notification) => ({ ...notification, read: true }))
        );
    }
    function handleClearAllNotifications() {
        setNotification([]);
    }

    return (
        <main
            className="min-h-screen w-full flex items-center justify-center  sm:p-10  "
        >
            <div className="max-w-2xl mx-auto   pt-8 bg-transparent rounded-md px-2 sm:px-10 ">
                <section className="flex justify-between items-center mb-6  ">
                    <h1 className="text-2xl flex gap-3 items-center font-semibold ">
                        <span className="">Notifications</span>
                    </h1>
                    <span
                        className=" px-[30px] text-gray-500  rounded-md text-lg transition-all "
                    >
                        {
                            notifications.filter((notification) => !notification.read)
                                .length + " new"
                        }
                    </span>
                    <button
                        type="button"
                        onClick={handleMarkAsRead}
                        className="ml-28 hover:text-[hsl(219,85%,26%)]  text-gray-500   "
                    >
                        Mark all as read
                    </button>
                    <div className="ml-4 text-gray-500">|</div>
                    <button
                        type="button"
                        onClick={handleClearAllNotifications}
                        className="ml-4 hover:text-[hsl(219,85%,26%)] text-gray-500"
                    >
                        Clear all
                    </button>
                </section>
                {notifications.map((notification, index) => (
                    <NotificationMentor
                        read={notification.read}
                        key={index}
                        action={notification.action}
                        details={notification.details}
                        timeAgo={notification.timeAgo}
                    />
                ))}
            </div>
        </main>
    );
}