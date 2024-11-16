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
    name: "LazyAbby",
    address: "0x445fRQHEfwefwe324hg34herhglerg",
    about:
      "🙋🏻‍♀️ | 設計菜鳥幫手 ·懶惰的完美主義者 · 貓派 · 奶茶控| 💭Canva很好用,但到底多好用? 👉🏻跟著Abby用Canva 沒有設計背景也能輕鬆製美圖🌝 📩",
    avatar: "/assets/avatar/1.svg",
    rating: 3,
    tags: ["設計", "微積分", "幾何", "瑜珈"],
    attended: 2,
    offered: 4,
    courses: [
      {
        id: 11,
        name: "用免費軟體 Canva 打造你的品牌識別！",
        image: "/assets/courses/1.avif",
        description: `｜4小時Canva設計課｜

                    👉🏻 用免費軟體 Canva 打造品牌識別，搞定社群貼文！

                    ✦ 過往課程學員評價 ✦

                    追蹤Abby Instagram不錯過更多教學貼文！

                    👉🏻 https://www.instagram.com/lazyabby.tw/`,
        rating: 2.7,
        price: 100,
      },
      {
        id: 12,
        name: "用免費軟體 Canva 搞定你的社群貼文！",
        image: "/assets/courses/2.avif",
        description: `Canva 是一款免費且電腦網頁和手機App 可同步使用的線上工具，並且可以套用多種模版迅速做出設計成品，快來跟著 Abby 學習如何使用 Canva 吧！`,
        rating: 3.8,
        price: 200,
      },
      {
        id: 13,
        name: "用 Canva 高效製作質感簡報！",
        image: "/assets/courses/4.avif",
        description: `✨ Canva 內建範本的客製化教學 ✨

                    ✦ 配色概念與使用

                    ✦ 字型應用與字體效果

                    ✦ Canva 素材庫使用技巧

                    ✦ 圖片處理與美化

                    ✦ 履歷及簡報版面配置

                    ✦ 簡報動畫應用

                    ✦ 簡報圖表製作

                    ✦ Canva 簡報互動功能`,
        rating: 4.2,
        price: 300,
      },
      {
        id: 14,
        name: "用免費軟體 Canva 打造你的品牌識別！",
        image: "/assets/courses/1.avif",
        description: `｜4小時Canva設計課｜

                    👉🏻 用免費軟體 Canva 打造品牌識別，搞定社群貼文！

                    ✦ 過往課程學員評價 ✦

                    追蹤Abby Instagram不錯過更多教學貼文！

                    👉🏻 https://www.instagram.com/lazyabby.tw/`,
        rating: 3.7,
        price: 400,
      },
      {
        id: 15,
        name: "用免費軟體 Canva 搞定你的社群貼文！",
        image: "/assets/courses/2.avif",
        description: `Canva 是一款免費且電腦網頁和手機App 可同步使用的線上工具，並且可以套用多種模版迅速做出設計成品，快來跟著 Abby 學習如何使用 Canva 吧！`,
        rating: 3.8,
        price: 500,
      },
      {
        id: 16,
        name: "用 Canva 高效製作質感簡報！",
        image: "/assets/courses/4.avif",
        description: `✨ Canva 內建範本的客製化教學 ✨

                    ✦ 配色概念與使用

                    ✦ 字型應用與字體效果

                    ✦ Canva 素材庫使用技巧

                    ✦ 圖片處理與美化

                    ✦ 履歷及簡報版面配置

                    ✦ 簡報動畫應用

                    ✦ 簡報圖表製作

                    ✦ Canva 簡報互動功能`,
        rating: 4.9,
        price: 600,
      },
    ],
  },
  {
    id: 2,
    name: "插畫觀測室",
    address: "0x446fRQHEfwefwe324hg34herhglerg",
    about:
      "是一個介紹插畫大小事的影片頻道，由兩位插畫家Barry 與Feeling 所組成。",
    avatar: "/assets/avatar/2.svg",
    rating: 4,
    tags: ["插畫", "代數", "微積分", "幾何", "瑜珈"],
    attended: 3,
    offered: 5,
    courses: [
      {
        id: 17,
        name: "插畫家生存之道：六大收入來源大公開，6 種插畫收益法不藏私大解析！",
        image: "/assets/courses/3.avif",
        description: `能夠永續創作是每位插畫家的夢想，但如何靠創作維生是一個非常現實的難題！或許你正在躍欲試，思考著該不該靠插畫維生？又或許你已經營創作一陣子，卻遲遲找不到方向？插畫觀測室整理出六大面向，六種插畫收入來源，並且各自分析該如何入門，以及分享各自的經驗與心法，期待能夠讓你找到自己的目標，陪伴你插畫路上走得堅定不迷惘！`,
        rating: 1.7,
        price: 700,
      },
      {
        id: 18,
        name: "開始接案的第一步，插畫觀測室 Ｘ 曲奇放克 帶你認識業界眉眉角角！",
        image: "/assets/courses/5.avif",
        description: `插畫觀測室這次將 feat.同為插畫 Youtuber，也同為 Hahow 老師的「曲奇放克」！ 一起和學員分享該如何開始接案，以及接案時會遇到的和業主溝通、進行報價、簽合約..等等的眉眉角角，最後會抽籤進行業主出題小遊戲，專業度與娛樂兼具的直播，不要錯過啦！`,
        rating: 4.8,
        price: 800,
      },
    ],
  },
];

export const tutors: Tutor[] = baseTutors.map((tutor) => ({
  ...tutor,
  courses: tutor.courses.map((x) => ({ ...x, tutor })) as Course[],
}));

export type Course = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  rating: number;
  tutor: Tutor;
};
export const courseData: Course[] = tutors.flatMap((tutor) => tutor.courses);
