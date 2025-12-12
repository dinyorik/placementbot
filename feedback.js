import axios from "axios";

/**
 * Generates a final report based on the test results.
 * level: string, e.g. "3급"
 * score: total number of points
 * maxDifficulty: "easy" | "medium" | "hard"
 * history: array of user answers
 */
export async function generateFeedback(level, cefr, score, maxDifficulty, history = []) {
  // Keep only the fields needed for the prompt to avoid sending extra data
  const shortHistory = history.map((item) => ({
    questionId: item.questionId,
    section: item.section,       // reading / grammar / vocab / dialogue / writing
    topikLevel: item.topikLevel, // 1–6, if present
    difficulty: item.difficulty, // easy / medium / hard
    score: item.score,           // 0–2
    answer: item.answer          // user's answer
  }));

  const prompt = `
Write a short, clear report about the result of an adaptive Korean placement test.

Speak directly to the person as "you".
Do not use words like "student", "user", or "test taker", and do not refer to them as "he" or "she".
Write as if you are sending a personal message: friendly, but focused and specific.

Test data:

- Assigned level (based on the result): ${level}
- Approximate CEFR correspondence: ${cefr}
- Total score: ${score}
- Highest question difficulty reached: ${maxDifficulty}

Answer history (each object contains section, difficulty and score):
${JSON.stringify(shortHistory, null, 2)}

Write the report in English, addressing the reader as "you".
Follow this structure (but do NOT use explicit headings, just continuous text in paragraphs):

1) 1–2 sentences: an overall conclusion about the level, mention ${level} and approximately ${cefr} (for example, "You seem to be quite confident around level ...").
2) 2–4 sentences: strengths.
   If it is clear from the history where the score is more often 2 points (reading, grammar, vocab, dialogue, writing), mention it.
3) 2–4 sentences: what should be improved — specific task types or skills.
4) 1–2 concrete suggestions on what to do next (for example, "read more short texts", "practice telling connected stories about your past or future plans").

Style requirements:
- Always address the reader as "you".
- Do not use words like "student", "user", or similar labels.
- No bullet lists; use normal paragraphs of text.
- No greetings or farewells; go straight to the point.
`;

  const res = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.4
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  const text = res.data.choices[0]?.message?.content || "";
  return text.trim();
}