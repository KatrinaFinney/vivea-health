import { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    // Append the user's message
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: input },
    ]);
    // For now, simulate a bot response by echoing the message after a delay
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: `Echo: ${input}` },
      ]);
    }, 1000);
    setInput("");
  };

  return (
    <div className="bg-white border rounded-lg p-4 fixed bottom-24 right-4 w-80 max-h-96 overflow-y-auto shadow-lg">
      <div className="mb-2 text-lg font-semibold">Chatbot</div>
      <div className="space-y-2 mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded ${
              msg.sender === "user" ? "bg-blue-100 text-right" : "bg-gray-100 text-left"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow border rounded-l-md p-2"
        />
        <button
          onClick={sendMessage}
          className="bg-primary text-white p-2 rounded-r-md"
        >
          Send
        </button>
      </div>
    </div>
  );
}
