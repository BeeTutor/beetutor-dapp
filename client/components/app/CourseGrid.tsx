import { Course } from "@/app/mock-data";
import { Box, Card, Flex, Grid } from "@chakra-ui/react";
import Image from "next/image";
import { Rating } from "../ui/rating";

interface Props {
  courses: Course[];
}

export const CourseGrid: React.FC<Props> = ({ courses }) => {
  return (
    <Grid templateColumns="repeat(auto-fit, minmax(18rem, 1fr))" gap="6">
      {courses.map((x, i) => (
        <Card.Root key={i} overflow="hidden" bg="gray.50">
          <Box aspectRatio="16/9" position="relative">
            <Image fill objectFit="cover" src={x.image} alt={x.title} />
          </Box>
          <Card.Body py="1rem">
            <Card.Title fontWeight="bold" fontSize="md">
              {x.title}
            </Card.Title>
            <Box>
              <Flex mt="3" alignItems="center" gap="1">
                {x.rating}
                <Rating
                  readOnly
                  colorPalette="yellow"
                  allowHalf
                  size="sm"
                  value={x.rating}
                />
                <Box fontSize="xs">({x.reviews})</Box>
              </Flex>
              <Box>NT${x.price}</Box>
            </Box>
          </Card.Body>
        </Card.Root>
      ))}
    </Grid>
  );
};
