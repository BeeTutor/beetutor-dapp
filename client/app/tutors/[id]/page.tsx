import { courseData, userData } from "@/app/mock-data";
import { CourseGrid } from "@/components/app/CourseGrid";
import { Box, Card, Flex, Grid, Separator, Tabs } from "@chakra-ui/react";
import Image from "next/image";

interface Props {
  params: { id: string };
}

export default async function Page({ params: { id } }: Props) {
  const tutor = userData.find((x) => x.id === Number(id));
  if (!tutor) return null;

  return (
    <Grid templateColumns="18rem 1fr" alignItems="flex-start" gap="6">
      <Card.Root bg="gray.50">
        <Box p="2.5rem" background="blue.50">
          <Box
            aspectRatio="1/1"
            borderRadius="50%"
            overflow="hidden"
            position="relative"
          >
            <Image fill objectFit="cover" src={tutor.avatar} alt={tutor.name} />
          </Box>
          <Card.Title mt="2rem" fontSize="2xl" textAlign="center">
            {tutor.name}
          </Card.Title>
          <Flex flexWrap="wrap" gap="1">
            {tutor.tags.map((x, i) => (
              <Box key={i} color="green.600" fontWeight="bold" fontSize="sm">
                #{x}
              </Box>
            ))}
          </Flex>
          <Box overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
            Address: {tutor.address}
          </Box>
        </Box>
        <Grid gap="1rem" templateColumns="repeat(2, 1fr)" px="2.5rem" py="1rem">
          {(
            [
              { key: "attended", label: "Attended" },
              { key: "offered", label: "Offered" },
            ] as const
          ).map((x, i) => (
            <Box textAlign="center">
              <Box>{x.label}</Box>
              <Box fontSize="2xl" fontWeight="bold">
                {tutor[x.key]}
              </Box>
            </Box>
          ))}
        </Grid>
        <Box px="1rem">
          <Separator />
        </Box>
        <Box px="2.5rem" py="1rem">
          <Box fontWeight="bold">About me</Box>
          {tutor.info}
          <Box fontWeight="bold" mt="1rem">
            About me
          </Box>
          {tutor.info}
        </Box>
      </Card.Root>
      <Card.Root bg="gray.50" p="2rem">
        <Tabs.Root
          defaultValue="course"
          variant="plain"
          size="lg"
          colorPalette="green"
        >
          <Tabs.List bg="bg.muted" rounded="l3" p="1">
            <Tabs.Trigger value="course">Course</Tabs.Trigger>
            <Tabs.Trigger value="blog">Blog</Tabs.Trigger>
            <Tabs.Indicator rounded="l2" />
          </Tabs.List>
          <Tabs.Content value="course">
            <CourseGrid courses={courseData} />
          </Tabs.Content>
          <Tabs.Content value="blog">Coming soon</Tabs.Content>
        </Tabs.Root>
      </Card.Root>
    </Grid>
  );
}
