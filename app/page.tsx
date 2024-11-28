"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"

export default function Home() {
  const [text, setText] = useState(""); // State to hold the typed text
  const [nickname, setNickname] = useState("");
  const router = useRouter();
  const targetText = "Perspective👀"; // The full text to type
  const typingSpeed = 150; // Typing speed in ms per character

  useEffect(() => {
    let currentIndex = 0; // Tracks the current character index
    let timerId: NodeJS.Timeout; // Timer ID for clearTimeout

    const typeEffect = () => {
      if (currentIndex < targetText.length) {
        setText(targetText.slice(0, currentIndex + 1)); // Update the text
        currentIndex++;
        timerId = setTimeout(typeEffect, typingSpeed); // Schedule next character
      }
    };

    typeEffect(); // Start the typing effect

    // Cleanup to avoid memory leaks
    return () => clearTimeout(timerId);
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && nickname.trim() !== "") {
      // Save the nickname in session storage
      sessionStorage.setItem("nickname", nickname);

      // Navigate to the next page
      router.push("/dob");
    }
  };

  return (
    <main className="font-roboto flex flex-col items-center justify-center h-screen">
      {/* Introductory text */}
      <div className="mx-40">
        <p className="font-roboto font-thin">
          Curious about how your crush might think?
        </p>
        <p className="font-roboto">
          Get anonymous advice from someone who matches your crush’s gender and sexuality from...
        </p>
      </div>

      {/* Typing animation */}
      <div className="text-6xl font-medium mb-14 mt-4">
        {text}
      </div>

      {/* Input field */}
      <input
        type="text"
        placeholder=" Enter a nickname to begin chatting... "
        className="bg-pink-300 rounded-full p-2 w-96 focus:outline-none focus:ring-1 focus:ring-pink-300 text-white placeholder-white"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)} // Update nickname state
        onKeyDown={handleKeyDown}
      />
    </main>
  );
}
