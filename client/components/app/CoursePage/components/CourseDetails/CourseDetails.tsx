import { Course } from "@/app/mock-data";
import { Grid, Box, Heading } from "@chakra-ui/react";
import { ReviewSection } from "./components/ReviewSection";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
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

    const labels = selectedBatch.map((_, index) => `bid ${index + 1}`);
    // X 軸顯示每次投標
    const data = selectedBatch.map((e) => e.price);
    // Y 軸顯示每次投標的價格

    return {
      labels,
      datasets: [
        {
          label: "bid price",
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
      <ReviewSection course={course} />
    </Grid>
  );
};
