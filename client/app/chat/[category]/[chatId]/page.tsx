import { ChatPage, ChatTabEnum } from "@/components/app/ChatPage/ChatPage";
import { Container } from "@chakra-ui/react";

export default async function Chat({
  params,
}: {
  params: Promise<{ category: ChatTabEnum, chatId: string }>
}) {
  const { category, chatId } = await params;

  return (
    <Container
      w="full"
      h="calc(100vh - 96px - 16px)"
      overflow="hidden"
      centerContent
    >
      <ChatPage defaultTab={category} chatId={chatId}/>
    </Container>
  );
}
