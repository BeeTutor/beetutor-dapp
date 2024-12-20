import { Button } from "@/components/ui/button";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog";
import { Rating } from "@/components/ui/rating";
import { toaster, Toaster } from "@/components/ui/toaster";
import { useStore } from "@/store";
import { DialogRootProps, Textarea } from "@chakra-ui/react";
import { useState } from "react";

export const ReviewDialog: React.FC<Omit<DialogRootProps, "children">> = (
  props
) => {
  const { userAddress, courseReviews, setCourseReviews } = useStore();
  const [isSaving, setIsSaving] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [rateValue, setRateValue] = useState(0);

  return (
    <DialogRoot {...props}>
      <DialogContent bg="gray.50">
        <DialogHeader>
          <DialogTitle>Write a review</DialogTitle>
        </DialogHeader>
        <DialogBody pb="1rem">
          <Rating
            gap="0.5rem"
            label="How would you rate the course?"
            colorPalette="yellow"
            value={rateValue}
            onChange={(e) =>
              setRateValue(Number((e.target as HTMLInputElement).value))
            }
          />
          <Textarea
            mt="0.75rem"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
          />
        </DialogBody>
        v
        <DialogFooter>
          <Button
            variant="outline"
            onClick={async () => {
              await new Promise((res) => setTimeout(res, 0));
              props.onOpenChange?.({ open: false });
            }}
          >
            Cancel
          </Button>
          <Button
            loading={isSaving}
            onClick={async () => {
              setIsSaving(true);
              try {
                const newReview = {
                  id: 7,
                  name: "New bee",
                  comment: textValue,
                  rating: rateValue,
                  date: new Date().toDateString(),
                  from: userAddress,
                  to: "0xMyCourse",
                  avatar: `https://noun-api.com/beta/pfp?head=${1}&glasses=${1}&background=${2}&body=${2}&accessory=${1}`,
                };
                setCourseReviews([newReview, ...courseReviews]);
                if (typeof userAddress === "string") {
                  const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/comment`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(newReview),
                    }
                  );
                  if (!res.ok) {
                    const body = await res.json();
                    console.error("Leave review error res body:", body);
                  }
                }
              } catch (error) {
                if (error instanceof Error) {
                  console.error("Leave review error", error);
                  // toaster.error({
                  //   title: "Contract not initialized",
                  //   description: error.message || "Unknown Error",
                  // });
                }
              }
              toaster.success({
                title: "Successfully leaved reviews",
              });

              setIsSaving(false);
              props.onOpenChange?.({ open: false });
            }}
          >
            Save
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
      <Toaster />
    </DialogRoot>
  );
};
