import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function generateFeedback(level, score, maxDifficulty, history) {
  const difficultyLabels = {
    easy: "Beginner",
    medium: "Intermediate",
    hard: "Advanced"
  };

  const prompt = `
Write a compact final report on a Korean learner's performance.

Student data:
- Final level: ${level}
- Total score: ${score}
- Highest question difficulty reached: ${difficultyLabels[maxDifficulty]}

Answer history:
${history
  .map(
    (h, idx) =>
      `${idx + 1}. Question ${h.questionId} (${h.difficulty}) — score: ${h.score}, answer: "${h.answer}", comment: "${h.comment}"`
  )
  .join("\n")}

Write the report in four short sections with headings:

1. Overall level summary
2. Student's strengths
3. Weaknesses and common mistakes
4. What to study next (grammar, vocabulary, vocabulary and suggested practice tasks)

Style: friendly, motivating, and concise.
Avoid very long lists.
Do not repeat the student's wording verbatim.
`;

  const reply = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7
  });

  return reply.choices[0].message.content;
}