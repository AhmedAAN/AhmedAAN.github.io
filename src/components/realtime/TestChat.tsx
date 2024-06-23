import { useEffect } from "react";
import { ConnectionState } from "./ConnectionState";
import { ConnectionManager } from "./ConntectionManager";
import { Events } from "./Events";
import { socket } from "@/socket";

function TestChat({ isConnected, messageEvent }: any) {
  return (
    <div className="h-[calc(100vh-56px)] flex flex-col items-center justify-center">
      <ConnectionState isConnected={isConnected} />
      <Events events={messageEvent} />
      <ConnectionManager />
      <button
        onClick={() => {
          socket.emit("get chats", { page: 1 });
          console.log(messageEvent);
        }}
      >
        get Chats
      </button>
    </div>
  );
}

export default TestChat;
