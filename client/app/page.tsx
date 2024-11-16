/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import banner from "@/assets/banner.png";
import { Box, Container, Grid, Heading } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <Container maxW={{ base: "2xl", lg: "6xl" }} py="6rem" px="3rem">
      <Grid
        gapX="8"
        gapY="4rem"
        alignItems="center"
        templateColumns={{ lg: "1.2fr 1fr" }}
      >
        <Box>
          <Heading fontWeight="bold" fontSize="5xl" lineHeight="4rem">
            Unique wise buffet
          </Heading>
          <Box fontSize="lg" mt="2.5rem">
            Imagine being able to bid for a moment of someone's time, just like
            the exclusive opportunity to lunch with Warren Buffett. At
            BeeTutor🐝, we bring this concept to life on a broader scale. Our
            platform lets you bid on time with experts, thought leaders, or
            mentors, offering you a unique chance to gain insights and knowledge
            you won't find anywhere else. Just like bidding for a seat at
            Buffett's table, you can secure exclusive time with individuals who
            can truly make a difference in your journey. And you can be the
            Buffett too!🌻
          </Box>
          <Button mt="6" size="xl">
            Explore
          </Button>
        </Box>

        <Image src={banner} alt="Logo" />
      </Grid>
    </Container>
  );
}
