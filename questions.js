// questions.js

// Structure is fully compatible with the current index.js.
// The code uses:
// - questions[user.difficulty]
// - q.type === "choice" or "text"
// - q.text, q.options, q.correct, q.id
// The other fields (section, topikLevel) are for future use.

export const questions = {
  easy: [
    {
      id: "E1",
      difficulty: "easy",
      section: "grammar",
      topikLevel: 1,
      type: "choice",
      text: "🔹 Choose the correct translation: 'Today I am going to school'.",
      options: [
        "✅ 오늘 학교에 가요",       // correct and visually clear
        "오늘 학교에 갔어요",
        "오늘 학교에 갈 거예요",
        "오늘 학교에 안 가요"
      ],
      correct: 0
    },
    {
      id: "E2",
      difficulty: "easy",
      section: "vocab",
      topikLevel: 1,
      type: "choice",
      text: "🕒 What does the phrase '시간 있을 때 뭐 해요?' mean?",
      options: [
        "What do you do when you have time? 😊",   // ✅
        "What time is it now?",
        "When is your exam?",
        "Where are you now?"
      ],
      correct: 0
    },
    {
      id: "E3",
      difficulty: "easy",
      section: "dialogue",
      topikLevel: 1,
      type: "choice",
      text:
        "☕ Read the dialogue and choose where it takes place:\n\n" +
        "A: 안녕하세요. 뭐 드릴까요?\n" +
        "B: 아이스 아메리카노 한 잔 주세요.\n",
      options: [
        "At a café ☕",        // ✅
        "At a pharmacy 💊",
        "At a movie theater 🎬",
        "At a university 🎓"
      ],
      correct: 0
    },
    {
      id: "E4",
      difficulty: "easy",
      section: "reading",
      topikLevel: 1,
      type: "choice",
      text:
        "📖 Read the text and answer the question:\n\n" +
        "민수 씨는 오늘 친구를 만나요.\n" +
        "저녁 7시에 홍대역 앞에서 만나기로 했어요.\n\n" +
        "❓ At what time is Minsu meeting his friend?",
      options: [
        "At 5 p.m.",
        "At 6 p.m.",
        "At 7 p.m. ⏰",   // ✅
        "At 8 p.m."
      ],
      correct: 2
    },
    // 🖼 "Picture": a child playing soccer
    {
      id: "E5",
      difficulty: "easy",
      section: "vocab",
      topikLevel: 1,
      type: "choice",
      text:
        "🖼 Imagine a picture: a child is playing 축구 (soccer) with friends outside.\n\n" +
        "Which sentence best matches this picture?",
      options: [
        "아이들이 도서관에서 공부해요.",
        "아이 한 명이 축구를 해요. ⚽",   // ✅
        "어른들이 회의하고 있어요.",
        "가족이 같이 저녁을 먹어요."
      ],
      correct: 1
    },
    {
      id: "E6",
      difficulty: "easy",
      section: "writing",
      topikLevel: 1,
      type: "text",
      text: "✍️ Translate into Korean: 'I like Korean food'."
    }
  ],

  medium: [
    {
      id: "M1",
      difficulty: "medium",
      section: "grammar",
      topikLevel: 2,
      type: "choice",
      text:
        "⌛ Choose the correct past tense form:\n\n" +
        "'Yesterday I met a friend and ate pizza'.",
      options: [
        "어제 친구를 만나고 피자를 먹어요.",
        "어제 친구를 만나서 피자를 먹었어요. 🍕",   // ✅
        "어제 친구를 만나니까 피자를 먹을 거예요.",
        "어제 친구를 만났지만 피자를 먹고 있어요."
      ],
      correct: 1
    },
    {
      id: "M2",
      difficulty: "medium",
      section: "reading",
      topikLevel: 2,
      type: "choice",
      text:
        "📖 Read the text and answer the question:\n\n" +
        "어제는 회사에서 일이 많아서 늦게까지 일했어요.\n" +
        "그래서 집에 돌아와서 바로 잤어요.\n\n" +
        "❓ Why did he go to bed as soon as he came home?",
      options: [
        "Because he was bored.",
        "Because he argued with a friend.",
        "Because he was tired after work. 😴",   // ✅
        "Because he had to get up early."
      ],
      correct: 2
    },
    {
      id: "M3",
      difficulty: "medium",
      section: "vocab",
      topikLevel: 2,
      type: "choice",
      text: "🧠 Which sentence is closest in meaning to '거의 매일 운동해요'?",
      options: [
        "I never exercise.",
        "I sometimes exercise.",
        "I exercise almost every day. 🏃‍♂️",   // ✅
        "I only exercise on weekends."
      ],
      correct: 2
    },
    {
      id: "M4",
      difficulty: "medium",
      section: "dialogue",
      topikLevel: 3,
      type: "choice",
      text:
        "🗣 Read the dialogue and choose the correct answer:\n\n" +
        "A: 이번 주말에 뭐 할 거예요?\n" +
        "B: 날씨가 좋으면 친구랑 등산할 거예요.\n\n" +
        "❓ What is B planning to do?",
      options: [
        "Go to the cinema with a friend. 🎬",
        "Go hiking with a friend if the weather is good. 🏔",  // ✅
        "Visit parents.",
        "Stay at home and sleep."
      ],
      correct: 1
    },
    {
      id: "M5",
      difficulty: "medium",
      section: "reading",
      topikLevel: 3,
      type: "choice",
      text:
        "🥗 Read the text and answer the question:\n\n" +
        "지민 씨는 평소에 아침을 잘 안 먹어요.\n" +
        "하지만 요즘 건강을 위해서 아침마다 샐러드를 먹기 시작했어요.\n\n" +
        "❓ Why did Jimin start eating salad in the morning?",
      options: [
        "Because he wants to lose weight.",
        "Because he simply likes salad.",
        "Because it is quick and cheap.",
        "Because he is thinking about his health. 💚"   // ✅
      ],
      correct: 3
    },
    // 🖼 "Picture"
    {
      id: "M6",
      difficulty: "medium",
      section: "reading",
      topikLevel: 3,
      type: "choice",
      imageUrl: "https://i.ibb.co/8g2mGV6v/a-hand-drawn-illustration-of-a-young-kor-89c43wf0-Tk-W-kb-VNFr13lw-b-It-Hs-SLi-Sz-Sv-Ge-ITYEg-Wrg.jpg",
      text:
        "Which sentence best describes this scene?",
      options: [
        "가족이 같이 저녁을 먹고 있어요. 🍚",   // ✅
        "친구들이 영화관에 가고 있어요.",
        "학생들이 도서관에서 공부해요.",
        "사람들이 회사에서 회의하고 있어요."
      ],
      correct: 0
    },
    {
      id: "M7",
      difficulty: "medium",
      section: "writing",
      topikLevel: 3,
      type: "text",
      text: "✍️ Translate into Korean: 'I think it will rain tomorrow'."
    },
    {
      id: "M8",
      difficulty: "medium",
      section: "writing",
      topikLevel: 3,
      type: "text",
      text: "✍️ Answer in Korean: What do you usually do in the evening?"
    }
  ],

  hard: [
    {
      id: "H1",
      difficulty: "hard",
      section: "reading",
      topikLevel: 4,
      type: "choice",
      text:
        "📖 Read the text and answer the question:\n\n" +
        "저는 요즘 회사 일이 많아서 스트레스를 많이 받아요.\n" +
        "그래서 퇴근하고 나면 혼자 조용한 카페에 가서 책을 읽어요.\n" +
        "그렇게 하면 마음이 조금 편해지는 것 같아요.\n\n" +
        "❓ What does the speaker do to relieve stress?",
      options: [
        "Watches movies at home.",
        "Goes to the gym.",
        "Goes to a quiet café and reads books. 📚",   // ✅
        "Returns to the office late."
      ],
      correct: 2
    },
    {
      id: "H2",
      difficulty: "hard",
      section: "dialogue",
      topikLevel: 4,
      type: "choice",
      text:
        "🗣 Read the dialogue and choose the correct answer:\n\n" +
        "A: 내일 모임에 올 수 있어요?\n" +
        "B: 사실 내일은 중요한 발표가 있어서 준비해야 해요.\n" +
        "A: 아, 그래서 못 오는군요.\n\n" +
        "❓ Why can't B come to the meeting?",
      options: [
        "Because he is sick.",
        "Because he has an important presentation. 📊",  // ✅
        "Because he is going on a trip.",
        "Because he forgot about the meeting."
      ],
      correct: 1
    },
    {
      id: "H3",
      difficulty: "hard",
      section: "reading",
      topikLevel: 5,
      type: "choice",
      text:
        "📖 Read the text and answer the question:\n\n" +
        "저는 예전에 매일 야근을 했어요.\n" +
        "그런데 건강이 많이 나빠져서 작년에 회사를 그만두고 프리랜서가 되었어요.\n" +
        "지금은 수입은 조금 줄었지만, 시간적인 여유가 생겨서 만족하면서 지내고 있어요.\n\n" +
        "❓ Why did the speaker quit the company?",
      options: [
        "Because the salary was too low.",
        "Because he wanted to travel around the world.",
        "Because his health got worse due to constant overtime. 🩺",   // ✅
        "Because he did not like his colleagues."
      ],
      correct: 2
    },
    {
      id: "H4",
      difficulty: "hard",
      section: "reading",
      topikLevel: 5,
      type: "choice",
      text:
        "📚 Read the text and answer the question:\n\n" +
        "민호 씨는 이번 학기에 한국어 능력 시험을 보려고 합니다.\n" +
        "그래서 매일 퇴근 후에 학원에 가서 두 시간씩 공부하고 있어요.\n" +
        "주말에는 모의고사를 풀면서 실력을 점검하고 있습니다.\n\n" +
        "❓ What is Minho doing to prepare for the exam?",
      options: [
        "He only listens to podcasts at home.",
        "He goes to a Korean language academy and solves mock tests. 📝",  // ✅
        "He is not preparing at all.",
        "He only studies conversational Korean with friends."
      ],
      correct: 1
    },
    {
      id: "H5",
      difficulty: "hard",
      section: "writing",
      topikLevel: 5,
      type: "text",
      text:
        "✍️ Write in Korean what you did last weekend. " +
        "Try to use 2–3 sentences."
    },
    {
      id: "H6",
      difficulty: "hard",
      section: "writing",
      topikLevel: 6,
      type: "text",
      text:
        "✍️ Write briefly in Korean (2–3 sentences) " +
        "about your plan for next year and why it is important to you."
    }
  ]
};