"use client";

import { useRouter } from "next/navigation";

export default function dob() {
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.push("/get-give"); // Redirect to the next page after submission
    };

    return (
        <main className="flex flex-col items-center justify-center h-screen p-8 font-roboto">
            <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-8">
                {/* Title */}
                <span className="font-medium text-h1 mb-4">What is your date of birth?</span>

                {/* Date Input */}
                <input
                    type="date"
                    required
                    className="mt-1 p-4 bg-pink-300 text-white rounded-full"
                />

                {/* Guidelines */}
                <span>Please agree to our community guidelines to proceed.</span>
                <div className="text-left text-sm border border-gray-300 rounded p-4 bg-gray-50 h-60 overflow-y-auto w-96">
                    <h2 className="text-lg font-semibold mb-2">Community Guidelines</h2>
                    <p className="mb-4">
                        Welcome to <strong>Perspective</strong>! To ensure a positive 
                        experience for everyone, we require all users to adhere to the following guidelines. By using 
                        Perspective, you agree to these terms and understand that violations may result in suspension 
                        or banning from the platform.
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                        <li>Be respectful and courteous to others at all times.</li>
                        <li>
                            Sharing personal or sensitive information, including social media accounts, is strongly 
                            discouraged. If you choose to share such details, you assume full responsibility for any consequences.
                        </li>
                        <li>No harassment, hate speech, or inappropriate behavior will be tolerated.</li>
                        <li>
                            **You must be at least 16 years old** to use Perspective. Falsifying your age is a violation of our guidelines 
                            and may result in suspension or banning.
                        </li>
                        <li>
                            Your session data is logged temporarily for safety purposes and will be deleted after 24 hours unless flagged 
                            for violations of these guidelines.
                        </li>
                        <li>
                            Misuse of the platform, including spamming, exploitation, or any illegal activities, will result in immediate action.
                        </li>
                        <li>
                            Report any inappropriate behavior using the report feature provided in the chat. Misuse of this feature 
                            (e.g., false claims) may also result in action.
                        </li>
                        <li>
                            Perspective values user anonymity but prioritizes safety. Violations may lead to sharing flagged session 
                            data with authorities when required.
                        </li>
                    </ul>
                    <h2 className="text-lg font-semibold mb-2">Your Role in a Safe Community</h2>
                    <p className="mb-4">
                        By using Perspective, you contribute to a space built on mutual respect, safety, and understanding. Let’s 
                        make this platform a place where people can connect, share, and grow.
                    </p>

                    <h2 className="text-lg font-semibold mb-2">Contact Us</h2>
                    <p>
                        For questions or concerns about these guidelines, please contact us at 
                        <a href="mailto:support@perspectiveapp.com" className="text-blue-500 hover:underline"> support@perspectiveapp.com</a>.
                    </p>
                </div>

                {/* Checkbox */}
                <label className="flex items-center space-x-2">
                    <input type="checkbox" required className="form-checkbox h-5 w-5 text-pink-500" />
                    <span>I agree</span>
                </label>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="text-black hover:text-pink-300"
                >
                    Proceed
                </button>
            </form>
        </main>
    );
}
