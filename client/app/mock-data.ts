export type Tutor = {
  id: number;
  name: string;
  address: string;
  about: string;
  avatar: string;
  rating: number;
  tags: string[];
  attended: number;
  offered: number;
  courses: Course[];
};

const baseTutors = [
  {
    id: 1,
    name: "Winnie C.S",
    address: "0x3fB5C0dC4Bf928fF7EfD1fDbC7E7A0Ae2D3B1Ab2",
    about:
      "Vithal is an experienced leader in tech education 🎓, with over 30 years in the IT industry and a background in computer science. He’s passionate about mentoring startups and innovators 🚀, having supported 100+ entrepreneurs and helped establish successful incubation centers. In past roles, Vithal led partner innovation initiatives, guiding teams to create next-gen solutions for industries like banking and healthcare 💼💊. He has also worked in consulting and software development, where he was recognized for his innovation and excellence ✨. Outside of work, Vithal is happily married with two wonderful kids.",
    avatar:
      "https://noun-api.com/beta/pfp?head=229&glasses=19&background=0&body=27&accessory=3",
    rating: 3,
    tags: ["TechMentor", "InnovationLeader", "StartupSupport"],
    attended: 2,
    offered: 6,
    courses: [
      {
        id: 11,
        name: "Blockchain Framework & Platforms",
        image: "/assets/courses/1.webp",
        description: `Learn essential principles of blockchain platforms as well as their growth, progress, and important use cases. Dive deep into fundamental parts of developing apps on commonly used platforms including Ethereum, Hyperledger, and Quorum.`,
        rating: 4.8,
        price: 100,
        duration: 20,
        participantCount: 1,
      },
      {
        id: 12,
        name: "Smart Contract and Solana dApps Development with Rust",
        image: "/assets/courses/2.webp",
        description: `Master blockchain principles and smart contract development using Rust on Solana. Designed for those with programming experience, this course unlocks new career opportunities in Smart Contract and dApp Development.`,
        rating: 4.5,
        price: 200,
        duration: 15,
        participantCount: 1,
      },
      {
        id: 13,
        name: "E-Payment",
        image: "/assets/courses/3.webp",
        description: `✨ Master the technologies behind e-payment systems and learn about their security mechanisms.`,
        rating: 4.2,
        price: 300,
        duration: 2,
        participantCount: 1,
      },
      {
        id: 14,
        name: "Dive Into the World of Blockchain: Principles, Mechanics, and Tokens",
        image: "/assets/courses/4.webp",
        description: `Blockchain is a transformative digital value management tool that operates without the need for a trusted intermediary, such as a custodian, to authorize asset usage and transfers. It enables seamless peer-to-peer value transfers, facilitates borderless transactions, and automates processes, effectively becoming the internet of value. This segment will explain how blockchain operates and draw a contrast with the traditional world of finance.`,
        rating: 4,
        price: 400,
        duration: 5,
        participantCount: 1,
      },
      {
        id: 15,
        name: "Blockchain Implementation and Regulation: Challenges, Opportunities and Future Implications",
        image: "/assets/courses/5.webp",
        description: `This course will begin by building on your understanding of the blockchain regulatory framework. It will walk you through the steps to successfully implement a blockchain solution and develop an understanding of the challenges and opportunities facing the future of blockchain. You’ll also learn about how blockchain's architecture entails elements such as networks, ledgers, and software, and gain an understanding of blockchain's business models and its implications for economic and financial development. Additionally, you’ll explore some of the challenges that affect blockchain technology, discover how the Lightning Network can counter some of these challenges, and consider the possibilities of a blockchain-enabled community.`,
        rating: 4.5,
        price: 500,
        duration: 7.5,
        participantCount: 1,
      },
      {
        id: 16,
        name: "Introduction to Hyperledger Self-Sovereign Identity Blockchain Solutions",
        image: "/assets/courses/6.webp",
        description: `To the surprise of absolutely no one, trust is broken on the Internet. Wherever you go online, the advice is the same--make sure you understand what's behind each button before you click it. In this course, we'll dive into four Hyperledger open source identity-based projects--Indy, Aries, AnonCreds, and Ursa--looking at the tools, libraries, and reusable components they provide for creating and using independent digital identities rooted on blockchains or other distributed ledgers. We will explore the possibilities they offer for building applications on a solid digital foundation of trust and examine how these technologies can make the Internet safe. It's quite a challenge! The course is addressed to a wide-ranging audience, walking the line between business and technology.`,
        rating: 4.9,
        price: 600,
        duration: 10,
        participantCount: 1,
      },
    ],
  },
  {
    id: 2,
    name: "Johnny Y.J",
    address: "0x446fRQHEfwefwe324hg34herhglerg",
    about:
      "Emma Sullivan is a technical writer with more than 14 years experience, working for both hardware and software companies writing user guides, technical references, help text, and so on. She has been helping document the BC Government initiatives (VON, Greenlight, OrgBook BC and IIWBook) and became hooked on self-sovereign identity at IIW28.",
    avatar:
      "https://noun-api.com/beta/pfp?head=2&glasses=19&background=0&body=24&accessory=3",
    rating: 4,
    tags: ["TechWriterExpert", "SelfSovereignIdentity"],
    attended: 3,
    offered: 2,
    courses: [
      {
        id: 17,
        name: "Introduction to Hyperledger Self-Sovereign Identity Blockchain Solutions",
        image: "/assets/courses/7.webp",
        description: `To the surprise of absolutely no one, trust is broken on the Internet. Wherever you go online, the advice is the same--make sure you understand what's behind each button before you click it. In this course, we'll dive into four Hyperledger open source identity-based projects--Indy, Aries, AnonCreds, and Ursa--looking at the tools, libraries, and reusable components they provide for creating and using independent digital identities rooted on blockchains or other distributed ledgers. We will explore the possibilities they offer for building applications on a solid digital foundation of trust and examine how these technologies can make the Internet safe. It's quite a challenge! The course is addressed to a wide-ranging audience, walking the line between business and technology.`,
        rating: 5,
        price: 700,
        duration: 4,
        participantCount: 1,
      },
      {
        id: 18,
        name: "Introduction to Self-Sovereign Identity",
        image: "/assets/courses/8.webp",
        description: `Imagine moving to a new country and having to register to use any type of service: voting, getting a driver’s license, electricity service, and new bank details. At the moment, to open a new account you need to register with each new service provider and prove your identity, and each time, to access, you need to prove your identity by entering your password and credentials. A decentralized identity would radically simplify such a process. It should satisfy certain principles to ensure that it does not have the same problems and limitations as the previous models.`,
        rating: 4.8,
        price: 800,
        duration: 20,
        participantCount: 1,
      },
    ],
  },
  {
    id: 3,
    name: "Mason J.K",
    address: "0x446fRQHEfwefwe324hg34herhglerg",
    about: "Hello, everyone! I’m Mason, a huge fan of the Chiikawa world. I'm here to share the wonderful stories of Chiikawa, introducing not only the characters but also exploring their backgrounds and deeper meanings. I’ll also draw connections between their stories and real life, analyzing the characters' MBTI types, and delving into themes like psychological and economic issues. Join me as we dive into this complex and beautiful world!",
    avatar:
      "https://noun-api.com/beta/pfp?head=2&glasses=19&background=0&body=24&accessory=3",
    rating: 4.8,
    tags: ["Chiikawa", "FantasyCharacterAnalysis", "ChiikawaAndLife", "SoulfulJourney"],
    attended: 10,
    offered: 6,
    courses: [
      {
        id: 19,
        name: "Exploring the World and Characters of Chiikawa",
        image: "/assets/courses/Chiikawa1.jpeg",
        description: `This course takes you into the fascinating world of Chiikawa, covering its richly detailed settings and core characters. We will dive deep into each character’s motivations and development, looking at the dynamics between main and supporting characters, and analyzing the choices they make in the face of challenges. This course will explore each character’s origins, unique traits, and important roles in the story. Ultimately, you will gain a deeper understanding of the Chiikawa universe and how these characters reflect different facets of human nature.`,
        rating: 5,
        price: 200,
        duration: 2,
        participantCount: 20,
      },
      {
        id: 20,
        name: "Symbolism and Meaning Behind Chiikawa: A Journey of Personal Growth",
        image: "/assets/courses/Chiikawa2.jpeg",
        description: `Chiikawa’s story isn’t just about adventure; it symbolizes a journey of personal growth. This course focuses on the emotional changes and growth of each character, exploring the deeper psychological meanings behind their experiences. From fear to courage, loneliness to companionship, Chiikawa’s characters bring forth numerous insights. We’ll analyze the psychological transformations they undergo when facing challenges and discuss how these transformations offer real-life inspiration. This course is perfect for those looking to find resonance within Chiikawa’s adventures.`,
        rating: 4.8,
        price: 200,
        duration: 2,
        participantCount: 20,
      },
      {
        id: 21,
        name: "Analyzing Chiikawa Characters’ MBTI Types: Understanding the Power of Personality",
        image: "/assets/courses/Chiikawa3.jpg",
        description: `Each character in Chiikawa has a unique personality. This course will delve into character analysis based on MBTI personality types, examining their actions, decisions, and interactions with others. We’ll align each character with specific MBTI traits, analyzing their strengths and weaknesses and discussing how personality shapes their growth and choices. This analysis will not only deepen your understanding of each character but also shed light on how different personalities create dynamic and engaging storylines.`,
        rating: 4.8,
        price: 200,
        duration: 2,
        participantCount: 20,
      },
      {
        id: 22,
        name: "Real-Life Connections in Chiikawa: Character Growth and Our Daily Lives",
        image: "/assets/courses/Chiikawa4.jpeg",
        description: `Chiikawa’s story doesn’t entirely disconnect from reality; many of the challenges its characters face mirror our own. In this course, we’ll compare the characters’ experiences with real-life struggles, exploring how their decisions provide insights into real-life situations. By analyzing how characters overcome their challenges, we’ll discuss ways to apply these experiences to our personal growth and daily challenges, offering fresh perspectives on the meaning of growth.`,
        rating: 4.8,
        price: 200,
        duration: 2,
        participantCount: 20,
      },
      {
        id: 23,
        name: "Economic Themes in Chiikawa: Power, Resources, and Choices",
        image: "/assets/courses/Chiikawa5.jpg",
        description: `Chiikawa’s world also reflects dynamics of resource distribution and power. This course examines the economic structure within the story, including resource allocation and social classes represented by various characters, and how these elements shape characters’ choices and fates. We’ll also discuss the relativity of power and consider whether Chiikawa’s social structure offers insights into real-world economic systems. This thought-provoking course encourages you to rethink the relationships between wealth, power, and individual destiny.`,
        rating: 5,
        price: 200,
        duration: 2,
        participantCount: 20,
      },
      {
        id: 24,
        name: "Soul and Philosophy: Inner Pursuits and Spiritual Exploration in Chiikawa",
        image: "/assets/courses/Chiikawa6.jpeg",
        description: `Chiikawa’s story holds many profound philosophies about the soul and spiritual exploration. In this course, we will explore the characters’ internal conflicts and spiritual growth, analyzing the philosophical meanings within the story. From the blurred lines between good and evil to the meaning of life, we’ll dive into the philosophical thoughts within Chiikawa. This course is ideal for those who seek deeper reflections on self-worth and personal growth through the story of Chiikawa, providing inspiration for the soul.`,
        rating: 5,
        price: 200,
        duration: 2,
        participantCount: 20,
      },
    ],
  },
  {
    id: 4,
    name: "Josie X.D",
    address: "0x344604EdE059444713e5a26d55a051fC6A2058F6",
    about: "Hi, I’m Josie, a passionate home cook from Thailand! Although I’ve never attended formal culinary school, I’ve spent years perfecting my skills in the kitchen, crafting authentic Thai dishes that bring smiles to family and friends. Cooking is not just my daily routine—it’s my way of sharing love and culture. Now, through BeeTutor, I’m excited to teach you how to create some of Thailand’s most beloved flavors in your own kitchen. Whether you’re a beginner or an experienced cook, let’s explore the art of Thai cuisine together!",
    avatar:
      "https://noun-api.com/beta/pfp?head=2&glasses=19&background=0&body=24&accessory=3",
    rating: 4.8,
    tags: ["JosiesThaiKitchen", "AuthenticThaiCooking"],
    attended: 2,
    offered: 4,
    courses: [
      {
        id: 25,
        name: "How to Make a Thai Milk Tea",
        image: "/assets/courses/ThaiMilkTea.webp",
        description: `Thai basil pork, or Pad Kra Pao, is a quick and flavorful stir-fried dish loved by many. In this class, you’ll learn how to make this iconic recipe that perfectly combines spicy, savory, and aromatic flavors, all in under 30 minutes! You’ll start by learning how to choose the right type of Thai basil and prepare a simple yet delicious sauce to complement the dish. I’ll also share cooking techniques to ensure the pork is tender and the sauce is packed with flavor. Whether served with jasmine rice or topped with a fried egg, this dish is a staple of Thai cuisine that you can easily recreate at home. By the end of the class, you’ll have mastered the secrets of Pad Kra Pao and be ready to impress your friends and family with this classic Thai comfort food.`,
        rating: 5,
        price: 200,
        duration: 0.5,
        participantCount: 20,
        tags: ["ThaiBeverages", "MilkTea", "ThaiCuisine"],
        chatId: '7c203104fae077d1a131d6c59c572989b98ae880cad9a8af68568db59aeff3f6',
      },
      {
        id: 26,
        name: "How to Make Thai Green Curry",
        image: "/assets/courses/ThaigreenCurry.webp",
        description: `Thai green curry is a rich and creamy dish full of bold, aromatic flavors. In this class, you’ll learn to make an authentic green curry from scratch, starting with preparing your own curry paste using fresh ingredients like green chilies and lemongrass. We’ll cover how to balance spiciness, sweetness, and creaminess to create a flavorful curry base with coconut milk. You’ll also learn how to cook vegetables and proteins to pair perfectly with the sauce. By the end of the class, you’ll have a delicious bowl of green curry ready to serve, plus the confidence to make it anytime you crave this Thai classic!`,
        rating: 4.8,
        price: 200,
        duration: 1.5,
        participantCount: 20,
        tags: ["ThaiCurry", "GreenCurry", "ThaiCuisine"],
      },
      {
        id: 27,
        name: "How to Make Thai Basil Pork",
        image: "/assets/courses/ThaiBasilPork.webp",
        description: `Thai basil pork, or Pad Kra Pao, is a quick and flavorful stir-fried dish loved by many. In this class, you’ll learn how to make this iconic recipe that perfectly combines spicy, savory, and aromatic flavors, all in under 30 minutes! You’ll start by learning how to choose the right type of Thai basil and prepare a simple yet delicious sauce to complement the dish. I’ll also share cooking techniques to ensure the pork is tender and the sauce is packed with flavor. Whether served with jasmine rice or topped with a fried egg, this dish is a staple of Thai cuisine that you can easily recreate at home. By the end of the class, you’ll have mastered the secrets of Pad Kra Pao and be ready to impress your friends and family with this classic Thai comfort food.`,
        rating: 4.8,
        price: 200,
        duration: 1.5,
        participantCount: 15,
        tags: ["ThaiCooking", "BasilPork", "QuickMeals"],
      },
      {
        id: 28,
        name: "How to Make Thai Papaya Salad",
        image: "/assets/courses/ThaiPapayaSalad.webp",
        description: `Som Tum, or Thai papaya salad, is a refreshing and tangy dish that’s a staple of Thai street food. In this class, you’ll learn how to prepare green papaya and create the perfect dressing using traditional ingredients like fish sauce, lime, and chilies. I’ll guide you through balancing the sweet, sour, salty, and spicy flavors that make this salad so addictive. Whether you’re serving it as a side dish or a light meal, Som Tum is the perfect way to add a burst of Thai flavor to your table. By the end of the class, you’ll have mastered this iconic salad and be able to customize it to suit your taste!`,
        rating: 4.8,
        price: 200,
        duration: 1,
        participantCount: 10,
        tags: ["ThaiSalad", "PapayaSalad", "ThaiCuisine"],
      },
    ],
  },
  {
    id: 5,
    name: "Spark Huang",
    address: "0x446fRQHEfwefwe324hg34herhglerg",
    about:
      "Spark is a professional fitness coach specializing in weight loss and healthy lifestyles. With years of experience, he is passionate about helping students develop sustainable weight management plans while improving both physical and mental well-being. Spark believes that everyone can achieve their health goals through proper exercise and nutrition.",
    avatar:
      "https://noun-api.com/beta/pfp?head=2&glasses=19&background=0&body=24&accessory=3",
    rating: 4.5, // Adjusted to reflect a more diverse testing dataset
    tags: ["WeightLoss", "HealthyLiving", "WeightManagement"],
    attended: 1,
    offered: 3,
    courses: [],
  },
  {
    id: 6,
    name: "You-Sheng",
    address: "0x446fRQHEfweffubkiijw4herhglerg",
    about:
      "You-Sheng is a frontend developer with a passion for creating seamless user experiences. With expertise in modern web technologies like React and TypeScript, he enjoys building responsive and dynamic web applications. He is dedicated to continuous learning and is eager to share his knowledge with aspiring developers.",
    avatar:
      "https://noun-api.com/beta/pfp?head=2&glasses=19&background=0&body=24&accessory=3",
    rating: 4.8,
    tags: ["Frontend", "React", "WebDevelopment"],
    attended: 1,
    offered: 3,
    courses: [{
      id: 29,
      name: "Introduction to React",
      image: "/assets/courses/react1.webp",
      description: `This course covers the basics of React.js, including components, state, props, and lifecycle methods. Learn how to build dynamic user interfaces for modern web applications.`,
      rating: 4.7,
      price: 150,
      duration: 12,
      participantCount: 15,
    },
    {
      id: 30,
      name: "Building Advanced React Applications",
      image: "/assets/courses/react2.webp",
      description: `Take your React skills to the next level! This course focuses on advanced topics like hooks, context API, performance optimization, and state management with Redux.`,
      rating: 4.9,
      price: 250,
      duration: 18,
      participantCount: 12,
    },],
  },
  {
    id: 7,
    name: "Mannie",
    address: "0x3F4A9b2Df5c928fE7AfD2e7B2B7C9a0Ae3D3B2Cd",
    about:
      "Mannie is a graduate student actively developing project management (PM) skills. With a keen interest in agile methodologies and product development, Mannie is focused on mastering the principles of teamwork, leadership, and strategic planning. Passionate about applying theoretical knowledge to real-world projects, Mannie enjoys collaborating with diverse teams and sharing insights on efficient project workflows.",
    avatar:
      "https://noun-api.com/beta/pfp?head=25&glasses=3&background=7&body=15&accessory=5",
    rating: 4.6,
    tags: ["ProjectManagement", "Agile", "GraduateStudent"],
    attended: 0,
    offered: 1,
    courses: [
      {
        id: 31,
        name: "Introduction to Agile Project Management",
        image: "/assets/courses/agile1.webp",
        description: `This course covers the fundamentals of agile project management, including Scrum, Kanban, and sprint planning. Learn how to manage projects efficiently in a fast-paced environment.`,
        rating: 4.8,
        price: 180,
        duration: 10,
        participantCount: 25,
      },
    ],
  },
  {
    id: 8,
    name: "Ben C.T",
    address: "0x446fRQHEfwefwe324hg34herhglerg",
    about: "",
    avatar:
      "https://noun-api.com/beta/pfp?head=2&glasses=19&background=0&body=24&accessory=3",
    rating: 4.8,
    tags: ["FitnessWithBen", "HealthyLiving", "PersonalTrainerGoals"],
    attended: 1,
    offered: 3,
    courses: [],
  },
  {
    id: 9,
    name: "York J.N",
    address: "0x446fRQHEfwefwe324hg34herhglerg",
    about: "",
    avatar:
      "https://noun-api.com/beta/pfp?head=2&glasses=19&background=0&body=24&accessory=3",
    rating: 4.8,
    tags: ["WorkSmart", "StayAlertStaySafe"],
    attended: 4,
    offered: 9,
    courses: [],
  },
];

export const tutors: Tutor[] = baseTutors.map((tutor) => ({
  ...tutor,
  courses: tutor.courses.map((x) => ({ ...x, tutor })) as Course[],
}));

export type Course = {
  tags?: string[];
  participantCount: number;
  duration: number;
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  rating: number;
  tutor: Tutor;
  chatId?: string;
};

export const courseData: Course[] = tutors.flatMap((tutor) => tutor.courses);

export interface IReviewsData {
  id: number;
  name: string;
  comment: string;
  date: string;
  from: string;
  rating: number;
}

export const reviewData: IReviewsData[] = [
  {
    id: 1,
    name: "John Doe",
    comment: "In-depth and well-structured!",
    rating: 5,
    date: "2024-9-12",
    from: "0x492fRQHEfwefwe324hg34herhglerg",
  },
  {
    id: 2,
    name: "Jane Smith",
    comment: "Great for learning advanced topics!",
    rating: 4,
    date: "2024-9-15",
    from: "0x492fRQHEfwefwe324hg34herhglerg",
  },
  {
    id: 3,
    name: "Tim Adams",
    comment: "The examples made it easy to understand!",
    rating: 3.5,
    date: "2024-10-2",
    from: "0x492fRQHEfwefwe324hg34herhglerg",
  },
  {
    id: 4,
    name: "Linda Zhu",
    comment: "Very practical course!",
    rating: 5,
    date: "2024-10-5",
    from: "0x492fRQHEfwefwe324hg34herhglerg",
  },
  {
    id: 5,
    name: "Sarah Lee",
    comment: "Perfect for beginners.",
    rating: 5,
    date: "2024-11-1",
    from: "0x492fRQHEfwefwe324hg34herhglerg",
  },
  {
    id: 6,
    name: "Alex Johnson",
    comment: "Very practical and easy to follow!",
    rating: 3,
    date: "2024-11-1",
    from: "0x492fRQHEfwefwe324hg34herhglerg",
  },
];

export const bidValueData = [
  {
    bidder: "0x492fRQHEfwefwe324hg34herhglerg",
    bidTime: 1630906400000, // 2021-08-20T00:00:00.000Z
    amount: "10000000000000000000", // 1000 eth
  },
  {
    bidder: "0x492fRQHEfwefwe324hg34herhglerg",
    bidTime: 1630906400000, // 2021-08-20T00:00:00.000Z
    amount: "9000000000000000000", // 1000 eth
  },
  {
    bidder: "0x492fRQHEfwefwe324hg34herhglerg",
    bidTime: 1630906400000, // 2021-08-20T00:00:00.000Z
    amount: "7000000000000000000", // 1000 eth
  },
  {
    bidder: "0x492fRQHEfwefwe324hg34herhglerg",
    bidTime: 1630906400000, // 2021-08-20T00:00:00.000Z
    amount: "9000000000000000000", // 1000 eth
  },
  {
    bidder: "0x492fRQHEfwefwe324hg34herhglerg",
    bidTime: 1630906400000, // 2021-08-20T00:00:00.000Z
    amount: "6000000000000000000", // 1000 eth
  },
  {
    bidder: "0x492fRQHEfwefwe324hg34herhglerg",
    bidTime: 1630906400000, // 2021-08-20T00:00:00.000Z
    amount: "9000000000000000000", // 1000 eth
  },
];
