import { Course } from "@/app/mock-data";
import { Stars } from "@/components/custom/Stars";
import { Grid, Box, Heading, Flex } from "@chakra-ui/react";
import { ReviewSection } from "./components/ReviewSection";

interface Props {
  course: Course;
}

export const CourseDetails: React.FC<Props> = ({ course }) => (
  <Grid gap="1rem">
    <Box bg="blue.50" borderRadius="0.5rem" p="2rem">
      <Heading fontSize="xl" mb="1rem">
        Course Info
      </Heading>
      Lorem ipsum is placeholder text commonly used in the graphic, print, and
      publishing industries for previewing layouts and visual mockups. Lorem
      ipsum is placeholder text commonly used in the graphic, print, and
      publishing industries for previewing layouts and visual mockups.
    </Box>
    <Box
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="0.5rem"
      p="2rem"
    >
      <Heading fontSize="xl" mb="1rem">
        Course Content
      </Heading>
      Lorem ipsum is placeholder text commonly used in the graphic, print, and
      publishing industries for previewing layouts and visual mockups. Lorem
      ipsum is placeholder text commonly used in the graphic, print, and
      publishing industries for previewing layouts and visual mockups. Lorem
      ipsum is placeholder text commonly used in the graphic, print, and
      publishing industries for previewing layouts and visual mockups. Lorem
      ipsum is placeholder text commonly used in the graphic, print, and
      publishing industries for previewing layouts and visual mockups. Lorem
      ipsum is placeholder text commonly used in the graphic, print, and
      publishing industries for previewing layouts and visual mockups. Lorem
      ipsum is placeholder text commonly used in the graphic, print, and
      publishing industries for previewing layouts and visual mockups. Lorem
      ipsum is placeholder text commonly used in the graphic, print, and
      publishing industries for previewing layouts and visual mockups. Lorem
      ipsum is placeholder text commonly used in the graphic, print, and
      publishing industries for previewing layouts and visual mockups. Lorem
      ipsum is placeholder text commonly used in the graphic, print, and
      publishing industries for previewing layouts and visual mockups. Lorem
      ipsum is placeholder text commonly used in the graphic, print, and
      publishing industries for previewing layouts and visual mockups. Lorem
      ipsum is placeholder text commonly used in the graphic, print, and
      publishing industries for previewing layouts and visual mockups. Lorem
      ipsum is placeholder text commonly used in the graphic, print, and
      publishing industries for previewing layouts and visual mockups. Lorem
      ipsum is placeholder text commonly used in the graphic, print, and
      publishing industries for previewing layouts and visual mockups. Lorem
      ipsum is placeholder text commonly used in the graphic, print, and
      publishing industries for previewing layouts and visual mockups. Lorem
      ipsum is placeholder text commonly used in the graphic, print, and
      publishing industries for previewing layouts and visual mockups. Lorem
      ipsum is placeholder text commonly used in the graphic, print, and
      publishing industries for previewing layouts and visual mockups. Lorem
      ipsum is placeholder text commonly used in the graphic, print, and
      publishing industries for previewing layouts and visual mockups. Lorem
      ipsum is placeholder text commonly used in the graphic, print, and
      publishing industries for previewing layouts and visual mockups.
    </Box>
    <ReviewSection course={course} />
  </Grid>
);
