// score: total points (0–12 if there are 6 questions with max 2 points each)
// maxDifficulty: 'easy' | 'medium' | 'hard'
export function calculateLevel(score, maxDifficulty = "medium") {
  let baseLevel = 1;

  if (score <= 2) baseLevel = 1;
  else if (score <= 4) baseLevel = 2;
  else if (score <= 6) baseLevel = 3;
  else if (score <= 8) baseLevel = 4;
  else if (score <= 10) baseLevel = 5;
  else baseLevel = 6; // 11–12

  // adjust level based on the highest difficulty reached
  if (maxDifficulty === "easy" && baseLevel > 2) {
    baseLevel = 2; // if the student never left "easy", don't give higher than 2급
  }

  if (maxDifficulty === "medium" && baseLevel > 4) {
    baseLevel = 4; // if the maximum was "medium", cap at 4급
  }

  if (maxDifficulty === "hard" && baseLevel < 3) {
    baseLevel = 3; // if the student reached "hard", level shouldn't be below 3급
  }

  return `${baseLevel}급`;
}

export function mapLevelToCEFR(level) {
  // level у тебя в формате "1급", "2급" и т.п.
  const n = parseInt(level, 10);

  if (Number.isNaN(n)) return "A1"; // на всякий случай

  if (n <= 1) return "A1";  // 1급 ~ A1
  if (n === 2) return "A2"; // 2급 ~ A2
  if (n === 3) return "B1"; // 3급 ~ B1
  if (n === 4) return "B2"; // 4급 ~ B2
  if (n === 5) return "C1"; // 5급 ~ C1
  return "C2";              // 6급 ~ C2
}