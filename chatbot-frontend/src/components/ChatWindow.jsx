import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { sendMessage } from "../services/api";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Send } from "lucide-react";

function ChatWindow({ messages, setMessages }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

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
    <div className="fixed bottom-24 right-6 w-96 bg-background border border-border rounded-2xl shadow-xl flex flex-col h-125 z-50">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border rounded-t-2xl flex items-center gap-3">
        <Avatar className="w-8 h-8">
          <AvatarFallback className="bg-blue-600 text-primary-foreground text-xs">AI</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-semibold">Assistente</p>
          <p className="text-xs text-muted-foreground">Powered by Gemini</p>
        </div>
      </div>

      {/* Histórico */}
      <div className="flex-1 overflow-y-auto px-4 py-4 min-h-0">
        <div className="flex flex-col gap-3">
          {messages.length === 0 && (
            <p className="text-muted-foreground text-sm text-center mt-16">Comece uma conversa...</p>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "assistant" && (
                <Avatar className="w-7 h-7 mt-1 shrink-0">
                  <AvatarFallback className="bg-blue-600 text-primary-foreground text-xs">AI</AvatarFallback>
                </Avatar>
              )}

              <div
                className={`px-4 py-2 rounded-2xl text-sm max-w-[78%] leading-relaxed
          ${
            msg.role === "user"
              ? "bg-primary text-primary-foreground rounded-br-sm"
              : "bg-muted text-foreground rounded-bl-sm"
          }`}
              >
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-2 justify-start">
              <Avatar className="w-7 h-7 mt-1 shrink-0">
                <AvatarFallback className="bg-blue-600 text-primary-foreground text-xs">AI</AvatarFallback>
              </Avatar>
              <div className="bg-muted text-muted-foreground px-4 py-2 rounded-2xl rounded-bl-sm text-sm">
                digitando...
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-border flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite uma mensagem..."
          disabled={loading}
          className="flex-1 rounded-xl"
        />
        <Button
          onClick={handleSend}
          disabled={loading}
          size="icon"
          className="rounded-xl shrink-0 cursor-pointer text-white bg-blue-600"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

export default ChatWindow;
