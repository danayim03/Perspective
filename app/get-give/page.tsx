"use client"
import {useRouter} from "next/navigation";
import React, { useState, useEffect } from "react";
import GoBackButton from "../components/GoBack";

const GetBold = () => <span className="font-bold">Get</span>;
const GiveBold = () => <span className="font-bold">Give</span>;

export default function get_give () {
    const router = useRouter();
    const [nickname, setNickname] = useState(""); // State to store the nickname

    useEffect(() => {
        // Retrieve the nickname from session storage
        const storedNickname = sessionStorage.getItem("nickname");
        if (storedNickname) {
            setNickname(storedNickname);
        }
    }, []);

    return (
        <main className="flex flex-col items-center justify-center h-screen p-8 font-roboto">
            <span className="font-medium text-h1 mb-4">Glad you're here, {nickname || "Username"}!</span>
            <span className="mt-1">You are here to:</span>
            <div>
                <button className="m-4 p-4 text-h3 rounded-full bg-pink-300 text-white"
                onClick={() => router.push("/gender-sexuality?view=get")}>
                    <GetBold /> a perspective
                </button>
                <button className="m-4 p-4 text-h3 rounded-full bg-pink-300 text-white"
                onClick={() => router.push("/gender-sexuality?view=give")}>
                    <GiveBold /> a perspective
                </button>
            </div>
            <GoBackButton />
        </main>
    );
}