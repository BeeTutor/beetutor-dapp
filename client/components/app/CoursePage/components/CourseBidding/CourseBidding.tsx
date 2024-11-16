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
import { useEffect, useState } from "react";
import { ReviewDialog } from "./components/ReviewDialog";

interface Props extends GridProps {
  course: Course;
}

const SESSIONS = createListCollection({
  items: [
    { id: 0, time: "2024/11/4 10:00 pm" },
    { id: 1, time: "2024/11/14 1:00 pm" },
    { id: 2, time: "2024/11/20 7:00 am" },
  ] as const,
  itemToValue: (item) => String(item.id),
});

export const CourseBidding: React.FC<Props> = ({ ...gridProps }) => {
  const {
    contractService,
    setCourseBids,
    courseBids,
    courseId,
    batchId,
    setBatchId,
    sessionStatus,
  } = useStore();

  const [bidValue, setBidValue] = useState("");
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);

  const [nowSessionStatus, setNowSessionStatus] = useState(
    sessionStatus[batchId]
  );

  useEffect(() => {
    setNowSessionStatus(sessionStatus[batchId]);
  }, [sessionStatus]);

  return (
    <Grid bg="yellow.100" p="2rem" gap="1rem" {...gridProps}>
      <SelectRoot
        variant="outline"
        collection={SESSIONS}
        size="sm"
        multiple={false}
        onValueChange={(e) => setBatchId(e.value[0])}
        value={[batchId]}
        defaultValue={[batchId]}
      >
        <SelectLabel>Session</SelectLabel>
        <SelectTrigger>
          <SelectValueText placeholder="Session 0">
            {([item]: (typeof SESSIONS)["items"]) => {
              return `Session ${item?.id}`;
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
      {sessionStatus[batchId] === "ended" ? (
        "Bidding has ended"
      ) : sessionStatus[batchId] === "won" ? (
        <>
          <Button disabled={gridProps.course.chatId === undefined} asChild>
            <Link href={`/chat/groups/${gridProps.course.chatId}`}>
              Start chatting
            </Link>
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
              // disabled={nowSessionStatus !== "open"}
              type="number"
              value={bidValue}
              onChange={(e) => setBidValue(e.target.value)}
            />
          </InputGroup>
          <Button
            disabled={nowSessionStatus !== "open"}
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
