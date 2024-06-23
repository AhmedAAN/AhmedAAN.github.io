export interface User {
  user: string;
  userName: string;
}

export interface Chat {
  lastUsage: Date;
  _id: string;
  users: User[];
  lastMessage: {
    sender: string;
    text: string;
  };
  error: string;
}