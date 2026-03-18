import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { sendMessage } from "../services/api";

function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const reply = await sendMessage(newMessages);
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSend();
  }

  return (
    <div className="fixed bottom-24 right-6 w-96 bg-white rounded-2xl shadow-xl flex flex-col h-[500px] z-50 border border-gray-200">

      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-200 rounded-t-2xl bg-blue-500">
        <h1 className="text-base font-semibold text-white">Chatbot</h1>
        <p className="text-xs text-blue-100">Powered by Gemini</p>
      </div>

      {/* Histórico */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
        {messages.length === 0 && (
          <p className="text-gray-400 text-sm text-center my-auto">
            Comece uma conversa...
          </p>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`px-4 py-2 rounded-2xl text-sm max-w-[80%] leading-relaxed
              ${msg.role === "user"
                ? "bg-blue-500 text-white rounded-br-sm"
                : "bg-gray-100 text-gray-800 rounded-bl-sm"
              }`}
            >
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-400 px-4 py-2 rounded-2xl rounded-bl-sm text-sm">
              digitando...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-gray-200 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite uma mensagem..."
          disabled={loading}
          className="flex-1 bg-gray-100 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors cursor-pointer disabled:cursor-not-allowed"
        >
          Enviar
        </button>
      </div>

    </div>
  );
}

export default ChatWindow;