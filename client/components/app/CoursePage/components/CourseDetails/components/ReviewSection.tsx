import { Course } from "@/app/mock-data";
import { Stars } from "@/components/custom/Stars";
import { Button } from "@/components/ui/button";
import { useVisibility } from "@/utils/useVisibility";
import { Box, ButtonProps, Flex, FlexProps, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { LuChevronLeft, LuChevronRight, LuUser } from "react-icons/lu";

interface Props {
  course: Course;
}

export const ReviewSection: React.FC<Props> = ({ course }) => {
  const [reviewReel, setReviewReel] = useState<HTMLElement | null>(null);
  const [isHeadVisible, headRef] = useVisibility();
  const [isTailVisible, tailRef] = useVisibility();

  return (
    <Box
      css={{ "--bg-color": "colors.blue.50" }}
      bg="var(--bg-color)"
      borderRadius="0.5rem"
      pb="2rem"
    >
      <Heading fontSize="md" p="2rem">
        <Flex alignItems="center" gap={4}>
          <Flex gap="2">
            <Box fontSize="3xl">{course.rating}</Box> / <Box>5.0</Box>
          </Flex>
          <Stars count={course.rating} />
          <Box color="gray.500" fontSize="xs" mt="2px" ml="1">
            197 reviews
          </Box>
        </Flex>
      </Heading>
      <Box w="0" minW="full" position="relative">
        <Flex
          {...gradientBlockProps}
          left="0"
          background="linear-gradient(to left, transparent, var(--bg-color) 75%)"
        >
          <Button
            {...scrollButtonProps}
            opacity={isHeadVisible ? 0 : 1}
            ml="1.75rem"
            onClick={() =>
              reviewReel?.scrollBy({ left: -200, behavior: "smooth" })
            }
          >
            <LuChevronLeft />
          </Button>
        </Flex>
        <Flex
          {...gradientBlockProps}
          right="0"
          background="linear-gradient(to right, transparent, var(--bg-color) 75%)"
        >
          <Button
            {...scrollButtonProps}
            opacity={isTailVisible ? 0 : 1}
            mr="1.75rem"
            onClick={() =>
              reviewReel?.scrollBy({ left: 200, behavior: "smooth" })
            }
          >
            <LuChevronRight />
          </Button>
        </Flex>
        <Box
          ref={setReviewReel}
          overflowY="auto"
          _scrollbar={{ display: "none" }}
          scrollSnapType="x mandatory"
        >
          <Flex
            w="fit-content"
            pb="1rem"
            scrollSnapType="x"
            alignItems="center"
          >
            <Box ref={headRef} w="2rem" mr="-2rem" h="40px" zIndex={1} />
            {new Array(8).fill(0).map((x, i, array) => {
              const isLast = i === array.length - 1;
              return (
                <Box key={i} px="2rem" mr="-3.5rem" scrollSnapAlign="start">
                  <Box
                    w="17.5rem"
                    maxW="full"
                    bg="gray.50"
                    borderRadius={8}
                    p="4"
                  >
                    <Flex gap="1rem" alignItems="center" mb="1.5rem">
                      <Flex
                        borderRadius="50%"
                        boxSize="3rem"
                        bg="blue.100"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <LuUser size="1.25rem" />
                      </Flex>
                      <Box>
                        <Flex mb="1" gap="4">
                          tsulluman {i + 1}
                          <Box color="gray.500">2023-10-16</Box>
                        </Flex>
                        <Stars count={5} />
                      </Box>
                    </Flex>
                    <Box px="3">
                      Lorem ipsum is placeholder text commonly used in the
                      graphic, print, and publishing industries for previewing
                      layouts and visual mockups. Lorem ipsum is placeholder
                      text commonly used in the graphic, print, and publishing
                      industries for previewing
                    </Box>
                  </Box>
                </Box>
              );
            })}
            <Box ref={tailRef} w="2rem" ml="1.5rem" h="40px" zIndex={1} />
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

const gradientBlockProps: FlexProps = {
  position: "absolute",
  top: "0",
  width: "2rem",
  height: "full",
  transition: ".3s",
  alignItems: "center",
  justifyContent: "center",
};

const scrollButtonProps: ButtonProps = {
  borderRadius: "3rem",
  w: "0",
  colorPalette: "blue",
};
