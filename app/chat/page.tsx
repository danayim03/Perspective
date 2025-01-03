"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import socket from "../../lib/frontendSocket";

interface Message {
    sender: string;
    text: string;
}

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState<string>("");
    const searchParams = useSearchParams();
    const router = useRouter();
    const matchId = searchParams?.get("matchId"); // Match ID from the query parameter

    useEffect(() => {
        // Listen for incoming messages
        socket.on("receive-message", (message) => {
            setMessages((prevMessages) => [...prevMessages, { sender: "Them", text: message }]);
        });

        return () => {
            socket.off("receive-message");
        };
    }, []);

    const handleSend = () => {
        if (inputText.trim()) {
            // Add the new message to the chat
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: "You", text: inputText },
            ]);
            socket.emit("send-message", { matchId, message: inputText }); // Send message to the server
            setInputText(""); // Clear the input field
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSend();
        }
    };

    const handleEndSession = () => {
        socket.emit("end-session", { matchId }); // Notify the server to end the session
        setMessages([]);
        alert("Chat session ended.");
        router.push("/"); // Redirect to the home page
    };

    const handleRematch = () => {
        const currentView = sessionStorage.getItem("view"); // Retrieve the view ("get" or "give") from sessionStorage
    
        if (!currentView) {
            alert("Error: Unable to determine your role. Returning to the home page.");
            router.push("/"); // Redirect to home if the view is missing
            return;
        }
    
        socket.emit("end-session", { matchId }); // Notify the server to end the session
        setMessages([]);
        alert("Looking for a new match...");
        router.push(`/loading?view=${currentView}`); // Redirect with the correct view
    };
    

    return (
        <main className="font-roboto flex flex-col items-center justify-center h-screen p-4 bg-white">
            {/* Header Buttons */}
            <div className="w-full max-w-4xl flex justify-between mb-4 mt-20">
                <button
                    onClick={handleEndSession}
                    className="bg-popPurple text-white py-2 px-4 rounded-md hover:bg-pink-400"
                >
                    End Session
                </button>
                <button
                    onClick={handleRematch}
                    className="bg-popPurple text-white py-2 px-4 rounded-md hover:bg-pink-400"
                >
                    Rematch me!
                </button>
            </div>

            {/* Chat Box */}
            <div className="w-full max-w-4xl h-[85%] border rounded-lg bg-gray-50 flex flex-col">
                {/* Chat Header */}
                <div className="text-center py-2 bg-popPurple text-white text-sm font-medium rounded-t-lg">
                    Chatting with your match
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4">
                    {messages.length > 0 ? (
                        messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${
                                    message.sender === "You"
                                        ? "justify-end"
                                        : "justify-start"
                                } mb-4`}
                            >
                                <div
                                    className={`relative max-w-xs px-4 py-2 ${
                                        message.sender === "You"
                                            ? "bg-popPurple text-white"
                                            : "bg-gray-200 text-black"
                                    }`}
                                    style={{
                                        borderRadius:
                                            message.sender === "You"
                                                ? "18px 18px 0 18px"
                                                : "18px 18px 18px 0",
                                    }}
                                >
                                    <span className="block text-xs font-semibold mb-1">
                                        {message.sender}
                                    </span>
                                    <span className="block">{message.text}</span>
                                    {/* Arrow */}
                                    <div
                                        className={`absolute top-1/2 ${
                                            message.sender === "You"
                                                ? "right-[-10px] border-t-[10px] border-l-[10px] border-t-transparent border-b-transparent border-l-popPurple"
                                                : "left-[-10px] border-t-[10px] border-r-[10px] border-t-transparent border-b-transparent border-r-gray-200"
                                        }`}
                                    ></div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-500">
                            No messages yet. Start the conversation!
                        </div>
                    )}
                </div>

                {/* Input Field */}
                <div className="flex items-center p-4 border-t bg-white">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Type a message..."
                        className="flex-grow bg-gray-100 text-black p-3 rounded-l-full focus:outline-none "
                    />
                    <button
                        onClick={handleSend}
                        className="bg-popPurple text-white py-3 px-6 rounded-r-full hover:bg-pink-400"
                    >
                        SEND
                    </button>
                </div>
            </div>
        </main>
    );
}
