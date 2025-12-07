import express from "express";                    
import { Telegraf, Markup } from "telegraf";
import "dotenv/config";
import { questions } from "./questions.js";
import { evaluateAnswer } from "./gpt.js";
import { calculateLevel } from "./score.js";
import { generateFeedback } from "./feedback.js"; 

const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

//чтобы Render видел, что сервис жив
app.get("/", (req, res) => {
  res.send("Placement bot is running ✅");
});

app.listen(PORT, () => {
  console.log(`HTTP server is listening on port ${PORT}`);
});
// how many questions are asked in one test
const MAX_QUESTIONS = 6;

// ---- Session storage ----
const sessions = {};

function log(...args) {
  console.log("[LOG]", ...args);
}

function errorLog(...args) {
  console.error("[ERROR]", ...args);
}

// ---- Restart button (reply keyboard) ----
function restartKeyboard() {
  return Markup.keyboard([["🔄 Restart test"]]).resize();
}

// ---- Create / reset session ----
function resetSession(id) {
  sessions[id] = {
    step: 0, // how many questions have been asked
    score: 0, // total score
    difficulty: "medium", // start from medium
    askedIds: [], // which questions were used
    currentQuestion: null, // last asked question
    maxDifficulty: "medium",
    history: [] // [{questionId, difficulty, score, answer, comment}]
  };
}

// ---- Pick a question by difficulty ----
function pickQuestion(user) {
  const pool = questions[user.difficulty];
  if (!pool || pool.length === 0) return null;

  const available = pool.filter(q => !user.askedIds.includes(q.id));
  if (available.length === 0) return null;

  const q = available[Math.floor(Math.random() * available.length)];

  user.askedIds.push(q.id);
  user.currentQuestion = q;

  return q;
}

// ---- Update difficulty after an answer ----
function updateDifficulty(user, answerScore) {
  if (answerScore === 2) {
    if (user.difficulty === "easy") user.difficulty = "medium";
    else if (user.difficulty === "medium") user.difficulty = "hard";
  } else if (answerScore === 0) {
    if (user.difficulty === "hard") user.difficulty = "medium";
    else if (user.difficulty === "medium") user.difficulty = "easy";
  }

  const diffRank = { easy: 1, medium: 2, hard: 3 };
  if (diffRank[user.difficulty] > diffRank[user.maxDifficulty]) {
    user.maxDifficulty = user.difficulty;
  }
}

// ---- /start ----
bot.start(ctx => {
  const id = ctx.from.id;

  resetSession(id);
  log(`START by user ${id}`);

  ctx.reply(
    "Let's start an adaptive Korean placement test 🇰🇷",
    restartKeyboard()
  );

  sendQuestion(ctx);
});

// ---- Restart button handler ----
bot.hears("🔄 Restart test", ctx => {
  const id = ctx.from.id;

  log(`RESTART by user ${id}`);
  resetSession(id);

  ctx.reply("🔁 Test restarted!", restartKeyboard());
  sendQuestion(ctx);
});

// ---- Send next question ----
async function sendQuestion(ctx) {
  const user = sessions[ctx.from.id];
  if (!user) return;

  // finish if we already asked MAX_QUESTIONS questions
  if (user.step >= MAX_QUESTIONS) {
    const level = calculateLevel(user.score, user.maxDifficulty);
    const finalFeedback = await generateFeedback(
      level,
      user.score,
      user.maxDifficulty,
      user.history
    );

    await ctx.reply(
      `🎉 *Test completed!*\nYour level: *${level}*\n\nDetailed report:\n\n${finalFeedback}`,
      { parse_mode: "Markdown" }
    );

    return;
  }

  const q = pickQuestion(user);
  if (!q) {
    const level = calculateLevel(user.score, user.maxDifficulty);
    log(`NO MORE QUESTIONS user=${ctx.from.id} level=${level}`);

    return ctx.reply(
      `✅ Test completed!\nYour level: ${level}\n(Score: ${user.score})`,
      restartKeyboard()
    );
  }

  log(
    `Send Q (id=${q.id}, diff=${user.difficulty}) to user=${ctx.from.id}, step=${user.step}`
  );

  if (q.type === "choice") {
    await ctx.reply(q.text, {
      reply_markup: {
        inline_keyboard: q.options.map((o, i) => [
          { text: o, callback_data: String(i) }
        ])
      }
    });
  } else {
    await ctx.reply(q.text, restartKeyboard());
  }
}

// ---- Inline choice answers ----
bot.on("callback_query", async ctx => {
  const id = ctx.from.id;

  try {
    const user = sessions[id];
    if (!user) {
      await ctx.answerCbQuery();
      return;
    }

    const q = user.currentQuestion;
    if (!q || q.type !== "choice") {
      await ctx.answerCbQuery();
      return;
    }

    const data = ctx.callbackQuery.data;
    const answer = Number(data);

    log(
      `User ${id} chose option ${answer} for Q(id=${q.id}, diff=${user.difficulty})`
    );

    let answerScore = 0;
    if (answer === q.correct) {
      answerScore = 2;
      user.score += 2;
      log(`User ${id} got +2 (correct), total score=${user.score}`);
    } else {
      log(`User ${id} got 0 (wrong), total score=${user.score}`);
    }

    user.history.push({
      questionId: q.id,
      difficulty: user.difficulty,
      score: answerScore,
      answer: q.options[answer],
      comment: answerScore === 2 ? "Correct answer" : "Incorrect answer"
    });

    updateDifficulty(user, answerScore);

    user.step++;
    await ctx.answerCbQuery();
    sendQuestion(ctx);
  } catch (e) {
    errorLog("callback error", e);
    try {
      await ctx.answerCbQuery("Error 😢");
    } catch {}
  }
});

// ---- Open questions (text) ----
bot.on("text", async ctx => {
  const id = ctx.from.id;
  const user = sessions[id];
  if (!user) return;

  if (ctx.message.text === "🔄 Restart test") return;

  const q = user.currentQuestion;
  if (!q || q.type === "choice") return;

  log(
    `TEXT from ${id} for Q(id=${q.id}, diff=${user.difficulty}): ${ctx.message.text}`
  );

  try {
    const res = await evaluateAnswer(q, ctx.message.text, user.difficulty);
    const answerScore = res.score || 0;

    user.score += answerScore;
    log(
      `Model score=${answerScore} for user=${id}, total score=${user.score}`
    );

    if (!user.history) user.history = [];
    user.history.push({
      questionId: q.id,
      difficulty: user.difficulty,
      score: answerScore,
      answer: ctx.message.text,
      comment: res.comment || "No comment"
    });

    await ctx.reply(res.raw, restartKeyboard());

    updateDifficulty(user, answerScore);

    user.step++;
    sendQuestion(ctx);
  } catch (e) {
    errorLog("evaluation error", e);
    ctx.reply("Error while evaluating the answer 😢", restartKeyboard());
  }
});

// ---- Voice (currently skipped) ----
bot.on("voice", async ctx => {
  const id = ctx.from.id;
  const user = sessions[id];
  if (!user) return;

  log(`VOICE from ${id}, STT not integrated yet`);

  await ctx.reply(
    "🎤 Got your voice message. Voice answers are not evaluated yet, let's continue with the test.",
    restartKeyboard()
  );

  user.step++;
  sendQuestion(ctx);
});

// ---- Launch bot ----
bot
  .launch()
  .then(() => log("Bot is running..."))
  .catch(errorLog);