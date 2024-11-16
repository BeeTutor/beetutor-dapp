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
    name: "ArjunSharma",
    address: "0x3fB5C0dC4Bf928fF7EfD1fDbC7E7A0Ae2D3B1Ab2",
    about:
      "Vithal is an experienced leader in tech education 🎓, with over 30 years in the IT industry and a background in computer science. He’s passionate about mentoring startups and innovators 🚀, having supported 100+ entrepreneurs and helped establish successful incubation centers. In past roles, Vithal led partner innovation initiatives, guiding teams to create next-gen solutions for industries like banking and healthcare 💼💊. He has also worked in consulting and software development, where he was recognized for his innovation and excellence ✨. Outside of work, Vithal is happily married with two wonderful kids.",
    avatar: "/assets/avatar/1.svg",
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
        duration:15,
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
    name: "EmmaSullivan",
    address: "0x446fRQHEfwefwe324hg34herhglerg",
    about:
      "Emma Sullivan is a technical writer with more than 14 years experience, working for both hardware and software companies writing user guides, technical references, help text, and so on. She has been helping document the BC Government initiatives (VON, Greenlight, OrgBook BC and IIWBook) and became hooked on self-sovereign identity at IIW28.",
    avatar: "/assets/avatar/2.svg",
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
];

export const tutors: Tutor[] = baseTutors.map((tutor) => ({
  ...tutor,
  courses: tutor.courses.map((x) => ({ ...x, tutor })) as Course[],
}));

export type Course = {
  participantCount: number;
  duration: number;
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  rating: number;
  tutor: Tutor;
};
export const courseData: Course[] = tutors.flatMap((tutor) => tutor.courses);


export interface IReviewsData{
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
]