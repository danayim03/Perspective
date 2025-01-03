import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../app/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === "POST") {
    const { nickname, type, gender, sexuality } = req.body;

    // Validate required fields
    if (!nickname || !type || !gender || !sexuality) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      if (type === "get") {
        // Add seeker to the database
        const seeker = await prisma.seeker.create({
          data: { nickname, gender, sexuality, dateOfBirth: new Date() }, // Replace userId with nickname
        });

        // Find a match in givers
        const match = await prisma.giver.findFirst({
          where: {
            gender: seeker.gender,
            sexuality: seeker.sexuality,
          },
          orderBy: { createdAt: "asc" }, // Oldest first
        });

        if (match) {
          // Remove the matched giver
          await prisma.giver.delete({ where: { id: match.id } });
          return res.status(200).json({ match, status: "matched" });
        }

        return res.status(200).json({ status: "loading" });
      }

      if (type === "give") {
        // Add giver to the database
        const giver = await prisma.giver.create({
          data: { nickname, gender, sexuality, dateOfBirth: new Date() }, // Replace userId with nickname
        });

        // Find a match in seekers
        const match = await prisma.seeker.findFirst({
          where: {
            OR: [
              { gender: giver.gender, sexuality: giver.sexuality },
              { gender: giver.gender },
              { sexuality: giver.sexuality },
            ],
          },
          orderBy: { createdAt: "asc" }, // Oldest first
        });

        if (match) {
          // Remove the matched seeker
          await prisma.seeker.delete({ where: { id: match.id } });
          return res.status(200).json({ match, status: "matched" });
        }

        return res.status(200).json({ status: "waiting" });
      }

      return res.status(400).json({ error: "Invalid type" });
    } catch (error) {
      console.error("Error in matchmaking:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
