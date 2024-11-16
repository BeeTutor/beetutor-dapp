import Image from "next/image";
import { Badge, Box, Card, Flex, Grid } from "@chakra-ui/react";
import { tutors } from "../mock-data";
import Link from "next/link";

export default function Tutors() {
  return (
    <Grid templateColumns="repeat(auto-fill, minmax(18rem, 1fr))" gap="6">
      {tutors.map((x, i) => (
        <Link key={i} href={`/tutors/${x.id}`}>
          <Card.Root bg="gray.50" h="full">
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
