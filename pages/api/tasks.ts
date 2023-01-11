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
        const tasks = await db.collection("tasks").find().toArray();
        res.status(200).json(tasks);
      } catch (err) {
        res.status(500).json({ error: "failed to load data" });
      }
      break;
    }

    case "POST": {
      const task = req.body;

      try {
        await db.collection("tasks").insertOne({
          _id: new ObjectId(),
          Title: task.Title,
          Description: task.Description,
          Status: task.Status,
          Author: task.Author,
          Assignee: task.Assignee,
          Date: task.Date,
        });

        res.status(200).json({ message: "Created the doc" });
      } catch (err) {
        res.status(500).json({ error: "failed to load data" });
      }
      break;
    }

    default: {
      res.status(400).json({ message: "Wrong ong method" });
      break;
    }
  }
}
