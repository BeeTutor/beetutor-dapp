import { Button } from "@/components/ui/button";
import {
  DialogRoot,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Rating } from "@/components/ui/rating";
import { DialogRootProps, Textarea } from "@chakra-ui/react";
import { useState } from "react";

export const ReviewDialog: React.FC<Omit<DialogRootProps, "children">> = (
  props
) => {
  const [isSaving, setIsSaving] = useState(false);

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
          />
          <Textarea mt="0.75rem" />
        </DialogBody>
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
              await new Promise((res) => setTimeout(res, 500));
              setIsSaving(false);
              props.onOpenChange?.({ open: false });
            }}
          >
            Save
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};
