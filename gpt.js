import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * Evaluates a student's answer.
 * @param {Object} question - question object (from questions.js)
 * @param {string} userAnswer - student's answer (text)
 * @param {"easy"|"medium"|"hard"} difficulty - current difficulty level
 * @returns {Promise<{score: number, comment: string, raw: string}>}
 */
export async function evaluateAnswer(question, userAnswer, difficulty = "medium") {
  const prompt = `
Act as a Korean language examiner (levels 1급–6급).
Your task is to grade the student's answer on a 0–2 point scale.

Question information:
- Question difficulty: "${difficulty}"
- Question type: "${question.type}"
- Question text: "${question.text}"

Student's answer:
"${userAnswer}"

Scoring:
0 – the answer is incorrect, off-topic, or unusable.
1 – the main idea is partially conveyed, but there are noticeable errors or the answer is incomplete.
2 – the answer meets the requirements for this level.

Guidelines by difficulty:

EASY (beginner, approx. 1–2급)
- Grammar mistakes are allowed.
- The basic meaning is most important.
- Simple vocabulary is fine.
- Colloquial forms are acceptable.

MEDIUM (intermediate, approx. 2–4급)
- Some grammar mistakes are allowed, but not in key structures.
- Tense, case particles, and basic connectors should mostly be correct.
- The meaning should be expressed clearly and fully.
- Neutral or conversational style is fine.

HARD (advanced, approx. 4–6급)
- Grammar and word order should be accurate.
- More complex patterns are encouraged
  (지만, -(으)ㄴ 적 있다, -(으)려고, -(으)면, -(으)니까, etc.).
- Mistakes in key elements are not acceptable.
- The answer should sound natural and close to native speech.

Return a single JSON object in this exact shape:
{
  "score": 0 | 1 | 2,
  "comment": "short explanation of why you gave this score (in English)"
}
Do not add any text outside the JSON.
`;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [{ role: "user", content: prompt }],
      temperature: 0
    });

    const content = completion.choices[0].message.content;
    let parsed;

    try {
      parsed = JSON.parse(content);
    } catch (e) {
      console.error("[GPT PARSE ERROR] raw content:", content);
      parsed = { score: 0, comment: "Failed to parse model response." };
    }

    const score = typeof parsed.score === "number" ? parsed.score : 0;
    const comment =
      typeof parsed.comment === "string"
        ? parsed.comment
        : "No comment provided.";

    return {
      score,
      comment,
      raw: `score: ${score}\ncomment: ${comment}`
    };
  } catch (err) {
    console.error("[GPT ERROR]", err);
    return {
      score: 0,
      comment: "Error while calling the model.",
      raw: "score: 0\ncomment: Error while calling the model."
    };
  }
}