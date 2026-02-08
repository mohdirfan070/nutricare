import { useState, useRef, useEffect } from "react";
import { useProductContext } from "../context/ProductContext";
import { Link, useNavigate } from "react-router-dom";

// 🔹 Streaming helper
const getResponseFromAiStream = async (payload, onChunk) => {
  try {
    const resp = await window.puter.ai.chat(JSON.stringify(payload), {
      model: "gpt-5-nano",
      stream: true,
    });

    let fullText = "";
    for await (const part of resp) {
      fullText += part?.text || "";
      onChunk(fullText); // progressively update UI
    }
    return fullText;
  } catch (error) {
    console.error("AI Stream Error:", error);
    return null;
  }
};

export default function ChatWithAi() {
  const navigate = useNavigate();
  const { productContext } = useProductContext();

  if (!productContext) {
    navigate("/scanner");
  }

  const [chatMessages, setChatMessages] = useState(() => {
    const savedChats = localStorage.getItem("chatHistory");
    return savedChats
      ? JSON.parse(savedChats)
      : [
          {
            text: "Hi there!\nHow can I help you today?",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            sender: "ai",
          },
        ];
  });

  const [inputText, setInputText] = useState(
    `Tell me more about this product "${productContext?.product_name || productContext?.brands}"`
  );
  const [loading, setLoading] = useState(false);
  const [aiTypingText, setAiTypingText] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(chatMessages));
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, aiTypingText]);

  const handleSend = async () => {
    if (!inputText.trim() || loading) return;

    const userMessage = {
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      sender: "user",
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setLoading(true);
    setAiTypingText("...");

    try {
      const payload = {
        id: "070",
        username: "mohdirfan070",
        productName: productContext?.product_name,
        product: { ...productContext },
        chats: [...chatMessages, userMessage],
      };

      let finalText = "";
      const streamedText = await getResponseFromAiStream(payload, (chunk) => {
        setAiTypingText(chunk); // show live typing
        finalText = chunk;
      });

      const aiMessage = {
        text: streamedText || "Can't process your request.\nTry again later!",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        sender: "ai",
      };

      setChatMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setAiTypingText("");
    }
  };

  return (
    <>
      {productContext ? (
        <div className="flex flex-col h-[100dvh] w-[100dvw] bg-gray-100 z-[2]">
          {/* Header */}
          <div className="flex items-center justify-between bg-green-600 text-white px-4 py-4">
            <div className="flex items-center">
              <Link to={"/barcode"} className="mr-3">←</Link>
              <div>
                <h2 className="font-semibold">GPT-5</h2>
                <p className="text-xs text-green-200">
                  Product: {productContext.product_name || productContext.brands}
                </p>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto px-3 py-2 bg-chat-bg">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} mb-2`}>
                <div className={`relative max-w-[75%] min-w-[25%] px-3 py-2 rounded-lg shadow min-w-min
                  ${msg.sender === "user" ? "bg-green-500 text-white rounded-br-none" : "bg-white text-gray-800 rounded-bl-none"}`}>
                  <p className="whitespace-pre-line break-words">{msg.text}</p>
                  <span className={`absolute bottom-0 text-[0.65rem] text-gray-400 min-w-max
                    ${msg.sender === "user" ? "right-2" : "left-2"}`}>
                      <span className={`${msg.sender === "user" ? "text-darkgreen" : "black"}`}>
                    {msg.time}
                      </span>
                  </span>
                </div>
              </div>
            ))}

             {/* Typing Indicator */}
            {loading && aiTypingText && (
              <div className="flex justify-start mb-2">
                <div className="bg-white text-gray-600 px-3 py-2 rounded-lg shadow">
                  <span className="flex space-x-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
                  </span>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input Bar */}
          <div className="flex items-center px-3 py-2 bg-white border-t">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type a message"
              rows={1}
              className="flex-1 resize-none rounded-full px-4 py-4 bg-gray-100 focus:outline-none"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="ml-2 p-2 rounded-full bg-green-500 text-white hover:bg-green-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="currentColor">
                <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-[100vh] w-[100vw] bg-gray-100 justify-center items-center">
          <p>Please Scan Again, Product Data Lost!</p>
          <Link to={"/scanner"} className="text-blue-600 mt-2">← Back</Link>
        </div>
      )}
    </>
  );
}
