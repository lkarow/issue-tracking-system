import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const taskId = req.query.id;

  let { db } = await connectToDatabase();

  switch (req.method) {
    case "GET": {
      try {
        const task = await db.collection("tasks").findOne({
          _id: ObjectId(taskId),
        });
        res.status(200).json(task);
      } catch (err) {
        res.status(500).json({ error: "failed to load data" });
      }
      break;
    }

    case "PUT": {
      try {
        const update = req.body;
        const task = await db.collection("tasks").findOneAndUpdate(
          {
            _id: ObjectId(taskId),
          },
          {
            $set: {
              Title: update.Title,
              Description: update.Description,
              Status: update.Status,
              Author: update.Author,
              Assignee: update.Assignee,
              Date: update.Date,
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
        const task = await db.collection("tasks").findOneAndDelete({
          _id: ObjectId(taskId),
        });
        res.status(200).json({ message: "Doc deleted" });
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
