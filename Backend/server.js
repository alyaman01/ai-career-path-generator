import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🔥 Backend OK");
});

app.post("/api/ai", async (req, res) => {
  try {
    console.log("API KEY CHECK:", process.env.GROQ_API_KEY ? "FOUND" : "MISSING");

    const { name, goal } = req.body;

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const result = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: `My name is ${name}. I want to become a ${goal}. Give me guidance.`,
        },
      ],
    });

    res.json({
      success: true,
      reply: result.choices[0].message.content,
    });
  } catch (err) {
    console.error("❌ ERROR:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
