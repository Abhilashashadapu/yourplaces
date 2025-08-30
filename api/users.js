import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

const client = new MongoClient(process.env.MONGODB_URI);

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    await client.connect();
    const db = client.db("yourplaces");
    const usersCollection = db.collection("users");

    switch (req.method) {
      case "GET":
        const users = await usersCollection.find({}, { password: 0 }).toArray();
        return res.status(200).json({ users });

      case "POST":
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
          return res.status(400).json({ message: "Missing required fields" });
        }

        if (password.length < 6) {
          return res
            .status(400)
            .json({ message: "Password must be at least 6 characters" });
        }

        // Check if user exists
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
          return res.status(422).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = {
          id: uuidv4(),
          name,
          email,
          password: hashedPassword,
          image: "https://via.placeholder.com/150",
          places: [],
          createdAt: new Date(),
        };

        await usersCollection.insertOne(newUser);

        // Create JWT token
        const token = jwt.sign(
          { userId: newUser.id, email: newUser.email },
          process.env.JWT_SECRET || "fallback_secret",
          { expiresIn: "1h" }
        );

        return res.status(201).json({
          userId: newUser.id,
          email: newUser.email,
          token,
        });

      default:
        return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error("Users API Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  } finally {
    await client.close();
  }
}
