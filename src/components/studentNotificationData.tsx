/** @format */

export interface NotificationItem {
    action: string;
    details: string;
    timeAgo: string;
    read: boolean;

}

export const socialMediaActivity: NotificationItem[] = [
    {
        action: "Booking Success",
        details: "Congratulations - your appointment is confirmed! We’re looking forward to meeting with you.",
        timeAgo: "1m ago",
        read: false // Set to false for the first notification
    },
    {
        action: "Schedule Changed",
        details: "You have successfully changed your booking with M. Mohamed Abdelaziz. Don’t forget to activate your reminder.",
        timeAgo: "5m ago",
        read: false // Set to false for the second notification
    },
    {
        action: "Video Call Appointment",
        details: "We’ll send a link to join the call at the booking details, so all you need is a computer or mobile device with a camera and an internet connection.",
        timeAgo: "1h",
        read: false // Set to false for the third notification
    },
    {
        action: "Session Cancelled",
        details: "You have successfully cancelled your session with M. Mohamed Abdelaziz.",
        timeAgo: "1h",
        read: true // Set to true for the fourth notification and the rest
    },


    // {
    //     action: "Request Maessege",
    //     details: "You have receive a request messege from somaya ahmed .",
    //     timeAgo: "2h",
    //     read: true // Set to true for the fourth notification and the rest
    // },
    // {
    //     action: "set your schedule ",
    //     details: "You have successfully set your schedule ",
    //     timeAgo: "1 day ago",
    //     read: true // Set to true for the fourth notification and the rest
    // },
    // {
    //     action: "Video Call Appointment",
    //     details: "You have a video call appointment with somaya ahmed at nine o’clock on saturday",
    //     timeAgo: "5 days ago",
    //     read: true // Set to true for the fourth notification and the rest
    // },
    // {
    //     action: "Session Cancelled",
    //     details: "You have successfully cancelled your session with M. Mohamed Abdelaziz.",
    //     timeAgo: "1h",
    //     read: true // Set to true for the fourth notification and the rest
    // },
];
