"use client";

import { InputGroup } from "@/components/ui/input-group";
import { Badge, Box, Card, Flex, Grid, Input } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LuSearch } from "react-icons/lu";
import { tutors } from "../mock-data";

export default function Tutors() {
  const [filterValue, setFilterValue] = useState("");
  return (
    <Box>
      <InputGroup
        mt="0.75rem"
        mb="2rem"
        maxW="30rem"
        mx="auto"
        display="block"
        startElement={<LuSearch />}
      >
        <Input
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          placeholder="Search for courses or tutors"
        />
      </InputGroup>
      <Grid templateColumns="repeat(auto-fill, minmax(18rem, 1fr))" gap="6">
        {tutors
          .filter(
            (x) => x.name.includes(filterValue) || x.tags.includes(filterValue)
          )
          .map((x, i) => (
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
                      <Image
                        fill
                        objectFit="cover"
                        src={x.avatar}
                        alt={x.name}
                      />
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
    </Box>
  );
}
