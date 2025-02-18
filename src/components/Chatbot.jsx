import { useState } from "react";

export default function Chatbot() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleSend = () => {
    if (message.trim() !== "") {
      // For now, simply add the message to the chat history.
      setChatHistory([...chatHistory, message]);
      setMessage("");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg h-full flex flex-col">
      <div className="flex-1 mb-4 overflow-auto text-gray-900 dark:text-gray-100">
        {chatHistory.length === 0 ? (
          <p className="text-sm">Your chat messages will appear here.</p>
        ) : (
          chatHistory.map((msg, idx) => (
            <p key={idx} className="mb-2 text-sm">
              {msg}
            </p>
          ))
        )}
      </div>
      <div className="flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask a health question?"
          className="flex-1 p-2 border rounded-l-md focus:outline-none"
        />
        <button
          onClick={handleSend}
          className="bg-teal-700 text-white px-4 rounded-r-md"
        >
          Send
        </button>
      </div>
    </div>
  );
}
