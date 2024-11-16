"use client";

import { Course } from "@/app/mock-data";
import { Grid, Box, Heading } from "@chakra-ui/react";
import { ReviewSection } from "./components/ReviewSection";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useStore } from "@/store";
import { useEffect, useState } from "react";
import { formatEther } from "ethers";

interface Props {
  course: Course;
}

export const CourseDetails: React.FC<Props> = ({ course }) => {
  const { provider, contractService, loggedIn } = useStore();
  const [actionBids, setActionBids] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    async function getActionsBids() {
      return await contractService.getActionsBids(1, 1);
      // await contractService.getCourseCertificateAddress();
    }
    const generateLineChartData = async () => {
      const selectedBatch = await getActionsBids();

      const labels = selectedBatch.map((e, index) =>
        new Date(e.time).toISOString()
      );
      // X 軸顯示每次投標
      const data = selectedBatch.map((e) => formatEther(e.price));
      // Y 軸顯示每次投標的價格

      setActionBids({
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
      });
    };

    if (contractService) {
      generateLineChartData();
    }
  }, [contractService, provider, loggedIn]);

  return (
    <Grid gap="1rem">
      <Box bg="blue.50" borderRadius="0.5rem" p="2rem">
        <Heading fontSize="xl" mb="1rem">
          Session Bids Info
        </Heading>
        <Line data={actionBids} height={80} />
      </Box>
      <ReviewSection course={course} />
    </Grid>
  );
};
