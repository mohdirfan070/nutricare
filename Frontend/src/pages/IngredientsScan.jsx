import React, { useRef, useState, useEffect } from "react";
import { useAuthContext } from "../context/Auth";

export default function IngredientsScan({ initialText = "" }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(document.createElement("canvas"));
  const { currentUser } =  useAuthContext();
  const [result, setResult] = useState(initialText); // ✅ takes prop
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [lang, setLang] = useState("en");
  const [aiResponse, setAiResponse] = useState("");

  useEffect(() => {
    let stream;
    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        const video = videoRef.current;
        video.srcObject = stream;
        await video.play();
      } catch (err) {
        console.error("Camera error:", err);
      }
    }
    startCamera();
    return () => {
      if (stream) stream.getTracks().forEach((track) => track.stop());
      if (videoRef.current) videoRef.current.srcObject = null;
    };
  }, []);

  const captureAndExtract = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const boxSize = canvas.width * 0.6;
    const offsetX = (canvas.width - boxSize) / 2;
    const offsetY = (canvas.height - boxSize) / 2;

    ctx.drawImage(
      video,
      offsetX,
      offsetY,
      boxSize,
      boxSize,
      0,
      0,
      canvas.width,
      canvas.height
    );
    const imageData = canvas.toDataURL("image/png");
    setPreviewImage(imageData);
    await extractText(imageData);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const imageData = reader.result;
      setPreviewImage(imageData);
      await extractText(imageData);
    };
    reader.readAsDataURL(file);
  };

  const extractText = async (base64) => {
    setLoading(true);
    setErrorMessage("");
    setResult("");
    try {
      const blob = await (await fetch(base64)).blob();
      const formData = new FormData();
      formData.append("file", blob, "capture.png");
      formData.append("language", lang);

      const response = await fetch("http://127.0.0.1:8000/ocr", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      const translatedAndFormatted = await window.puter.ai.chat(
        `Translate the following text to ${currentUser?.language}  and format it clearly with headings, tables or lists and dont send any single word extra including translated not even heres your translated text etc... and provide in a good format including paragraphs,heading, tables:\n\n${data.result}`,
        { model: "gpt-5-nano" }
      );

      const ingredients = translatedAndFormatted.message.content;
      setResult(ingredients);
      setIsCameraOpen(true);
    } catch (err) {
      console.error("Error extracting text:", err);
      setErrorMessage("Error extracting text");
    } finally {
      setLoading(false);
    }
  };

  const [aiLoading, setAiLoading] = useState(false);

  const askAIAboutProduct = async () => {
    setAiLoading(true);
    setAiResponse("Preparing report..."); // show placeholder
    try {
      const response = await window.puter.ai.chat(
        `Based on the following product ingredients/info, answer questions about safety, nutrition, or usage give about 100-120 words in ${currentUser?.language} in sections like 1:It should be avoid by people suffering with allergens, medical diagonsis, age, 2:which amount is good and not harmfull and 3:the benefits it provides:\n\n${result} and here the details about the user `,
        { model: "gpt-5-nano" }
      );
      setAiResponse(response.message.content);
    } catch (err) {
      console.error("AI error:", err);
      setAiResponse("Error asking AI about product.");
    } finally {
      setAiLoading(false);
    }
  };

  return !isCameraOpen ? (
    <div className="relative scanner-wrapper overflow-hidden h-[80dvh] w-full pt-[1dvh]">
      <video
        ref={videoRef}
        className="w-full h-full object-cover rounded-b-md z-[-1]"
        autoPlay
        muted
        playsInline
      />

      {/* Scanner Frame Overlay */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none z-10">
        <div className="border-[0vh] border-white rounded-[0.41vh] w-[58.5vw] h-[60vw] max-w-[300px] max-h-[300px] relative">
          <div className="absolute top-0 left-0 w-[20px] h-[20px] border-t-[3px] border-l-[3px] border-green-400" />
          <div className="absolute top-0 right-0 w-[20px] h-[20px] border-t-[3px] border-r-[3px] border-green-400" />
          <div className="absolute bottom-0 left-0 w-[20px] h-[20px] border-b-[3px] border-l-[3px] border-green-400" />
          <div className="absolute bottom-0 right-0 w-[20px] h-[20px] border-b-[3px] border-r-[3px] border-green-400" />
        </div>
      </div>

      {/* File Upload + Capture */}
      <div className="absolute bottom-[1vh] left-[50%] translate-x-[-50%] z-20 flex flex-col items-center w-[90%] gap-y-2">
        {!previewImage && (
          <>
            <select
              name="lang"
              id="lang"
              defaultValue="en"
              onChange={(e) => setLang(e.target.value)}
              className="px-6 py-2 rounded border shadow-md font-semibold text-black bg-slate-200 opacity-50 backdrop-blur-sm"
            >
              <option  value="en">English</option>
              <option  value="ar">Arabic</option>
              <option  value="hi">Hindi</option>
            </select>
            <label
              htmlFor="fileUploadInput"
              className="cursor-pointer px-10 py-2 rounded border shadow-md text-white"
            >
              Upload Image
            </label>
            <input
              id="fileUploadInput"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button onClick={captureAndExtract} className="z-20">
              <div className="bg-pvt-color5 border p-1 rounded-full">
                <div className="bg-white rounded-full w-[50px] h-[50px] border" />
              </div>
            </button>
          </>
        )}
        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            className="max-w-[300px] max-h-[300px] rounded-md border shadow-md"
          />
        )}
        {loading && (
          <p className="mt-2 text-white font-semibold text-sm text-center">
            Processing image...
          </p>
        )}
        {errorMessage && (
          <p className="mt-2 text-red text-sm text-center max-w-[300px]">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  ) : (
    <div className="p-4 overflow-auto w-full h-[80vh] z-[1] mt-[5.7dvh]">
      <h2 className="text-lg font-semibold mb-2">
        Extracted & Translated Text:
      </h2>

      {/* Editable text area */}
      <textarea
        value={result}
        onChange={(e) => setResult(e.target.value)}
        className="w-full h-[40vh] border rounded p-2 text-gray-700 whitespace-pre-wrap"
      />

      {/* Ask AI button */}
      <button
        onClick={askAIAboutProduct}
        disabled={aiLoading}
        className={`w-full px-4 py-2 rounded transition ${
          aiLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 text-white hover:bg-green-700"
        }`}
      >
        {aiLoading ? "Preparing..." : "Ask AI"}{" "}
      </button>

      {/* AI Response */}
      {aiResponse && (
        <div className="mt-4 p-2 border rounded bg-gray-50">
          {" "}
          <h3 className="font-semibold">AI Response:</h3>{" "}
          <pre className="text-wrap font-1-regular">{aiResponse}</pre>{" "}
        </div>
      )}
    </div>
  );
}
