import React, { useState } from "react";
import styles from "./Chat.module.css";

function Chat() {
  const [prompt, setPrompt] = useState("");
  const [responses, setResponses] = useState([]);

  const chatWithMistrake = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/ask-ai?prompt=" + encodeURIComponent(prompt)
      );
      const data = await response.text();

      setResponses([...responses, { prompt, response: data }]);
      setPrompt("");
    } catch (error) {
      console.error("Error chatting with Mistrake:", error);
    }
  };

  return (
    <div className={styles.chat}>
      <h2 className={styles.title}>Chat With Mistrake</h2>

      <div className={styles.inputWrapper}>
        <input
          className={styles.input}
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your message here..."
        />
        <button className={styles.sendButton} onClick={chatWithMistrake}>
          Send
        </button>
      </div>

      <div className={styles.responses}>
        {responses.map((msg, index) => (
          <div key={index}>
            <div className={`${styles.message} ${styles.user}`}>
              <div className={styles.label}>User</div>
              {msg.prompt}
            </div>

            <div className={`${styles.message} ${styles.ai}`}>
              <div className={styles.label}>Mistrake</div>
              {msg.response}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chat;
