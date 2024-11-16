"use client";

import { Course, courseData } from "@/app/mock-data";
import { CoursePage } from "@/components/app/CoursePage/CoursePage";

interface Props {
  params: { id: string };
}
export default function CourseRealPage({ params: { id } }: Props) {
  const nowCourse = courseData.find((x) => x.id === Number(id)) as Course;
  return (
    <>
      <CoursePage course={nowCourse} />
    </>
  );
}
