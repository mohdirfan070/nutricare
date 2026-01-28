import React, { useState, useRef, useEffect } from "react";
import { useProductContext } from "../context/ProductContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const getResponseFromAi = async (prop) => {
  try {
    const res = await axios.post(
      import.meta.env.VITE_backendUrl + "/gemini/product",
      prop
    );
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default function ChatWithAi() {
  const navigate = useNavigate();
  const { productContext } = useProductContext();

  if (!productContext) {
    navigate("/scan");
  }

  const [chatMessages, setChatMessages] = useState([
    {
      text: "Hi there!\nHow can I help you today?",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sender: "ai",
    },
  ]);

  const [inputText, setInputText] = useState(
    `Tell me more about this product "${productContext?.product_name || productContext?.brands}"`
  );
  const [loading, setLoading] = useState(false);
  const [aiTypingText, setAiTypingText] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, aiTypingText]);

  const handleSend = async () => {
    if (!inputText.trim() || loading) return;

    const newMessage = {
      text: inputText,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sender: "user",
    };

    setChatMessages((prev) => [...prev, newMessage]);
    setInputText("");
    setLoading(true);
    setAiTypingText("Analyzing...");

    try {
      const res = await getResponseFromAi({
        id: "070",
        username: "mohdirfan070",
        productName: productContext?.product_name,
        product: { ...productContext },
      });

      setAiTypingText("Generating Answer...");
      setTimeout(() => {
        if (res?.data?.msg) {
          const aiResponse = {
            text: res.data.msg + " " + res.data.payload.productName,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            sender: "ai",
          };
          setChatMessages((prev) => [...prev, aiResponse]);
        } else {
          setChatMessages((prev) => [
            ...prev,
            {
              text: "Can't process your request.\nTry again later!",
              time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              sender: "ai",
            },
          ]);
        }
        setLoading(false);
        setAiTypingText("");
      }, 2000);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setAiTypingText("");
    }
  };

  return (
    <>
      {productContext ? (
        <div className="flex flex-col h-[100dvh] w-[100dvw]  bg-gray-100  z-[2]">
          {/* Header */}
          <div className="flex items-center bg-green-600 text-white px-4 py-2">
            <Link to={"/barcode"} className="mr-3">
              ←
            </Link>
            <div>
              <h2 className="font-semibold">GeminiAI</h2>
              <p className="text-xs text-green-200">
                Product: {productContext.product_name || productContext.brands}
              </p>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto px-3 py-2 bg-chat-bg">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                } mb-2`}
              >
                <div
                  className={`relative max-w-[75%] px-3 py-2 rounded-lg shadow 
                    ${
                      msg.sender === "user"
                        ? "bg-green-500 text-white rounded-br-none"
                        : "bg-white text-gray-800 rounded-bl-none"
                    }`}
                >
                  <p className="whitespace-pre-line break-words">{msg.text}</p>
                  <span
                    className={`absolute bottom-0 text-[0.65rem] text-gray-400 
                      ${msg.sender === "user" ? "right-2" : "left-2"}`}
                  >
                    {msg.time}
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                width="24"
                fill="currentColor"
              >
                <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-[100vh] w-[100vw] bg-gray-100 justify-center items-center">
          <p>Please Scan Again, Product Data Lost!</p>
          <Link to={"/scan"} className="text-blue-600 mt-2">
            ← Back
          </Link>
        </div>
      )}
    </>
  );
}
