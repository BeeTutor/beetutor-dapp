"use client";

import { CourseGrid } from "@/components/app/CourseGrid";
import { InputGroup } from "@/components/ui/input-group";
import { Box, Input } from "@chakra-ui/react";
import { useState } from "react";
import { LuSearch } from "react-icons/lu";
import { courseData } from "../mock-data";

export default function Course() {
  const [filterValue, setFilterValue] = useState("");

  return (
    <Box>
      <InputGroup
        mt="0.75rem"
        mb="2rem"
        maxW="30rem"
        mx="auto"
        display="block"
        startElement={<LuSearch />}
      >
        <Input
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          placeholder="Search for courses or tutors"
        />
      </InputGroup>
      <CourseGrid
        courses={courseData.filter((x) => x.name.includes(filterValue))}
      />
    </Box>
  );
}
