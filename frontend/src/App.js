import { useState } from "react";
import "./App.css";

function App() {
  const [goal,setgoal] = useState("");
  const [level, setLevel] = useState("");
  const [frontend, setFrontend] = useState("");
  const [backend, setBackend] = useState("");
  const [aiTool, setAiTool] = useState("");

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generatePath = async () => {
    if (!goal && !level && !frontend && !backend && !aiTool) {
      alert("Please select at least one option");
      return;
    }

    setLoading(true);
    setResult("⏳ AL, is thinking...");

    try {
      const res = await fetch("http://localhost:5000/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          goal,
          level,
          frontend,
          backend,
          aiTool,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setResult(data.reply);
      } else {
        setResult("❌ AI error");
      }
    } catch (error) {
      setResult("❌ Backend not reachable");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1 style={{ width: "100%", textAlign: "center" }}>AL, Career Path Generator 🚀</h1>

      {/* DEFAULT / LEVEL */}

      <select
        className="input"
        value={goal}
        onChange={(e) => setgoal(e.target.value)}
      >
        <option value="">Select goal</option>
        <option value="iOS Devloper">iOS Devloper</option>
        <option value="Full-Stack Devloper">Full-Stack Devloper</option>
        <option value="Frontend Devloper">Frontend Devloper</option>
        <option value="Backend Devloper">Backend Devloper</option>
      </select>

      <select
        className="input"
        value={level}
        onChange={(e) => setLevel(e.target.value)}
      >
        <option value="">Select Level</option>
        <option value="Fresher">Fresher</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Experienced">Experienced</option>
      </select>

      {/* FRONTEND */}
      <select
        className="input"
        value={frontend}
        onChange={(e) => setFrontend(e.target.value)}
      >
        <option value="">Select Frontend Tech</option>
        <option value="React">React</option>
        <option value="Angular">Angular</option>
        <option value="Swiftui">Swiftui</option>
        <option value="Next.js">Next.js</option>
      </select>

      {/* BACKEND */}
      <select
        className="input"
        value={backend}
        onChange={(e) => setBackend(e.target.value)}
      >
        <option value="">Select Backend Tech</option>
        <option value="Node.js">Node.js</option>
        <option value="Django">Django</option>
        <option value="Spring Boot">Spring Boot</option>
        <option value="Swift">Swift</option>
      </select>

      {/* AI TOOLS */}
      <select
        className="input"
        value={aiTool}
        onChange={(e) => setAiTool(e.target.value)}
      >
        <option value="">Select AI Tool</option>
        <option value="Machine Learning">Machine Learning</option>
        <option value="Generative AI">Generative AI</option>
        <option value="Chatbots">Chatbots</option>
        <option value="Computer Vision">Computer Vision</option>
      </select>

      <button className="btn" onClick={generatePath} disabled={loading}>
        {loading ? "Generating..." : "Generate Path"}
      </button>

      <p className="result">{result}</p>
    </div>
  );
}

export default App;
