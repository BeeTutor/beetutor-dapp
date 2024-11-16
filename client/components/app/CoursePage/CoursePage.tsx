"use client";

import { Course } from "@/app/mock-data";
import { Grid, Box } from "@chakra-ui/react";

import { CourseHeader } from "./components/CourseHeader";
import { CourseDetails } from "./components/CourseDetails/CourseDetails";
import { CourseBidding } from "./components/CourseBidding/CourseBidding";

interface Props {
  course: Course;
}

export const CoursePage: React.FC<Props> = ({ course }) => {
  return (
    <Box>
      <CourseHeader course={course} />
      <Grid
        templateColumns={{ lg: "1fr 18rem" }}
        alignItems="flex-start"
        gap="2rem"
        mt="2rem"
      >
        <CourseDetails course={course} />
        <CourseBidding course={course} position="sticky" top={0} />
      </Grid>
    </Box>
  );
};
