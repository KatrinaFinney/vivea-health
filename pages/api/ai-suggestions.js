// pages/api/ai-suggestions.js

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  // Expanded list of generic health suggestions (total 14)
  const suggestions = [
    "Drink at least 8 glasses of water per day.",
    "Aim for at least 30 minutes of physical activity daily.",
    "Include a variety of fruits and vegetables in your meals.",
    "Take short breaks and stretch regularly during work.",
    "Prioritize getting a good night’s sleep for overall health.",
    "Practice mindfulness and stress-relief techniques.",
    "Limit processed foods and sugar intake.",
    "Incorporate strength training into your exercise routine.",
    "Stay consistent with your meal schedule.",
    "Keep a food diary to track your nutrition.",
    "Set aside time for relaxation and hobbies.",
    "Maintain proper posture to reduce strain.",
    "Engage in social activities for mental well-being.",
    "Schedule regular health check-ups."
  ];

  // Shuffle the suggestions array using Fisher-Yates algorithm
  const shuffled = suggestions.slice(); // Create a copy of the array
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Select the first three unique suggestions
  const selected = shuffled.slice(0, 3);

  // Return the three suggestions as JSON
  res.status(200).json({ suggestions: selected });
}
