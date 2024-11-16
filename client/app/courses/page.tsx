import { CourseGrid } from "@/components/app/CourseGrid";
import { InputGroup } from "@/components/ui/input-group";
import { Box, Input } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { courseData } from "../mock-data";

export default function Course() {
  return (
    <Box>
      <InputGroup
        mt="0.75rem"
        mb="2rem"
        w="30rem"
        mx="auto"
        display="block"
        startElement={<LuSearch />}
      >
        <Input placeholder="Username" />
      </InputGroup>
      <CourseGrid courses={courseData} />
    </Box>
  );
}
