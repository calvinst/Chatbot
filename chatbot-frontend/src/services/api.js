const API_URL = "http://localhost:3001/chat";

export async function sendMessage(messages) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });

  const data = await response.json();
  return data.reply;
}