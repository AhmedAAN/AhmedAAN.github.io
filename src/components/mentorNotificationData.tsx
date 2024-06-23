/** @format */

export interface NotificationItem {
    action: string;
    details: string;
    timeAgo: string;
    read: boolean;

}

export const socialMediaActivity: NotificationItem[] = [
    {
        action: "Request Maessege",
        details: "You have receive a request messege from somaya ahmed .",
        timeAgo: "1h",
        read: false // Set to true for the fourth notification and the rest
    },
    {
        action: "set your schedule ",
        details: "You have successfully set your schedule ",
        timeAgo: "2h",
        read: true // Set to true for the fourth notification and the rest
    },
    {
        action: "Video Call Appointment",
        details: "You have a video call appointment with somaya ahmed at nine o’clock on saturday",
        timeAgo: "1 day ago",
        read: false // Set to true for the fourth notification and the rest
    },
    {
        action: "Session Cancelled",
        details: "You have successfully cancelled your session with M. Mohamed Abdelaziz.",
        timeAgo: "3 day ago",
        read: true // Set to true for the fourth notification and the rest
    },
];
