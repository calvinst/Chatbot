import { Button } from "./ui/button";
import { MessageCircle, X } from "lucide-react";

function ChatButton({ onClick, isOpen }) {
  return (
    <Button
      onClick={onClick}
      size="icon"
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg z-50 cursor-pointer bg-blue-600 hover:bg-blue-700"
    >
      {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
    </Button>
  );
}

export default ChatButton;