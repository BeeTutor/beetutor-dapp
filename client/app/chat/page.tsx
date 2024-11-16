import { ChatPage } from "@/components/app/ChatPage/ChatPage";
import { Container } from "@chakra-ui/react";

export default function Chat() {
  return (
    <Container
      w="svw"
      h="calc(100vh - 96px - 16px)"
      overflow="hidden"
      maxW={{ base: "2xl", lg: "6xl" }}
      px="3rem"
      centerContent
    >
      <ChatPage />
    </Container>
  );
}
