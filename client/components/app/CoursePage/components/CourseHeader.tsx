import Image from "next/image";
import { Course } from "@/app/mock-data";
import { Grid, Flex, Box, Heading } from "@chakra-ui/react";
import { LuBookmark, LuGift } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Stars } from "@/components/custom/Stars";

interface Props {
  course: Course;
}

export const CourseHeader: React.FC<Props> = ({ course }) => (
  <Box>
    <Grid templateColumns={{ lg: "repeat(2, 1fr)" }} gap="2rem">
      <Box
        aspectRatio="16/9"
        position="relative"
        borderRadius="1rem"
        overflow="hidden"
      >
        <Image fill objectFit="cover" src={course.image} alt={course.name} />
      </Box>
      <Flex direction="column" gap="1rem">
        <Box>{course.tutor.name}</Box>
        <Heading fontSize="3xl">{course.name}</Heading>
        <Box color="gray.500">{course.description}</Box>
        <Box flex="1" />
        <Box>This course is rated in the top 10%</Box>
        <Flex gapX="2" gapY="1rem" alignItems="center" flexWrap="wrap">
          <Box fontSize="2xl" fontWeight="bold">
            {course.rating}
          </Box>
          <Flex alignItems="center">
            <Stars count={course.rating} />
            <Box color="gray.500" fontSize="xs" mt="2px" ml="1">
              (197)
            </Box>
          </Flex>
          <Box flex="1" />
          <Flex gap="2" alignItems="center" flexWrap="wrap">
            <Button variant="outline" flexGrow="1">
              <LuBookmark />
              Bookmark course
            </Button>
            <Button variant="outline" flexGrow="1">
              <LuGift />
              Send a gift
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Grid>
  </Box>
);
