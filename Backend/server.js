import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // Render ke liye PORT dynamic rakha hai

// ✅ CORS Configured perfectly
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🔥 Backend OK");
});

app.post("/api/ai", async (req, res) => {
  try {
    console.log("API KEY CHECK:", process.env.GROQ_API_KEY ? "FOUND" : "MISSING");

    // ✅ FIXED: Frontend jo fields bhej raha hai wahi yahan accept kar rahe hain
    const { goal, level, frontend, backend, aiTool } = req.body;

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    // Dynamic prompt jo sabhi options ko use karega
    const aiPrompt = `Create a detailed, step-by-step career path roadmap for a ${level || "beginner"} who wants to become a ${goal || "Software Developer"}. 
    Preferred Frontend tech: ${frontend || "Any"}, 
    Preferred Backend tech: ${backend || "Any"}, 
    Interested AI Tools/Concepts: ${aiTool || "None"}. 
    Provide clear milestones, skills to learn, and project ideas.`;

    const result = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: aiPrompt,
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