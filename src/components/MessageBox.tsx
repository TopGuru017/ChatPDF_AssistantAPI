import { useState } from "react";
import { SyncLoader } from "react-spinners";
const MessageBox = ({
    threadID, runID
}: {
    threadID: string
    runID: string
}) => {
    
    const [input, setInput] = useState<string>('')
    const [message, setMessage] = useState<any>([])

    const handleInput = (event: any) => {
        setInput(event.target.value)
    }

    const handleSend = async () => {
        setInput("")
        if(!(input.trim() === "")){
            setMessage((message: any) => [
                ...message,
                {user: "User", text: input},
                {user: "Bot", text: "LOADING"}
            ])
            const data = JSON.stringify({
                input: input,
                threadID: threadID,
                runID: runID
            })
            const res = await fetch('api/chatResponse', {
                method: "POST",
                body: data
            })
            
            const response = await res.json()
            
            console.log(response)
            setMessage((message: any) => [
                ...message.filter((item: any) => item.text !== "LOADING"),
                {user: "BOT", text: response}
            ])
        }
    }

    return(
        <div>
            <h1>MessageBox</h1>
            <div>
            {
              message.map((element: any, idx: any) =>
                element.user == 'USER'
                  ? <div key={idx} style={{ padding: '10px 10px 10px 10px' }}>

                    <p style={{ backgroundColor: 'white', color: 'black' }}>{element.text}</p>
                  </div>
                  : <div style={{ padding: '10px 10px 10px 10px' }}>{element.text === "LOADING" ? <p><SyncLoader color="#d2d2d2" size={12} /></p> : element.text.split("\n").map((item: any, idx: any) => <p key={idx} style={{ backgroundColor: 'white', color: 'black' }}>{item}</p>)}</div>
              )
            }
            </div>
            <input type="text" onChange={handleInput} />
            <button onClick={handleSend}>Send</button>
        </div>
    )
}

export default MessageBox;