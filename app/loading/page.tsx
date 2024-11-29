"use client";

import { useState, useEffect } from "react";
import GoBackButton from "../components/GoBack";
import { useSearchParams, useRouter } from "next/navigation";
import socket from "../lib/socket";

export default function Loading() {
    const [gender, setGender] = useState(""); // User's gender (if giver)
    const [sexuality, setSexuality] = useState(""); // User's sexuality (if giver)
    const [desiredGender, setDesiredGender] = useState(""); // Desired gender (if getter)
    const [desiredSexuality, setDesiredSexuality] = useState(""); // Desired sexuality (if getter)
    const [status, setStatus] = useState("Give us a sec...");
    const searchParams = useSearchParams();
    const router = useRouter();
    const view = searchParams.get("view"); // Either "get" or "give"

    useEffect(() => {
        const storedGender = sessionStorage.getItem("selectedGender");
        const storedSexuality = sessionStorage.getItem("selectedSexuality");

        if (view === "give") {
            // Emit real WebSocket event for givers
            socket.emit("find-match", {
                userGender: storedGender,
                userSexuality: storedSexuality,
                desiredGender: "",
                desiredSexuality: "",
            });
        } else if (view === "get") {
            // Emit real WebSocket event for getters
            socket.emit("find-match", {
                userGender: "",
                userSexuality: "",
                desiredGender: storedGender,
                desiredSexuality: storedSexuality,
            });
        }

        // Handle match found
        socket.on("match-found", (matchedUser) => {
            console.log("Match found:", matchedUser);
            setStatus("Match found! Redirecting...");
            setTimeout(() => router.push(`/chat?matchId=${matchedUser.socketId}`), 1000);
        });

        // Handle no match found
        socket.on("no-match", () => {
            console.log("No match found");
            setStatus("No match found yet. Retrying...");
        });

        return () => {
            socket.off("match-found");
            socket.off("no-match");
        };
    }, [view]);

    return (
        <main className="flex flex-col items-center justify-center h-screen p-8 font-roboto">
            <div>
                {view === "get" && (
                    <span className="text-h2 font-medium">
                        {status} Matching you with a {desiredSexuality?.toLowerCase()}{" "}
                        {desiredGender?.toLowerCase()}...or something similar
                    </span>
                )}
                {view === "give" && (
                    <span className="text-h2 font-medium">
                        {status} Matching you with someone seeking your perspective...
                    </span>
                )}
            </div>
            <GoBackButton />
        </main>
    );
}
