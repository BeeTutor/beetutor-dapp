import { Course } from "@/app/mock-data";
import { Button } from "@/components/ui/button";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { InputGroup } from "@/components/ui/input-group";
import {
  Box,
  createListCollection,
  Grid,
  GridProps,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import Link from "next/link";
import { ReviewDialog } from "./components/ReviewDialog";

interface Props extends GridProps {
  course: Course;
}

export const CourseBidding: React.FC<Props> = ({ course, ...gridProps }) => {
  console.log("course: ", course);
  const [value, setValue] = useState("");

  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);

  const [session, setSession] = useState("");
  const sessionStatus = SESSION_STATUS[session];

  return (
    <Grid bg="yellow.100" p="2rem" gap="1rem" {...gridProps}>
      <SelectRoot
        variant="outline"
        collection={SESSIONS}
        size="sm"
        multiple={false}
        value={[session]}
        onValueChange={(e) => setSession(e.value[0])}
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
            Leave a message
          </Button>
          <ReviewDialog
            open={isReviewDialogOpen}
            onOpenChange={(e) => setIsReviewDialogOpen(e.open)}
          />
        </>
      ) : (
        <>
          Lorem ipsum is placeholder text commonly used in the graphic, print,
          and publishing industries for previewing layouts and visual mockups.
          <InputGroup startElement="$">
            <Input
              disabled={sessionStatus !== "open"}
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </InputGroup>
          <Button disabled={sessionStatus !== "open"}>Bid now</Button>
        </>
      )}
    </Grid>
  );
};

const SESSIONS = createListCollection({
  items: [
    { id: 1, time: "2024/11/4 10:00 pm" },
    { id: 3, time: "2024/11/14 1:00 pm" },
    { id: 6, time: "2024/11/20 7:00 am" },
  ] as const,
  itemToValue: (item) => String(item.id),
});

type BiddingStatus = "ended" | "open" | "won";

const SESSION_STATUS: Record<string, BiddingStatus | undefined> = {
  1: "ended",
  3: "open",
  6: "won",
} satisfies {
  [key in (typeof SESSIONS)["items"][number]["id"]]: BiddingStatus;
};
