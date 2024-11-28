"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const genders = [
    "Male", "Female", "Non-binary", "Transgender Male", "Transgender Female",
    "Genderqueer", "Genderfluid", "Agender", "Two-Spirit", "Intersex",
    "Demiboy", "Demigirl", "Bigender", "Pangender", "Androgynous",
    "Neutrois", "Questioning", "Other"
];

const sexualities = [
    "Straight (Heterosexual)", "Gay (Homosexual)", "Lesbian", "Bisexual",
    "Pansexual", "Asexual", "Demisexual", "Queer", "Polysexual",
    "Omnisexual", "Greysexual", "Aromantic", "Androsexual", "Gynosexual",
    "Skoliosexual", "Sapiosexual", "Allosexual", "Questioning", "Other"
];

export default function GenderSexualitySelection() {
    const [genderSearch, setGenderSearch] = useState("");
    const [sexualitySearch, setSexualitySearch] = useState("");
    const [selectedGender, setSelectedGender] = useState("");
    const [selectedSexuality, setSelectedSexuality] = useState("");
    const [genderMenuOpen, setGenderMenuOpen] = useState(false);
    const [sexualityMenuOpen, setSexualityMenuOpen] = useState(false);
    const [nickname, setNickname] = useState(""); // State to store the nickname
    const router = useRouter();

    // Get the query parameter from the URL
    const searchParams = useSearchParams();
    const view = searchParams.get("view");

    // Load nickname from session storage
    useEffect(() => {
        const storedNickname = sessionStorage.getItem("nickname");
        if (storedNickname) {
            setNickname(storedNickname); // Set nickname from session storage
        }
    }, []);

    // Filtered options based on search input
    const filteredGenders = genders.filter((gender) =>
        gender.toLowerCase().includes(genderSearch.toLowerCase())
    );

    const filteredSexualities = sexualities.filter((sexuality) =>
        sexuality.toLowerCase().includes(sexualitySearch.toLowerCase())
    );

    // Handle Proceed Button
    const handleProceed = () => {
        if (selectedGender && selectedSexuality) {
            sessionStorage.setItem("selectedGender", selectedGender);
            sessionStorage.setItem("selectedSexuality", selectedSexuality);
            router.push("/next-page"); // Replace with the new page URL
        } else {
            alert("Please select both a gender and a sexuality.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen p-8 font-roboto">
            {/* Conditional Heading */}
            <p className="font-medium text-h1 mb-4">
                {view === "get" &&
                    `Whose perspective would you like to gain today, ${
                        nickname || "Username"
                    }?`}
                {view === "give" &&
                    `What perspective can you share today, ${
                        nickname || "Username"
                    }?`}
            </p>

            {/* Gender and Sexuality Selection */}
            <div className="flex flex-row">
                <div className="max-w-md m-4">
                    <button
                        className="w-full text-h3 text-white bg-pink-300 p-4 rounded-full"
                        onClick={() => setGenderMenuOpen(!genderMenuOpen)}
                    >
                        {selectedGender || "Select Gender"}
                    </button>
                    {genderMenuOpen && (
                        <div className="border rounded-lg mt-2 p-4 bg-white">
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
                        className="w-full text-h3 text-white bg-pink-300 p-4 rounded-full"
                        onClick={() => setSexualityMenuOpen(!sexualityMenuOpen)}
                    >
                        {selectedSexuality || "Select Sexuality"}
                    </button>
                    {sexualityMenuOpen && (
                        <div className="border rounded-lg mt-2 p-4 bg-white">
                            <input
                                type="text"
                                placeholder="Search sexuality..."
                                value={sexualitySearch}
                                onChange={(e) => setSexualitySearch(e.target.value)}
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
            {selectedGender && selectedSexuality && (
                <button
                    className="text-black hover:text-pink-300 mt-4"
                    onClick={handleProceed}
                >
                    Proceed!
                </button>
            )}
        </div>
    );
}
