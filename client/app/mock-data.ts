const courseItem = {
  id: 1,
  title: "Complete Spanish Course: Master Spanish Beginner to...",
  info: "Economics: Analyzing Demand, Supply and Market Equilibrium with Real Life Case",
  user: {
    address: "0x445fRQHEfwefwe324hg34herhglerg",
    description: "擅長教學數學，耐心指導學生",
    avatar: "https://noun-api.com/beta/pfp",
  },
  rating: 3.5,
  subject: "數學",
  price: 320,
  tags: ["代數", "微積分", "幾何"],
  image: "/assets/banner/1.webp",
  reviews: 999,
  bestseller: true,
};

export type Course = typeof courseItem;
export const courseData: Course[] = new Array(10).fill(courseItem);

const userItem = {
  id: 1,
  name: "John Doe",
  address: "0x445fRQHEfwefwe324hg34herhglerg",
  info: "擅長教學數學，耐心指導學生",
  avatar: "https://noun-api.com/beta/pfp",
  rating: 4.9,
  tags: ["代數", "微積分", "幾何", "瑜珈"],
  attended: 2,
  offered: 4,
  courses: [
    {
      id: 1,
      courseName: "Introduction to Blockchain",
      description: "A comprehensive introduction to blockchain technology.",
      rating: 4.7, // 評分綁定在課程層級
      batches: [
        {
          batchId: 101,
          startDate: "2024-11-01T09:00:00Z",
          endDate: "2024-12-01T18:00:00Z",
          participants: 25,
          bids: [
            {
              date: new Date(),
              address: "0xfwefhwoefhwo21DERT3q4t34t232",
              price: 30,
            },
            {
              date: new Date(),
              address: "0xfwefhwoefhwo21DERT3q4t34t232",
              price: 100,
            },
            {
              date: new Date(),
              address: "0xfwefhwoefhwo21DERT3q4t34t232",
              price: 50,
            },
          ],
        },
        {
          batchId: 102,
          startDate: "2025-01-10T09:00:00Z",
          endDate: "2025-02-10T18:00:00Z",
          participants: 30,
          bids: [
            {
              date: new Date(),
              address: "0xfwefhwoefhwo21DERT3q4t34t232",
              price: 30,
            },
            {
              date: new Date(),
              address: "0xfwefhwoefhwo21DERT3q4t34t232",
              price: 100,
            },
            {
              date: new Date(),
              address: "0xfwefhwoefhwo21DERT3q4t34t232",
              price: 50,
            },
          ],
        },
      ],
      reviews: [
        {
          feedbackId: 1001,
          userId: 501, // 用戶ID
          name: "Alice Smith",
          batchId: 101, // 對應的 batchId
          comment:
            "This course gave me a solid understanding of blockchain basics. The examples were really helpful.",
          rating: 5,
        },
        {
          feedbackId: 1002,
          userId: 502, // 用戶ID
          name: "Bob Johnson",
          batchId: 102, // 對應的 batchId
          comment:
            "I enjoyed the hands-on exercises and real-world case studies. Highly recommended!",
          rating: 5,
        },
      ],
    },
    {
      id: 2,
      courseName: "Advanced Smart Contracts",
      description:
        "Deep dive into smart contract development and applications.",
      rating: 4.9,
      batches: [
        {
          batchId: 201,
          startDate: "2024-12-05T09:00:00Z",
          endDate: "2025-01-05T18:00:00Z",
          participants: 20,
        },
        {
          batchId: 202,
          startDate: "2025-03-15T09:00:00Z",
          endDate: "2025-04-15T18:00:00Z",
          participants: 18,
        },
      ],
      reviews: [
        {
          feedbackId: 1003,
          userId: 503, // 用戶ID
          name: "Charlie Davis",
          batchId: 201, // 對應的 batchId
          comment:
            "The advanced topics were well-explained and easy to follow. The instructor was very engaging.",
        },
        {
          feedbackId: 1004,
          userId: 504, // 用戶ID
          name: "Dana Lee",
          batchId: 202, // 對應的 batchId
          comment:
            "This course made complex smart contract concepts very approachable. I feel much more confident now.",
        },
      ],
    },
    {
      id: 3,
      courseName: "Decentralized Finance (DeFi) Basics",
      description:
        "Learn the basics of decentralized finance and its applications.",
      rating: 4.8,
      batches: [
        {
          batchId: 301,
          startDate: "2024-11-20T09:00:00Z",
          endDate: "2024-12-20T18:00:00Z",
          participants: 22,
        },
        {
          batchId: 302,
          startDate: "2025-02-01T09:00:00Z",
          endDate: "2025-03-01T18:00:00Z",
          participants: 28,
        },
      ],
      reviews: [
        {
          feedbackId: 1005,
          userId: 505, // 用戶ID
          name: "Eve Martin",
          batchId: 301, // 對應的 batchId
          comment:
            "DeFi was a mystery to me, but this course made it much easier to understand. Great instructor!",
        },
        {
          feedbackId: 1006,
          userId: 506, // 用戶ID
          name: "Frank Wilson",
          batchId: 302, // 對應的 batchId
          comment:
            "Clear explanations and solid content. I now feel comfortable exploring DeFi on my own.",
        },
      ],
    },
  ],
};

// 生成範圍內的隨機整數，包括 min 和 max
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const userData: (typeof userItem)[] = new Array(5)
  .fill(userItem)
  .map((x, i) => ({
    ...x,
    id: i + 1,
    name: `${x.name} ${i + 1}`,
    // avatar: `/assets/avatar/${(i % 3) + 1}.svg`,
    avatar: `https://noun-api.com/beta/pfp?head=${getRandomInteger(1, 223)}&glasses=${getRandomInteger(1, 20)}&body=${getRandomInteger(1, 29)}&accessory=${getRandomInteger(1, 136)}`,
  }));
