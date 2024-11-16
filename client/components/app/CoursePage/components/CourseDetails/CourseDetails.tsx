"use client";

import { Course } from "@/app/mock-data";
import { Bids } from "@/services/contractService";
import { useStore } from "@/store";
import { Box, Center, Grid, Heading } from "@chakra-ui/react";
import "chart.js/auto";
import Chart from "chart.js/auto";
import { formatEther } from "ethers";
import moment from "moment";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { ReviewSection } from "./components/ReviewSection";

interface Props {
  course: Course;
}

export const CourseDetails: React.FC<Props> = ({ course }) => {
  const {
    provider,
    contractService,
    loggedIn,
    courseBids,
    courseId,
    batchId,
    sessionStatus,
  } = useStore();
  const [actionBids, setActionBids] = useState({
    labels: [],
    datasets: [],
  });

  const [chart, setChart] = useState<Chart | null>();
  const [chartContainer, setChartContainer] = useState<HTMLDivElement | null>(
    null
  );

  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!chart || !chartContainer) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      chart.resize(width, width / chartAspectRatio);
    });

    resizeObserver.observe(chartContainer);

    return () => resizeObserver.disconnect();
  }, [chart, chartContainer, sessionStatus]);

  useEffect(() => {
    async function getActionsBids() {
      return await contractService.getActionsBids(courseId, batchId);
    }

    const generateLineChartData = async () => {
      let bids = await getActionsBids();

      if (!bids) {
        bids = courseBids;
      }
      bids = bids.sort((a: Bids, b: Bids) => a.bidTime - b.bidTime);

      console.log("Action Bids:", bids);

      setActionBids({
        labels: bids.map((e: Bids) =>
          String(
            moment(
              new Date(Number(e.bidTime) * 1000),
              "DD MM YYYY hh:mm:ss"
            ).format()
          )
            .replace(/([+-]\d{2}:\d{2})$/, "")
            .replace("T", " ")
        ),
        datasets: [
          {
            label: "Bid Price",
            data: bids.map((e: Bids) => formatEther(e.amount)),
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          } as never,
        ],
      });
    };

    if (contractService && loggedIn) {
      generateLineChartData();
    }
  }, [contractService, provider, loggedIn, courseBids, batchId, courseId]);

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
          {loggedIn && courseBids ? (
            <Box position="absolute" inset="0">
              <Line
                ref={setChart}
                data={actionBids}
                options={{ responsive: false, aspectRatio: chartAspectRatio }}
              />
            </Box>
          ) : (
            <Center h="full">
              Please log in to view course details and bids.
            </Center>
          )}
        </Box>
      </Box>
      <ReviewSection course={course} />
    </Grid>
  );
};

const chartAspectRatio = 3;
