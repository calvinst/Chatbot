import { useState } from "react";
import ChatButton from "./components/ChatButton";
import ChatWindow from "./components/ChatWindow";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-400 text-sm">Conteúdo do site...</p>
      </div>

      {isOpen && (
        <ChatWindow messages={messages} setMessages={setMessages} />
      )}
      <ChatButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />
    </div>
  );
}

export default App;