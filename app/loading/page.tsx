"use client";

import { useState, useEffect } from "react";
import GoBackButton from "../components/GoBack";
import { useSearchParams } from "next/navigation";

export default function Loading() {
    const [gender, setGender] = useState("");
    const [sexuality, setSexuality] = useState("");
    const searchParams = useSearchParams();
    const view = searchParams.get("view");

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
                {view === "get" && (
                    <span className="text-h2 font-medium">
                        Matching you with a {sexuality?.toLowerCase()} {gender?.toLowerCase()}...
                    </span>
                )}
                {view === "give" && (
                    <span className="text-h2 font-medium">
                        Matching you with someone seeking your perspective...
                    </span>
                )}
            </div>
            <GoBackButton />
        </main>
    );
}
