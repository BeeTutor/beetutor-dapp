import { Course } from "@/app/mock-data";
import { Box, Grid, Heading } from "@chakra-ui/react";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import { ReviewSection } from "./components/ReviewSection";

interface Props {
  course: Course;
}

export const CourseDetails: React.FC<Props> = ({ course }) => {
  const generateLineChartData = () => {
    const selectedBatch = [
      {
        date: new Date(),
        address: "0xfwefhwoefhwo21DERT3q4t34t232",
        price: 30,
      },
      {
        date: new Date(),
        address: "0xfwefhwoefhwo21DERT3q4t34t232",
        price: 100,
      },
      {
        date: new Date(),
        address: "0xfwefhwoefhwo21DERT3q4t34t232",
        price: 50,
      },
      {
        date: new Date(),
        address: "0xfwefhwoefhwo21DERT3q4t34t232",
        price: 30,
      },
      {
        date: new Date(),
        address: "0xfwefhwoefhwo21DERT3q4t34t232",
        price: 100,
      },
    ];

    const labels = selectedBatch.map((_, index) => `投標 ${index + 1}`);
    // X 軸顯示每次投標
    const data = selectedBatch.map((e) => e.price);
    // Y 軸顯示每次投標的價格

    return {
      labels,
      datasets: [
        {
          label: "投標價格",
          data,
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1, // 曲線的平滑度
        },
      ],
    };
  };

  return (
    <Grid gap="1rem">
      <Box bg="blue.50" borderRadius="0.5rem" p="2rem">
        <Heading fontSize="xl" mb="1rem">
          Session Bids Info
        </Heading>
        <Line data={generateLineChartData()} height={80} />
      </Box>
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
};
