"use client";

import { useRouter } from "next/navigation";

export default function GoBackButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()} // Navigate to the previous page
            className="font-roboto mt-24 hover:text-pink-300"
        >
            Go Back
        </button>
    );
}
