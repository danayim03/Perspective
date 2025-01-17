"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import GoBackButton from "../components/GoBack";

const genders = ["Male", "Female", "Non-binary"];
const sexualities = ["Straight", "Gay", "Lesbian", "Bisexual"];

export default function GenderSexualitySelection() {
    const [genderSearch, setGenderSearch] = useState("");
    const [sexualitySearch, setSexualitySearch] = useState("");
    const [selectedGender, setSelectedGender] = useState("");
    const [selectedSexuality, setSelectedSexuality] = useState("");
    const [genderMenuOpen, setGenderMenuOpen] = useState(false);
    const [sexualityMenuOpen, setSexualityMenuOpen] = useState(false);
    const [nickname, setNickname] = useState(""); // State to store the nickname
    const genderMenuRef = useRef(null);
    const sexualityMenuRef = useRef(null);
    const router = useRouter();

    // Get the query parameter from the URL
    const searchParams = useSearchParams();
    const view = searchParams?.get("view") ?? "default"; // "get" or "give"

    // Load nickname from session storage
    useEffect(() => {
        const storedNickname = sessionStorage.getItem("nickname");
        if (storedNickname) {
            setNickname(storedNickname); // Set nickname from session storage
        }
    }, []);

    // Filtered options based on search input
    const filteredGenders = genders.filter((gender) =>
        gender.includes(genderSearch)
    );

    const filteredSexualities = sexualities.filter((sexuality) =>
        sexuality.includes(sexualitySearch)
    );

    // Handle Proceed Button
    const handleProceed = async () => {
        if (!selectedGender || !selectedSexuality) {
            alert("Please select both a gender and a sexuality.");
            return;
        }

        try {
            // Save selected options to session storage
            sessionStorage.setItem("selectedGender", selectedGender);
            sessionStorage.setItem("selectedSexuality", selectedSexuality);

            // Make the API call for matchmaking
            const response = await fetch("/api/matchmaking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nickname, // Use nickname from session storage
                    type: view, // "get" or "give"
                    gender: selectedGender,
                    sexuality: selectedSexuality,
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                console.error("Matchmaking API error:", error);
                alert("An error occurred during matchmaking. Please try again.");
                return;
            }

            // Redirect to the loading page
            router.push(`/loading?view=${view}&nickname=${nickname}`);
        } catch (error) {
            console.error("Network error during matchmaking:", error);
            alert("A network error occurred. Please try again.");
        }
    };

    return (
        <div className="flex flex-col overflow-y-auto items-center justify-center min-h-screen p-8 font-roboto">
            {/* Conditional Heading */}
            <p className="font-medium text-h1 mb-4 mt-14">
                {view === "get"
                    ? `Whose perspective would you like to gain today, ${
                        nickname || "Username"
                    }?`
                    : `What perspective can you share today, ${
                        nickname || "Username"
                    }?`}
            </p>

            {/* Gender and Sexuality Selection */}
            <div className="flex flex-row">
                <div className="max-w-md m-4">
                    <button
                        className="w-full text-h3 text-white bg-popPurple p-4 rounded-full"
                        onClick={() => setGenderMenuOpen(!genderMenuOpen)}
                    >
                        {selectedGender || "Select Gender"}
                    </button>
                    {genderMenuOpen && (
                        <div
                            ref={genderMenuRef}
                            className="border rounded-lg mt-2 p-4 bg-white"
                        >
                            <input
                                type="text"
                                placeholder="Search gender..."
                                value={genderSearch}
                                onChange={(e) => setGenderSearch(e.target.value)}
                                className="w-full p-2 mb-4 border rounded"
                            />
                            <ul className="max-h-60 overflow-y-auto">
                                {filteredGenders.map((gender, index) => (
                                    <li
                                        key={index}
                                        className="p-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                            setSelectedGender(gender);
                                            setGenderMenuOpen(false);
                                        }}
                                    >
                                        {gender}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="max-w-md m-4">
                    <button
                        className="w-full text-h3 text-white bg-popPurple p-4 rounded-full"
                        onClick={() =>
                            setSexualityMenuOpen(!sexualityMenuOpen)
                        }
                    >
                        {selectedSexuality || "Select Sexuality"}
                    </button>
                    {sexualityMenuOpen && (
                        <div
                            ref={sexualityMenuRef}
                            className="border rounded-lg mt-2 p-4 bg-white"
                        >
                            <input
                                type="text"
                                placeholder="Search sexuality..."
                                value={sexualitySearch}
                                onChange={(e) =>
                                    setSexualitySearch(e.target.value)
                                }
                                className="w-full p-2 mb-4 border rounded"
                            />
                            <ul className="max-h-60 overflow-y-auto">
                                {filteredSexualities.map((sexuality, index) => (
                                    <li
                                        key={index}
                                        className="p-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                            setSelectedSexuality(sexuality);
                                            setSexualityMenuOpen(false);
                                        }}
                                    >
                                        {sexuality}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Proceed Button */}
            <button
                className={`text-black hover:text-popPurple mt-4 ${
                    selectedGender && selectedSexuality
                        ? ""
                        : "opacity-50 cursor-not-allowed"
                }`}
                onClick={handleProceed}
                disabled={!selectedGender || !selectedSexuality}
            >
                Proceed!
            </button>
            <GoBackButton />

            <div>
                <p className="p-10 max-w-md">
                    *We’re working to include more genders and sexualities, but
                    with our small (and growing!) community, we’re starting
                    simple—stay tuned as we grow! If you don’t see your gender,
                    sexuality, or your crush’s represented, we’d love to hear
                    from you—please email us and help us make Perspective even
                    better!
                </p>
            </div>
        </div>
    );
}
