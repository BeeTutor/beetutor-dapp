"use client";

import Image from "next/image";
import { Course } from "@/app/mock-data";
import { Grid, Card, Flex, Box, Badge } from "@chakra-ui/react";
import { LuClock, LuUsers } from "react-icons/lu";
import { Star } from "../custom/Star";
import Link from "next/link";

interface Props {
  courses: Course[];
}

export const CourseGrid: React.FC<Props> = ({ courses }) => {
  return (
    <>
      <Grid templateColumns="repeat(auto-fill, minmax(18rem, 1fr))" gap="6">
        {courses.map((x, i) => (
          <Link key={i} href={`/courses/${x.id}`}>
            <Card.Root key={i} bg="gray.50" overflow="hidden" cursor="pointer">
              <Box aspectRatio="16/9" position="relative">
                <Image fill objectFit="cover" src={x.image} alt={x.name} />
                <Box
                  position="absolute"
                  inset="auto 1rem -2rem auto"
                  bg="white"
                  borderRadius="50%"
                  aspectRatio="1/1"
                  w="4rem"
                  overflow="hidden"
                >
                  <Image
                    fill
                    objectFit="cover"
                    src={x.tutor.avatar}
                    alt={x.tutor.name}
                  />
                </Box>
              </Box>
              <Card.Body p="1rem">
                <Flex pr="4rem" flexWrap="wrap" gap={1}>
                  {["Blockchain", "Crypto", "TechMentor"].map((x, i) => (
                    <Badge key={i} colorPalette="green" px="3" py="1">
                      #{x}
                    </Badge>
                  ))}
                </Flex>
                <Card.Title fontWeight="bold" fontSize="md" mt="2">
                  {x.name}
                </Card.Title>
                <Box fontSize="sm" color="gray.500">
                  by {x.tutor.name}
                </Box>
                <Box flex="1" />
                <Flex
                  mt="4"
                  alignItems="center"
                  justifyContent="center"
                  gap="3"
                  fontSize="xs"
                  css={{ "--text-color": "colors.gray.500" }}
                  color="var(--text-color)"
                >
                  <Flex alignItems="center" gap={1} color="yellow.500">
                    <Star />
                    {x.rating}
                    <Box color="var(--text-color)">(6)</Box>
                  </Flex>
                  <Flex gap="1" alignItems="center">
                    <LuClock size={12} color="var(--text-color)" />
                    {x.duration} hours
                  </Flex>
                  <Flex gap="1" alignItems="center">
                    <LuUsers size={12} />
                    {x.participantCount}
                  </Flex>
                </Flex>
              </Card.Body>
            </Card.Root>
          </Link>
        ))}
      </Grid>
    </>
  );
};
