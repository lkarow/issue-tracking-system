import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { db } = await connectToDatabase();

  switch (req.method) {
    case "GET": {
      try {
        const users = await db.collection("users").find().toArray();
        res.status(200).json(users);
      } catch (err) {
        res.status(500).json({ error: "failed to load data" });
      }
      break;
    }

    case "POST": {
      const user = req.body;

      try {
        await db.collection("users").insertOne({
          _id: new ObjectId(),
          Username: user.Username,
          Password: user.Password,
          Email: user.Email,
        });

        res.status(200).json({ message: "Created new account" });
      } catch (err) {
        res.status(500).json({ error: "failed to load data" });
      }
      break;
    }

    default: {
      res.status(400).json({ message: "Wrong method" });
      break;
    }
  }
}
