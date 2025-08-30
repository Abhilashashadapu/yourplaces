import { MongoClient } from "mongodb";
import { v4 as uuidv4 } from "uuid";

const client = new MongoClient(process.env.MONGODB_URI);

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    await client.connect();
    const db = client.db("yourplaces");
    const placesCollection = db.collection("places");

    switch (req.method) {
      case "GET":
        const { uid } = req.query;
        let places;

        if (uid) {
          places = await placesCollection.find({ creator: uid }).toArray();
        } else {
          places = await placesCollection.find({}).toArray();
        }

        return res.status(200).json({ places });

      case "POST":
        const { title, description, address, creator } = req.body;

        if (!title || !description || !address || !creator) {
          return res.status(400).json({ message: "Missing required fields" });
        }

        // For now, using a placeholder for coordinates
        // In production, you'd use Google Geocoding API
        const newPlace = {
          id: uuidv4(),
          title,
          description,
          image: req.body.image || "https://via.placeholder.com/300x200",
          address,
          location: {
            lat: 40.7484405,
            lng: -73.9878584,
          },
          creator,
          createdAt: new Date(),
        };

        await placesCollection.insertOne(newPlace);
        return res.status(201).json({ place: newPlace });

      case "PATCH":
        const { pid } = req.query;
        const { title: newTitle, description: newDescription } = req.body;

        const result = await placesCollection.updateOne(
          { id: pid },
          {
            $set: {
              title: newTitle,
              description: newDescription,
              updatedAt: new Date(),
            },
          }
        );

        if (result.matchedCount === 0) {
          return res.status(404).json({ message: "Place not found" });
        }

        return res.status(200).json({ message: "Place updated" });

      case "DELETE":
        const { pid: placeId } = req.query;
        const deleteResult = await placesCollection.deleteOne({ id: placeId });

        if (deleteResult.deletedCount === 0) {
          return res.status(404).json({ message: "Place not found" });
        }

        return res.status(200).json({ message: "Place deleted" });

      default:
        return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  } finally {
    await client.close();
  }
}
