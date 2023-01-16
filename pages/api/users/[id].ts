import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = req.query.id;

  let { db } = await connectToDatabase();

  switch (req.method) {
    case "GET": {
      try {
        const user = await db.collection("users").findOne({
          _id: ObjectId(userId),
        });
        res.status(200).json(user);
      } catch (err) {
        res.status(500).json({ error: "failed to load data" });
      }
      break;
    }

    case "PUT": {
      try {
        const update = req.body;
        const user = await db.collection("users").findOneAndUpdate(
          {
            _id: ObjectId(userId),
          },
          {
            $set: {
              Username: update.Username,
              Password: update.Password,
              Email: update.Email,
            },
          }
        );
        res.status(200).json(update);
      } catch (err) {
        res.status(500).json({ error: "faild to load data" });
      }
      break;
    }

    case "DELETE": {
      try {
        const user = await db.collection("users").findOneAndDelete({
          _id: ObjectId(userId),
        });
        res.status(200).json({ message: "User deleted" });
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
