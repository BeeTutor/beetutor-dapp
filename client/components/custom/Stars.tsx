import { Flex } from "@chakra-ui/react";
import { FaStar, FaStarHalf } from "react-icons/fa6";

interface Props {
  count: number;
}

export const Stars: React.FC<Props> = ({ count }) => {
  return (
    <Flex
      alignItems="center"
      css={{ "--star-color": "colors.yellow.500" }}
      color="var(--star-color)"
    >
      {new Array(Math.floor(count)).fill(0).map((x, i) => (
        <FaStar key={i} color="var(--star-color)" />
      ))}
      {count % 1 > 0.5 && <FaStarHalf color="var(--star-color)" />}
    </Flex>
  );
};
