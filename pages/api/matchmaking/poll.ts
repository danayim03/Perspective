import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../app/lib/prisma";

// API handler for polling
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method, query } = req;

    if (method === "GET") {
        const { nickname, type } = query; // Renamed 'userId' to 'nickname'

        if (!nickname || !type) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        try {
            // Check if the user is still in the respective queue
            if (type === "get") {
                const seeker = await prisma.seeker.findFirst({
                    where: { nickname: String(nickname) }, // Use 'nickname' from query
                });
                if (!seeker) {
                    return res.status(200).json({ status: "matched" });
                }
            } else if (type === "give") {
                const giver = await prisma.giver.findFirst({
                    where: { nickname: String(nickname) }, // Use 'nickname' from query
                });
                if (!giver) {
                    return res.status(200).json({ status: "matched" });
                }
            } else {
                return res.status(400).json({ error: "Invalid type" });
            }

            // User is still in the queue
            return res.status(200).json({ status: "loading" });
        } catch (error) {
            console.error("Error during polling:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    return res.status(405).json({ error: "Method not allowed" });
}
