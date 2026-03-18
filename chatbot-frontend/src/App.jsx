import { useState } from "react";
import ReactMarkdown from "react-markdown";

const API_URL = "http://localhost:3001/chat";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();
      setMessages([...newMessages, { role: "assistant", content: data.reply }]);

    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") sendMessage();
  }

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: "0 16px" }}>
      <h2 style={{ marginBottom: 16 }}>Chatbot</h2>

      {/* Histórico de mensagens */}
      <div style={{
        border: "1px solid #ddd",
        borderRadius: 8,
        padding: 16,
        height: 400,
        overflowY: "auto",
        background: "#fff",
        marginBottom: 12,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}>
        {messages.length === 0 && (
          <p style={{ color: "#aaa", textAlign: "center", marginTop: 160 }}>
            Comece uma conversa...
          </p>
        )}

        {messages.map((msg, i) => (
          <div key={i} style={{
            alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
            background: msg.role === "user" ? "#0084ff" : "#f0f0f0",
            color: msg.role === "user" ? "#fff" : "#333",
            padding: "8px 14px",
            borderRadius: 18,
            maxWidth: "75%",
            fontSize: 14,
            lineHeight: 1.5,
          }}>
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </div>
        ))}

        {loading && (
          <div style={{
            alignSelf: "flex-start",
            background: "#f0f0f0",
            color: "#999",
            padding: "8px 14px",
            borderRadius: 18,
            fontSize: 14,
          }}>
            digitando...
          </div>
        )}
      </div>

      {/* Campo de input */}
      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite uma mensagem..."
          disabled={loading}
          style={{
            flex: 1,
            padding: "10px 14px",
            borderRadius: 8,
            border: "1px solid #ddd",
            fontSize: 14,
            outline: "none",
          }}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          style={{
            padding: "10px 20px",
            borderRadius: 8,
            border: "none",
            background: loading ? "#aaa" : "#0084ff",
            color: "#fff",
            fontSize: 14,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}

export default App;