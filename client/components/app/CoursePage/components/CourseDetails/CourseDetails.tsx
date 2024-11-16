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
  const { provider, contractService, loggedIn, courseBids } = useStore();
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

    return () => resizeObserver.disconnect();
  }, [chart, chartContainer]);

  useEffect(() => {
    async function getActionsBids() {
      return await contractService.getActionsBids(0, 1);
    }
    const generateLineChartData = async () => {
      const bids = (await getActionsBids()) || courseBids;
      console.log("Action Bids:", bids);

      setActionBids({
        labels: bids.map((e: Bids) => new Date(e.bidTime).toDateString()),
        datasets: [
          {
            label: "Bid Price",
            data: bids.map((e: Bids) => formatEther(e.amount)),
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
  }, [contractService, provider, loggedIn, courseBids]);

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
