import { useState } from "react";
import MessageBox from "./MessageBox";

const ChatRoom = ({
  filepath,
  threadID,
  setThreadID,
  runID,
  setRunID,
}: {
  filepath: string;
  threadID: string;
  setThreadID: (string: string) => void;
  runID: string;
  setRunID: (string: string) => void;
}) => {
  const [startingState, setStartingState] = useState<boolean>(false);

  const startChat = async () => {
    const res = await fetch("api/createChat", {
      method: "POST",
      body: filepath,
    });

    if (res.ok) {
      const data = await res.json();
      setThreadID(data.threadID);
      setRunID(data.runID);
      setStartingState(true);
    }
  };

  return (
    <div>
      <button onClick={startChat}>Start Chat</button>
      {startingState && <MessageBox threadID={threadID} runID={runID} />}
    </div>
  );
};

export default ChatRoom;
