import { Badge, Box, Card, Flex, Grid } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { userData } from "../mock-data";

export default function Tutors() {
  return (
    <Grid templateColumns="repeat(auto-fit, minmax(18rem, 1fr))" gap="6">
      {userData.map((x, i) => (
        <Link key={i} href={`/tutors/${x.id}`}>
          <Card.Root bg="gray.50">
            <Card.Body pt="2rem" pb="2rem" gap="4">
              <Flex gap="1.5rem" alignItems="center">
                <Box
                  aspectRatio="1/1"
                  w="5rem"
                  borderRadius="50%"
                  overflow="hidden"
                  position="relative"
                >
                  <Image fill objectFit="cover" src={x.avatar} alt={x.name} />
                </Box>
                <Card.Title fontSize="2xl">{x.name}</Card.Title>
              </Flex>
              <Box>
                <Box>Attended: 3 lessons</Box>
                <Box>Offered: 4 lessons</Box>
              </Box>
              <Flex flexWrap="wrap" gap="2">
                {x.tags.map((x, i) => (
                  <Badge key={i} colorPalette="green" px="3" py="1">
                    #{x}
                  </Badge>
                ))}
              </Flex>
            </Card.Body>
          </Card.Root>
        </Link>
      ))}
    </Grid>
  );
}
