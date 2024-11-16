import { Course } from "@/app/mock-data";
import { Button } from "@/components/ui/button";
import { InputGroup } from "@/components/ui/input-group";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { toaster } from "@/components/ui/toaster";
import { useStore } from "@/store";
import {
  Box,
  createListCollection,
  Grid,
  GridProps,
  Input,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import Link from "next/link";
import { useState } from "react";
import { ReviewDialog } from "./components/ReviewDialog";

interface Props extends GridProps {
  course: Course;
}

export const CourseBidding: React.FC<Props> = ({ course, ...gridProps }) => {
  const {
    contractService,
    setCourseBids,
    courseBids,
    courseId,
    batchId,
    setBatchId,
  } = useStore();
  console.log(course);
  const [bidValue, setBidValue] = useState("");

  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);

  const sessionStatus = SESSION_STATUS[batchId];

  return (
    <Grid bg="yellow.100" p="2rem" gap="1rem" {...gridProps}>
      <SelectRoot
        variant="outline"
        collection={SESSIONS}
        size="sm"
        multiple={false}
        value={[batchId]}
        onValueChange={(e) => setBatchId(e.value[0])}
      >
        <SelectLabel>Session</SelectLabel>
        <SelectTrigger>
          <SelectValueText placeholder="Select session">
            {([item]: (typeof SESSIONS)["items"]) => {
              return `Session ${item.id}`;
            }}
          </SelectValueText>
        </SelectTrigger>
        <SelectContent portalled={false}>
          {SESSIONS.items.map((session) => (
            <SelectItem item={session} key={session.id}>
              <Box>
                Session {session.id}
                <Box fontSize="xs" color="gray.500">
                  {session.time}
                </Box>
              </Box>
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
      {sessionStatus === "ended" ? (
        "Bidding has ended"
      ) : sessionStatus === "won" ? (
        <>
          <Button asChild>
            <Link href="/chat">Start chatting</Link>
          </Button>
          <Button variant="outline" onClick={() => setIsReviewDialogOpen(true)}>
            Review the course
          </Button>
          <ReviewDialog
            open={isReviewDialogOpen}
            onOpenChange={(e) => setIsReviewDialogOpen(e.open)}
          />
        </>
      ) : (
        <>
          Place your bid.
          <InputGroup startElement="$">
            <Input
              disabled={sessionStatus !== "open"}
              type="number"
              value={bidValue}
              onChange={(e) => setBidValue(e.target.value)}
            />
          </InputGroup>
          <Button
            disabled={sessionStatus !== "open"}
            onClick={async () => {
              const amountInWei = ethers.parseUnits(bidValue, "ether");
              console.log("Place Bid:", amountInWei);
              if (contractService) {
                try {
                  await contractService.placeBid(
                    courseId,
                    batchId,
                    amountInWei
                  );
                } catch (error) {
                  if (error instanceof Error) {
                    console.error("Failed to place bid:", error);
                    toaster.error({
                      title: "Failed to place bid",
                      description: error.message,
                    });
                  }
                }
              }
              setCourseBids([
                {
                  bidder: "0x123456789abcdef",
                  amount: amountInWei,
                  bidTime: new Date().getTime(),
                },
                ...courseBids,
              ]);
            }}
          >
            Bid now
          </Button>
        </>
      )}
    </Grid>
  );
};

const SESSIONS = createListCollection({
  items: [
    { id: 0, time: "2024/11/4 10:00 pm" },
    { id: 1, time: "2024/11/14 1:00 pm" },
    { id: 2, time: "2024/11/20 7:00 am" },
  ] as const,
  itemToValue: (item) => String(item.id),
});

type BiddingStatus = "ended" | "open" | "won";

const SESSION_STATUS: Record<string, BiddingStatus | undefined> = {
  0: "ended",
  1: "open",
  2: "won",
} satisfies {
  [key in (typeof SESSIONS)["items"][number]["id"]]: BiddingStatus;
};
