import React, {useState} from "react";

function Chat() {
    const [prompt, setPrompt] = useState("");
    const [responses, setResponses] = useState([]);

    const chatWithMistrake = async () => {
        try {
            const response = await fetch('http://localhost:8080/ask-ai?prompt=' + encodeURIComponent(prompt));  

        
            const data = await response.text();
            console.log("Mistrake response:", data);
            setResponses([...responses, {prompt: prompt, response: data}]);
            setPrompt("");
        } catch (error) {
            console.error("Error chatting with Mistrake:", error);
        }
    }
  return (
    <div>
      <h2>Chat With Mistrake</h2>
      <input type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Type your message here..."  
        />
      <button onClick={() => {chatWithMistrake()}}>
        Send
      </button> 
        <div className="chat-responses">  
          {responses.map((msg, index) => (
            <div key={index}>
              <p><strong>User:</strong> {msg.prompt}</p>
              <p><strong>Mistrake:</strong> {msg.response}</p>
            </div>
          ))}
        </div>
      </div>
    );
}

export default Chat;
