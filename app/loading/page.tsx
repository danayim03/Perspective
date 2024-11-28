"use client";

import { useState, useEffect } from "react";
import GoBackButton from "../components/GoBack";

export default function Loading() {
    const [gender, setGender] = useState("");
    const [sexuality, setSexuality] = useState("");

    useEffect(() => {
        // Retrieve gender and sexuality from session storage
        const storedGender = sessionStorage.getItem("selectedGender");
        const storedSexuality = sessionStorage.getItem("selectedSexuality");

        if (storedGender) {
            setGender(storedGender);
        }

        if (storedSexuality) {
            setSexuality(storedSexuality);
        }
    }, []);

    return (
        <main className="flex flex-col items-center justify-center h-screen p-8 font-roboto">
            <div>
                <span className="text-h2 font-medium">Searching for a {sexuality?.toLowerCase()} {gender?.toLowerCase()}...</span>
            </div>
            <GoBackButton />
        </main>
    );
}
