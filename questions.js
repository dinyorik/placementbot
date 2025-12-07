export const questions = {
  easy: [
    {
      id: "E1",
      type: "choice",
      text: "How do you say 'I like coffee' in Korean?",
      options: [
        "커피를 좋아해요",   // correct
        "커피가 싫어요",
        "커피에 가요",
        "커피를 먹어요"
      ],
      correct: 0
    },
    {
      id: "E2",
      type: "choice",
      text: "How do you say 'Hello' in Korean (polite)?",
      options: [
        "안녕하세요",        // correct
        "감사합니다",
        "미안합니다",
        "잘 있어요"
      ],
      correct: 0
    },
    {
      id: "E3",
      type: "choice",
      text: "What does '안녕하세요?' mean?",
      options: [
        "Hello / Hi",       // correct
        "Thank you",
        "Good-bye",
        "Sorry"
      ],
      correct: 0
    },
    {
      id: "E4",
      type: "text",
      text: "Translate into Korean: 'Today the weather is good.'"
    },
    {
      id: "E5",
      type: "text",
      text: "Translate into Korean: 'My name is (name).'"
    },
    {
      id: "E6",
      type: "text",
      text:
        "Answer in Korean: 'Where do you live?' (write a simple sentence like 'I live in Seoul.')"
    }
  ],

  medium: [
    {
      id: "M1",
      type: "choice",
      text: "How do you say 'Tomorrow I will go to school' in Korean?",
      options: [
        "내일 학교 가요",
        "내일 학교 갔어요",
        "내일 학교 갈 거예요", // correct
        "내일 학교 가고 있어요"
      ],
      correct: 2
    },
    {
      id: "M2",
      type: "choice",
      text: "What does '시간 있으면 같이 커피 마셔요' mean?",
      options: [
        "If you have time, let's drink coffee together", // correct
        "I am buying coffee now",
        "I am very tired today",
        "Let's go home"
      ],
      correct: 0
    },
    {
      id: "M3",
      type: "text",
      text: "Translate into Korean: 'I think it will rain today.'"
    },
    {
      id: "M4",
      type: "text",
      text:
        "Answer in Korean: 'Why didn't you go to school today?' " +
        "(use a reason with a negative form)."
    },
    {
      id: "M5",
      type: "text",
      text:
        "어제는 친구를 만나서 영화를 봤어요. 그런데 너무 피곤해서 집에 일찍 갔어요.\n\n" +
        "Why did this person go home early?"
    },
    {
      id: "M6",
      type: "text",
      text: "Translate into Korean: 'After work, I will meet my friend.'"
    },
    {
      id: "M7",
      type: "text",
      text:
        "In Korean, describe what you usually do in the evening (1–2 sentences, present tense)."
    }
  ],

  hard: [
    {
      id: "H1",
      type: "text",
      text:
        "Write a sentence in Korean using the grammar '-지만' (but/however). " +
        "Make it a full sentence with two clear clauses (for example: 'I was tired, but I kept studying')."
    },
    {
      id: "H2",
      type: "text",
      text:
        "Translate into Korean: 'If I had more time, I would like to go to Korea.' " +
        "Use an unreal conditional form (hypothetical situation)."
    },
    {
      id: "H3",
      type: "text",
      text:
        "Briefly describe your plans for next year in Korean (2–3 sentences). " +
        "Use future tense and at least one connector such as '-려고 하다' or '-(으)ㄹ 계획이다'."
    },
    {
      id: "H4",
      type: "text",
      text:
        "Using the grammar '-(으)ㄴ 적이 있다/없다', write a short description (2–3 sentences) " +
        "about something you have experienced before and something you have never experienced."
    }
  ]
};
