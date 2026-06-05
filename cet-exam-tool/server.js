const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 单词数据 - 包含CET-4和CET-6词汇
const wordsData = {
  cet4: [
    { id: 1, word: "abandon", pronunciation: "[ə'bændən]", meaning: "放弃，抛弃", example: "Never abandon your dreams.", exampleTranslation: "永远不要放弃你的梦想。" },
    { id: 2, word: "ability", pronunciation: "[ə'biliti]", meaning: "能力", example: "The ability to learn is important.", exampleTranslation: "学习能力很重要。" },
    { id: 3, word: "able", pronunciation: "['eibl]", meaning: "能够的，有能力的", example: "She is able to speak three languages.", exampleTranslation: "她能说三种语言。" },
    { id: 4, word: "about", pronunciation: "[ə'baut]", meaning: "关于，大约", example: "What is the book about?", exampleTranslation: "这本书是关于什么的？" },
    { id: 5, word: "above", pronunciation: "[ə'bʌv]", meaning: "在...上面", example: "The bird flew above the clouds.", exampleTranslation: "鸟儿飞到了云层之上。" },
    { id: 6, word: "abroad", pronunciation: "[ə'brɔːd]", meaning: "到国外，在国外", example: "She studied abroad for two years.", exampleTranslation: "她在国外学习了两年。" },
    { id: 7, word: "absence", pronunciation: "['æbsəns]", meaning: "缺席，不在", example: "His absence was noticed by the teacher.", exampleTranslation: "老师注意到了他的缺席。" },
    { id: 8, word: "absolute", pronunciation: "['æbsəluːt]", meaning: "绝对的，完全的", example: "It is an absolute necessity.", exampleTranslation: "这是绝对必要的。" },
    { id: 9, word: "absorb", pronunciation: "[əb'sɔːb]", meaning: "吸收，吸引", example: "Plants absorb water from the soil.", exampleTranslation: "植物从土壤中吸收水分。" },
    { id: 10, word: "abstract", pronunciation: "['æbstrækt]", meaning: "抽象的，摘要", example: "The concept is too abstract for me.", exampleTranslation: "这个概念对我来说太抽象了。" },
    { id: 11, word: "academic", pronunciation: "[ˌækə'demik]", meaning: "学术的，学院的", example: "She has an academic mind.", exampleTranslation: "她有学术头脑。" },
    { id: 12, word: "accept", pronunciation: "[ək'sept]", meaning: "接受，承认", example: "Please accept my sincere apologies.", exampleTranslation: "请接受我诚挚的歉意。" },
    { id: 13, word: "access", pronunciation: "['ækses]", meaning: "进入，接近，使用权", example: "Students have access to the library.", exampleTranslation: "学生可以使用图书馆。" },
    { id: 14, word: "accident", pronunciation: "['æksidənt]", meaning: "事故，意外", example: "It was a terrible accident.", exampleTranslation: "那是一场可怕的事故。" },
    { id: 15, word: "accomplish", pronunciation: "[ə'kʌmpliʃ]", meaning: "完成，达到", example: "We accomplished our goal.", exampleTranslation: "我们完成了目标。" },
    { id: 16, word: "according", pronunciation: "[ə'kɔːdiŋ]", meaning: "根据，按照", example: "According to the weather forecast, it will rain.", exampleTranslation: "根据天气预报，今天会下雨。" },
    { id: 17, word: "account", pronunciation: "[ə'kaunt]", meaning: "账户，叙述", example: "He opened a bank account.", exampleTranslation: "他开了一个银行账户。" },
    { id: 18, word: "accurate", pronunciation: "['ækjurət]", meaning: "准确的，精确的", example: "Please give an accurate description.", exampleTranslation: "请给出准确的描述。" },
    { id: 19, word: "achieve", pronunciation: "[ə'tʃiːv]", meaning: "达到，实现", example: "You can achieve great things.", exampleTranslation: "你可以取得伟大的成就。" },
    { id: 20, word: "acknowledge", pronunciation: "[ək'nɔlidʒ]", meaning: "承认，致谢", example: "I acknowledge your contribution.", exampleTranslation: "我承认你的贡献。" },
    { id: 21, word: "acquire", pronunciation: "[ə'kwaiə]", meaning: "获得，学到", example: "She acquired a good knowledge of French.", exampleTranslation: "她学会了流利的法语。" },
    { id: 22, word: "across", pronunciation: "[ə'krɔs]", meaning: "穿过，横跨", example: "Walk across the bridge.", exampleTranslation: "走过那座桥。" },
    { id: 23, word: "active", pronunciation: "['æktiv]", meaning: "积极的，主动的", example: "She is an active member of the club.", exampleTranslation: "她是俱乐部的活跃成员。" },
    { id: 24, word: "activity", pronunciation: "[æk'tiviti]", meaning: "活动", example: " outdoor activities", exampleTranslation: "户外活动" },
    { id: 25, word: "actual", pronunciation: "['æktʃuəl]", meaning: "实际的，真实的", example: "What were his actual words?", exampleTranslation: "他的实际原话是什么？" }
  ],
  cet6: [
    { id: 101, word: "abandon", pronunciation: "[ə'bændən]", meaning: "放弃，抛弃", example: "They had to abandon the ship.", exampleTranslation: "他们不得不弃船。" },
    { id: 102, word: "abnormal", pronunciation: "[æb'nɔːməl]", meaning: "反常的，变态的", example: "The weather is abnormal for this season.", exampleTranslation: "这个季节天气反常。" },
    { id: 103, word: "abolish", pronunciation: "[ə'bɔliʃ]", meaning: "废除，取消", example: "Slavery was abolished in the 19th century.", exampleTranslation: "奴隶制在19世纪被废除。" },
    { id: 104, word: "abortion", pronunciation: "[ə'bɔːʃən]", meaning: "流产，堕胎", example: "The law restricts abortion.", exampleTranslation: "法律限制堕胎。" },
    { id: 105, word: "abrupt", pronunciation: "[ə'brʌpt]", meaning: "突然的，陡峭的", example: "The road made an abrupt turn.", exampleTranslation: "路突然转弯了。" },
    { id: 106, word: "absence", pronunciation: "['æbsəns]", meaning: "缺席，短缺", example: "His absence caused problems.", exampleTranslation: "他的缺席引起了问题。" },
    { id: 107, word: "absorb", pronunciation: "[əb'sɔːb]", meaning: "吸收，理解", example: "The company absorbed the smaller one.", exampleTranslation: "公司吞并了那家小公司。" },
    { id: 108, word: "abstract", pronunciation: "['æbstrækt]", meaning: "抽象的，摘要", example: "The proposal is still in abstract form.", exampleTranslation: "提案仍处于抽象形式。" },
    { id: 109, word: "absurd", pronunciation: "[əb'səːd]", meaning: "荒谬的，荒唐的", example: "That is a completely absurd idea.", exampleTranslation: "那是一个完全荒谬的想法。" },
    { id: 110, word: "abundance", pronunciation: "[ə'bʌndəns]", meaning: "丰富，充裕", example: "The country has an abundance of natural resources.", exampleTranslation: "这个国家自然资源丰富。" },
    { id: 111, word: "abundant", pronunciation: "[ə'bʌndənt]", meaning: "丰富的，充足的", example: "We have abundant evidence.", exampleTranslation: "我们有充足的证据。" },
    { id: 112, word: "academy", pronunciation: "[ə'kædəmi]", meaning: "学院，研究院", example: "He graduated from a military academy.", exampleTranslation: "他从一所军事学院毕业。" },
    { id: 113, word: "accelerate", pronunciation: "[æk'seləreit]", meaning: "加速，促进", example: "The car accelerated speed.", exampleTranslation: "汽车加速了。" },
    { id: 114, word: "acceptance", pronunciation: "[ək'septəns]", meaning: "接受，承认", example: "The plan gained wide acceptance.", exampleTranslation: "该计划获得广泛认可。" },
    { id: 115, word: "access", pronunciation: "['ækses]", meaning: "进入，访问", example: "The only access to the island is by boat.", exampleTranslation: "进入岛屿的唯一方式是乘船。" },
    { id: 116, word: "accessory", pronunciation: "[æk'sesəri]", meaning: "附件，配件", example: "car accessories", exampleTranslation: "汽车配件" },
    { id: 117, word: "accident", pronunciation: "['æksidənt]", meaning: "事故，意外", example: "It was no accident that he was here.", exampleTranslation: "他在这里并非偶然。" },
    { id: 118, word: "accommodate", pronunciation: "[ə'kɔmədeit]", meaning: "容纳，使适应", example: "The hotel can accommodate 500 guests.", exampleTranslation: "这家酒店可容纳500位客人。" },
    { id: 119, word: "accompany", pronunciation: "[ə'kʌmpəni]", meaning: "陪伴，伴随", example: "She accompanied her friend to the doctor.", exampleTranslation: "她陪朋友去看医生。" },
    { id: 120, word: "accomplish", pronunciation: "[ə'kʌmpliʃ]", meaning: "完成，实现", example: "We accomplished the task on time.", exampleTranslation: "我们按时完成了任务。" }
  ],
  phrases: [
    { id: 201, phrase: "a bunch of", meaning: "一堆，一群", example: "She bought a bunch of flowers.", exampleTranslation: "她买了一束花。" },
    { id: 202, phrase: "all of a sudden", meaning: "突然", example: "All of a sudden, it started raining.", exampleTranslation: "突然，天开始下雨了。" },
    { id: 203, phrase: "as a matter of fact", meaning: "实际上", example: "As a matter of fact, I do know her.", exampleTranslation: "实际上，我确实认识她。" },
    { id: 204, phrase: "as far as I'm concerned", meaning: "就我而言", example: "As far as I'm concerned, this is the best solution.", exampleTranslation: "就我而言，这是最好的解决方案。" },
    { id: 205, phrase: "as long as", meaning: "只要", example: "You can go as long as you come back early.", exampleTranslation: "只要你早点回来，你就可以去。" },
    { id: 206, phrase: "break up", meaning: "分手，结束", example: "They broke up last month.", exampleTranslation: "他们上个月分手了。" },
    { id: 207, phrase: "bring about", meaning: "导致，引起", example: "Technology has brought about many changes.", exampleTranslation: "科技带来了很多变化。" },
    { id: 208, phrase: "bring up", meaning: "抚养，提出", example: "She brought up three children alone.", exampleTranslation: "她独自抚养了三个孩子。" },
    { id: 209, phrase: "by accident", meaning: "偶然", example: "I found this book by accident.", exampleTranslation: "我偶然发现了这本书。" },
    { id: 210, phrase: "by all means", meaning: "务必，一定", example: "Please come by all means.", exampleTranslation: "请务必来。" },
    { id: 211, phrase: "come across", meaning: "遇到，发现", example: "I came across an old photo.", exampleTranslation: "我偶然发现了一张老照片。" },
    { id: 212, phrase: "come up with", meaning: "想出，提出", example: "She came up with a great idea.", exampleTranslation: "她想出了一个好主意。" },
    { id: 213, phrase: "cut down", meaning: "减少，砍倒", example: "You should cut down on sugar.", exampleTranslation: "你应该减少糖的摄入。" },
    { id: 214, phrase: "do without", meaning: "没有...也行", example: "I can't do without my morning coffee.", exampleTranslation: "我不能没有早上那杯咖啡。" },
    { id: 215, phrase: "draw a conclusion", meaning: "得出结论", example: "We can draw a conclusion from this.", exampleTranslation: "我们可以从中得出结论。" }
  ]
};

// 用户学习进度
let userProgress = {};

// 获取单词列表
app.get('/api/words/:level', (req, res) => {
  const level = req.params.level;
  if (wordsData[level]) {
    res.json(wordsData[level]);
  } else {
    res.status(404).json({ error: 'Level not found' });
  }
});

// 获取所有数据
app.get('/api/all', (req, res) => {
  res.json(wordsData);
});

// 获取用户进度
app.get('/api/progress/:userId', (req, res) => {
  const userId = req.params.userId;
  res.json(userProgress[userId] || { learned: [], mastered: [], reviewQueue: [] });
});

// 更新学习进度 (基于间隔重复算法)
app.post('/api/progress/:userId', (req, res) => {
  const userId = req.params.userId;
  const { wordId, level, correct } = req.body;

  if (!userProgress[userId]) {
    userProgress[userId] = { learned: [], mastered: [], reviewQueue: [], wordIntervals: {} };
  }

  const intervalKey = `${level}_${wordId}`;

  if (!userProgress[userId].wordIntervals[intervalKey]) {
    userProgress[userId].wordIntervals[intervalKey] = { interval: 1, nextReview: Date.now() };
  }

  const wordInterval = userProgress[userId].wordIntervals[intervalKey];

  if (correct) {
    // 答对了，增加间隔 (1 -> 2 -> 4 -> 8 -> 16天)
    wordInterval.interval = Math.min(wordInterval.interval * 2, 30);
    wordInterval.nextReview = Date.now() + wordInterval.interval * 24 * 60 * 60 * 1000;

    if (!userProgress[userId].learned.includes(intervalKey)) {
      userProgress[userId].learned.push(intervalKey);
    }
    if (wordInterval.interval >= 7 && !userProgress[userId].mastered.includes(intervalKey)) {
      userProgress[userId].mastered.push(intervalKey);
    }
  } else {
    // 答错了，重置间隔
    wordInterval.interval = 1;
    wordInterval.nextReview = Date.now() + 10 * 60 * 1000; // 10分钟后复习
  }

  // 更新复习队列
  updateReviewQueue(userId);

  res.json({ success: true, interval: wordInterval.interval });
});

// 更新复习队列
function updateReviewQueue(userId) {
  const progress = userProgress[userId];
  if (!progress) return;

  progress.reviewQueue = [];
  const now = Date.now();

  for (const [key, data] of Object.entries(progress.wordIntervals)) {
    if (data.nextReview <= now + 24 * 60 * 60 * 1000) { // 未来24小时内需要复习的
      progress.reviewQueue.push({ key, nextReview: data.nextReview, interval: data.interval });
    }
  }

  progress.reviewQueue.sort((a, b) => a.nextReview - b.nextReview);
}

// 获取需要复习的单词
app.get('/api/review/:userId', (req, res) => {
  const userId = req.params.userId;
  updateReviewQueue(userId);

  const progress = userProgress[userId];
  if (!progress || progress.reviewQueue.length === 0) {
    return res.json({ words: [], message: 'No words to review right now!' });
  }

  const wordsToReview = progress.reviewQueue.slice(0, 10).map(item => {
    const [level, wordId] = item.key.split('_');
    const wordData = wordsData[level]?.find(w => w.id === parseInt(wordId));
    return wordData ? { ...wordData, level } : null;
  }).filter(Boolean);

  res.json({ words: wordsToReview, queueLength: progress.reviewQueue.length });
});

// 获取统计数据
app.get('/api/stats/:userId', (req, res) => {
  const userId = req.params.userId;
  const progress = userProgress[userId];

  if (!progress) {
    return res.json({ total: 0, learned: 0, mastered: 0, toReview: 0 });
  }

  const total = wordsData.cet4.length + wordsData.cet6.length;
  res.json({
    total,
    learned: progress.learned.length,
    mastered: progress.mastered.length,
    toReview: progress.reviewQueue?.length || 0
  });
});

// SPA路由
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Access from external: http://0.0.0.0:${PORT}`);
});