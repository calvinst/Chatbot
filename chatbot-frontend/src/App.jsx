import { useState } from "react";
import ChatButton from "./components/ChatButton";
import ChatWindow from "./components/ChatWindow";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Seu site normal ficaria aqui */}
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-400 text-sm">Conteúdo do site...</p>
      </div>

      {/* Chat flutuante */}
      {isOpen && <ChatWindow />}
      <ChatButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />
    </div>
  );
}

export default App;