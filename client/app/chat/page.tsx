import { ChatPage } from "@/components/app/ChatPage/ChatPage";
import { Container } from "@chakra-ui/react";

export default function Chat() {
  return (
    <Container
      w="full"
      h="calc(100vh - 96px - 16px)"
      overflow="hidden"
      centerContent
    >
      <ChatPage />
    </Container>
  );
}
