import Image from "next/image";
import banner from "@/assets/banner.png";
import { Box, Card, Container, Grid, Heading } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";

export default function Courses() {
  return (
    <Box>
      <Card.Root maxW="sm" overflow="hidden">
        <Image
          fill
          src="/assets/banner/1.webp"
          alt="Green double couch with wooden legs"
        />
        <Card.Body gap="2">
          <Card.Title>Living room Sofa</Card.Title>
          <Card.Description>
            This sofa is perfect for modern tropical spaces, baroque inspired
            spaces.
          </Card.Description>
          123
        </Card.Body>
        <Card.Footer gap="2">
          <Button variant="solid">Buy now</Button>
          <Button variant="ghost">Add to cart</Button>
        </Card.Footer>
      </Card.Root>
    </Box>
  );
}

const data = [
  {
    id: 1,
    title: "Complete Spanish Course: Master Spanish Beginner to...",
    info: "Economics: Analyzing Demand, Supply and Market Equilibrium with Real Life Case",
    user: {
      address: "0x445fRQHEfwefwe324hg34herhglerg",
      description: "擅長教學數學，耐心指導學生",
      avatar: "/assets/avatar/1.svg",
    },
    rating: 3.6,
    subject: "數學",
    minPrice: 320,
    maxPrice: 320,
    tags: ["代數", "微積分", "幾何"],
    image: "/assets/banner/1.webp",
    reviews: 999,
    bestseller: true,
  },
  {
    id: 1,
    title: "Complete Spanish Course: Master Spanish Beginner to...",
    info: "Economics: Analyzing Demand, Supply and Market Equilibrium with Real Life Case",
    user: {
      address: "0x445fRQHEfwefwe324hg34herhglerg",
      description: "擅長教學數學，耐心指導學生",
      avatar: "/assets/avatar/2.svg",
    },
    rating: 3.6,
    subject: "數學",
    minPrice: 320,
    maxPrice: 320,
    tags: ["代數", "微積分", "幾何"],
    image: "/assets/banner/2.webp",
    reviews: 999,
    bestseller: true,
  },
  {
    id: 1,
    title: "Complete Spanish Course: Master Spanish Beginner to...",
    info: "Economics: Analyzing Demand, Supply and Market Equilibrium with Real Life Case",
    user: {
      address: "0x445fRQHEfwefwe324hg34herhglerg",
      description: "擅長教學數學，耐心指導學生",
      avatar: "/assets/avatar/3.svg",
    },
    rating: 3.6,
    subject: "數學",
    minPrice: 320,
    maxPrice: 320,
    tags: ["代數", "微積分", "幾何"],
    image: "/assets/banner/3.webp",
    reviews: 999,
    bestseller: true,
  },
  {
    id: 1,
    title: "Complete Spanish Course: Master Spanish Beginner to...",
    info: "Economics: Analyzing Demand, Supply and Market Equilibrium with Real Life Case",
    user: {
      address: "0x445fRQHEfwefwe324hg34herhglerg",
      description: "擅長教學數學，耐心指導學生",
      avatar: "/assets/avatar/3.svg",
    },
    rating: 3.6,
    subject: "數學",
    minPrice: 320,
    maxPrice: 320,
    tags: ["代數", "微積分", "幾何"],
    image: "/assets/banner/3.webp",
    reviews: 999,
    bestseller: true,
  },
];
