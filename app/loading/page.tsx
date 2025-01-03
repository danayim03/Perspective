"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import socket from "../../lib/frontendSocket";
import GoBackButton from "../components/GoBack";

export default function Loading() {
    const [gender, setGender] = useState(""); // User's gender (if giver)
    const [sexuality, setSexuality] = useState(""); // User's sexuality (if giver)
    const [desiredGender, setDesiredGender] = useState(""); // Desired gender (if getter)
    const [desiredSexuality, setDesiredSexuality] = useState(""); // Desired sexuality (if getter)
    const [status, setStatus] = useState("Give us a sec...");
    const searchParams = useSearchParams();
    const router = useRouter();
    const view = searchParams?.get("view") ?? "default";

    useEffect(() => {
        const storedGender = sessionStorage.getItem("selectedGender");
        const storedSexuality = sessionStorage.getItem("selectedSexuality");

        if (view === "give") {
            setGender(storedGender || "");
            setSexuality(storedSexuality || "");

            // Emit WebSocket event for givers
            socket.emit("find-match", {
                userGender: storedGender,
                userSexuality: storedSexuality,
                desiredGender: "",
                desiredSexuality: "",
            });
        } else if (view === "get") {
            setDesiredGender(storedGender || "");
            setDesiredSexuality(storedSexuality || "");

            // Emit WebSocket event for getters
            socket.emit("find-match", {
                userGender: "",
                userSexuality: "",
                desiredGender: storedGender,
                desiredSexuality: storedSexuality,
            });
        }

        socket.on("match-found", (matchedUser) => {
            console.log("Match found:", matchedUser);
            setStatus("Match found! Redirecting...");
            setTimeout(() => router.push(`/chat?matchId=${matchedUser.socketId}`), 1500);
        });

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
                        {status}{" "}
                        {desiredGender && desiredSexuality
                            ? `Matching you with a ${desiredSexuality.toLowerCase()} ${desiredGender.toLowerCase()}...`
                            : "Matching you with someone..."}
                    </span>
                )}
                {view === "give" && (
                    <span className="text-h2 font-medium">
                        {status}{" "}
                        {gender && sexuality
                            ? `You are offering your perspective as a ${sexuality.toLowerCase()} ${gender.toLowerCase()}...`
                            : "Matching you with someone seeking your perspective..."}
                    </span>
                )}
            </div>
            <GoBackButton />
        </main>
    );
}
