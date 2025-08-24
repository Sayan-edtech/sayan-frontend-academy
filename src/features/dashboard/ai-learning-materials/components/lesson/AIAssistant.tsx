import { useState } from "react";
import { Bot, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { ChatMessage } from "@/types/lesson";

interface AIAssistantProps {
  className?: string;
}

export function AIAssistant({ className = "" }: AIAssistantProps) {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { type: "bot", text: "مرحباً! أنا هنا لمساعدتك في فهم الدرس" },
  ]);
  const [chatInput, setChatInput] = useState("");

  const sendMessage = () => {
    if (!chatInput.trim()) return;

    const newMessages = [
      ...chatMessages,
      { type: "user", text: chatInput } as ChatMessage,
      {
        type: "bot",
        text: "شكراً لسؤالك! سأساعدك في فهم هذا الجزء من الدرس",
      } as ChatMessage,
    ];
    setChatMessages(newMessages);
    setChatInput("");
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-80 lg:h-auto lg:max-h-[600px] ${className}`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-blue-600" />
          <h4 className="font-semibold text-gray-900">المساعد الذكي</h4>
        </div>
      </div>

      {/* Chat Area - ارتفاع ثابت مع سكرول */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-3">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-end gap-2 w-full ${
                  msg.type === "user" ? "justify-start" : "justify-end"
                }`}
              >
                {/* Bot avatar */}
                {msg.type === "bot" && (
                  <div className="w-7 h-7 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center flex-shrink-0 order-last">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[75%] p-3 rounded-lg shadow-sm ${
                    msg.type === "bot"
                      ? "bg-gray-50 text-gray-800 text-right rounded-bl-none border border-gray-100"
                      : "bg-blue-600 text-white text-right rounded-br-none"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-100 flex-shrink-0">
        <div className="flex flex-row-reverse gap-2 items-center bg-gray-50 rounded-lg p-2">
          <Button
            size="icon"
            onClick={sendMessage}
            disabled={!chatInput.trim()}
            className="bg-blue-600 hover:bg-blue-700 rounded-lg w-8 h-8 flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
          <Input
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="اسأل أي شيء عن الدرس..."
            className="flex-1 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm text-right"
          />
        </div>
      </div>
    </div>
  );
}
