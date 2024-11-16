"use client";

import { courseData } from "@/app/mock-data";
import { CoursePage } from "@/components/app/CoursePage/CoursePage";

interface Props {
  params: { id: string };
}
export default function CourseRealPage({ params: { id } }: Props) {
  const nowCourse = courseData.find((x) => x.id === Number(id));
  return (
    <>
      <CoursePage course={nowCourse} />
    </>
  );
}
