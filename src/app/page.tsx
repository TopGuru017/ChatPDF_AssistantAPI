"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import FileUploader from "@/components/FileUploader";
import ChatRoom from "@/components/ChatRoom";

// const inter = Inter({ subsets: ["latin"] });

const Home = () => {

  const [filepath, setFilepath] = useState<string>('')
  const [threadID, setThreadID] = useState<string>('')
  const [runID, setRunID] = useState<string>('')

  return (
    <main>
      <div className={`${styles.container}`}>
        <h1>File uploader</h1>
        <form>
          <div>
            <h3>Thumbnail</h3>
            <FileUploader 
              setFilepath = {setFilepath}
            />
          </div>
        </form>
        {filepath && (
          <ChatRoom 
            filepath={filepath}
            threadID={threadID}
            setThreadID={setThreadID}
            runID={runID}
            setRunID={setRunID}
          />
        )}
      </div>
    </main>
  );
}

export default Home;