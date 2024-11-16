import { Box } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa6";
import { IconBaseProps } from "react-icons/lib";

export const Star: React.FC<IconBaseProps> = (props) => {
  return (
    <Box mb="2px" css={{ "--star-color": "colors.yellow.500" }}>
      <FaStar color="var(--star-color)" {...props} />
    </Box>
  );
};
