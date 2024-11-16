"use client";

import { Course } from "@/app/mock-data";
import { Bids } from "@/services/contractService";
import { useStore } from "@/store";
import { Box, Grid, Heading } from "@chakra-ui/react";
import "chart.js/auto";
import Chart from "chart.js/auto";
import { formatEther } from "ethers";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { ReviewSection } from "./components/ReviewSection";

interface Props {
  course: Course;
}

export const CourseDetails: React.FC<Props> = ({ course }) => {
  const { provider, contractService, loggedIn } = useStore();
  const [actionBids, setActionBids] = useState({
    labels: [],
    datasets: [],
  });

  const [chart, setChart] = useState<Chart | null>();
  const [chartContainer, setChartContainer] = useState<HTMLDivElement | null>(
    null
  );

  useEffect(() => {
    if (!chart || !chartContainer) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      chart.resize(width, width / chartAspectRatio);
    });

    resizeObserver.observe(chartContainer);

    return resizeObserver.disconnect;
  }, [chart, chartContainer]);

  useEffect(() => {
    async function getActionsBids() {
      return await contractService.getActionsBids(1, 1);
      // await contractService.getCourseCertificateAddress();
    }
    const generateLineChartData = async () => {
      const selectedBatch = await getActionsBids();

      const labels = selectedBatch.map(
        (e: Bids, index: number) =>
          "Bid" + index + new Date(e.bidTime).toISOString()
      );

      const data = selectedBatch.map((e: Bids) => formatEther(e.price));

      setActionBids({
        labels,
        datasets: [
          {
            label: "投標價格",
            data,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1, // 曲線的平滑度
          } as never,
        ],
      });
    };

    if (contractService) {
      generateLineChartData();
    }
  }, [contractService, provider, loggedIn]);

  return (
    <Grid gap="1rem">
      <Box ref={setChartContainer} bg="blue.50" borderRadius="0.5rem" p="2rem">
        <Heading fontSize="xl" mb="1rem">
          Session Bids Info
        </Heading>
        <Box
          position="relative"
          w="full"
          aspectRatio={`${chartAspectRatio} / 1`}
        >
          <Box position="absolute" inset="0">
            <Line
              ref={setChart}
              data={actionBids}
              options={{ responsive: false, aspectRatio: chartAspectRatio }}
            />
          </Box>
        </Box>
      </Box>
      <ReviewSection course={course} />
    </Grid>
  );
};

const chartAspectRatio = 3;
