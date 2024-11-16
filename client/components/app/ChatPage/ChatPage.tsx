"use client";

import { InputGroup } from "@/components/ui/input-group";
import { toaster } from "@/components/ui/toaster";
import { useStore } from "@/store";
import {
  Box,
  Button,
  Center,
  Container,
  Grid,
  IconButton,
  Input,
  Spinner,
  Tabs,
} from "@chakra-ui/react";
import {
  CONSTANTS,
  IFeeds,
  PushAPI,
  TYPES,
  VideoCallData,
  VideoEventType,
} from "@pushprotocol/restapi";
import { PushStream } from "@pushprotocol/restapi/src/lib/pushstream/PushStream";
import { VideoV2 } from "@pushprotocol/restapi/src/lib/video/VideoV2";
import {
  ChatPreview,
  ChatPreviewSearchList,
  ChatProfile,
  ChatUIProvider,
  ChatViewList,
  CreateGroupModal,
  IChatPreviewPayload,
  IChatTheme,
  IMessagePayload,
  lightChatTheme,
  MessageInput,
} from "@pushprotocol/uiweb";
import { useCallback, useEffect, useState } from "react";
import { BsFillTelephoneFill, BsFillTelephoneXFill } from "react-icons/bs";
import {
  FaUserAstronaut,
  FaUserGroup,
  FaUserPlus,
  FaVideo,
} from "react-icons/fa6";
import { LuSearch } from "react-icons/lu";
import * as RPC from "../../../services/ethersRPC";
import VideoCallDialog from "./components/VideoCallDialog";

export enum ChatTabEnum {
  CHAT = "chats",
  GROUP = "groups",
  REQUEST = "request",
}

export type ChatPageType = {
  defaultTab?: ChatTabEnum;
  chatId?: string;
};

export const ChatPage = ({
  defaultTab = ChatTabEnum.CHAT,
  chatId,
}: ChatPageType) => {
  const { provider } = useStore();

  const [address, setAddress] = useState<string>();
  const [user, setUser] = useState<PushAPI>();
  const [videoUser, setVideoUser] = useState<VideoV2>();

  // // Video call states
  const [videoSettings, setVideoSettings] = useState({
    video: true,
    audio: true,
  });

  // // Chat management states
  const [videoCallData, setVideoCallData] = useState<VideoCallData>(
    CONSTANTS.VIDEO.INITIAL_DATA
  );
  const [chats, setChats] = useState({
    loading: false,
    personal: [] as Array<IChatPreviewPayload>,
    group: [] as Array<IChatPreviewPayload>,
    request: [] as Array<IChatPreviewPayload>,
  });

  const [selectedChatIds, setSelectedChatIds] = useState({
    personal: defaultTab === ChatTabEnum.CHAT && chatId ? chatId : "",
    group: defaultTab === ChatTabEnum.GROUP && chatId ? chatId : "",
    request: "",
  });

  // Search and reply states
  const [search, setSearch] = useState({
    personal: defaultTab === ChatTabEnum.CHAT && chatId ? chatId : "",
    group: defaultTab === ChatTabEnum.GROUP && chatId ? chatId : "",
  });

  const [stream, setStream] = useState<PushStream>();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [replyPayload, setReplyPayload] = useState<IMessagePayload | null>(
    null
  );
  const [showCreateGroupDialog, setShowCreateGroupDialog] = useState(false);

  const retrieveAccounts = useCallback(async () => {
    if (!provider) {
      console.log("no provider");
    } else {
      const address = await RPC.getAccounts(provider);
      console.log("address", address);
      setAddress(address);
    }
  }, [provider]);

  const initializeUser = useCallback(async () => {
    if (provider) {
      // const signer = await RPC.getSigner(provider);
      const signer = await provider.getSigner();
      console.log("✨::::signer", signer);
      const user = await PushAPI.initialize(signer, {
        env: CONSTANTS.ENV.STAGING,
      });
      setUser(user);

      const stream = await user.initStream([
        CONSTANTS.STREAM.CONNECT,
        CONSTANTS.STREAM.DISCONNECT,
        CONSTANTS.STREAM.CHAT,
        CONSTANTS.STREAM.CHAT_OPS,
        CONSTANTS.STREAM.NOTIF,
        CONSTANTS.STREAM.VIDEO,
      ]);
      await stream.connect();
      setStream(stream);

      const videoUser = await user.video.initialize(setVideoCallData, {
        stream,
        config: { video: videoSettings.video, audio: videoSettings.audio },
      });
      setVideoUser(videoUser);
    }
  }, [videoSettings, provider]);

  const mapChatPayload = (chat: IFeeds): IChatPreviewPayload => {
    const isGroup = Boolean(chat.groupInformation);
    return {
      chatId: chat.chatId,
      chatPic:
        isGroup && chat.groupInformation
          ? chat.groupInformation.groupImage
          : chat.profilePicture,
      chatParticipant:
        isGroup && chat.groupInformation
          ? chat.groupInformation.groupName
          : chat.did,
      chatGroup: isGroup,
      chatTimestamp: new Date(chat.intentTimestamp).getTime(),
    };
  };

  const fetchAllChats = useCallback(async () => {
    if (user && chats.loading === false) {
      setChats((prev) => ({ ...prev, loading: true }));
      const chatList = await user.chat.list("CHATS");
      const requestList = await user.chat.list("REQUESTS");

      console.log("✨::::chatList", chatList);
      console.log("✨::::requestList", requestList);

      const personal =
        chatList
          ?.filter((chat) => chat.groupInformation === null)
          .map(mapChatPayload) || [];
      const group =
        chatList
          ?.filter((chat) => chat.groupInformation !== null)
          .map(mapChatPayload) || [];
      const request = requestList.map(mapChatPayload) || [];

      console.log("✨::::personal", personal);
      console.log("✨::::group", group);
      console.log("✨::::request", request);

      setChats({
        loading: false,
        personal,
        group,
        request,
      });
    }
  }, [user]);

  const handleIncomingVideoRequest = useCallback(
    async (eventData: TYPES.VIDEO.EVENT) => {
      if (
        eventData.event === VideoEventType.REQUEST &&
        eventData.peerInfo.address
      ) {
        const toastId = toaster.success({
          title: `${address} is calling...`,
          description: (
            <Box gap="3">
              <IconButton
                rounded="full"
                onClick={async () => {
                  if (videoUser)
                    await videoUser.approve(eventData.peerInfo.address);
                  setIsDialogOpen(true);
                  toaster.dismiss(toastId);
                }}
              >
                <BsFillTelephoneFill />
              </IconButton>
              <IconButton
                rounded="full"
                onClick={async () => {
                  if (videoUser) await videoUser.deny();
                  toaster.dismiss(toastId);
                }}
              >
                <BsFillTelephoneXFill />
              </IconButton>
            </Box>
          ),
          duration: 99999,
        });
      }
    },
    [address, videoUser]
  );

  const callOn = async (userInstance: PushAPI, chatId: string) => {
    if (stream && videoUser) {
      const ans = await userInstance.chat.info(chatId);

      const filteredAddresses = ans.participants
        .filter((address) => !address.includes(userInstance.account))
        .map((address) => address.replace("eip155:", ""));

      console.log("Filtered Addresses:", filteredAddresses);

      videoUser.config({
        video: videoSettings.video,
        audio: videoSettings.audio,
      });

      await videoUser.request(filteredAddresses);
      setIsDialogOpen(true);
    }
  };

  const initializeChatApp = useCallback(async () => {
    if (provider && !address) {
      await retrieveAccounts();
      await initializeUser();
    }
  }, [provider, address, retrieveAccounts, initializeUser]);

  useEffect(() => {
    initializeChatApp();

    if (user) fetchAllChats();

    if (stream && user) {
      stream.on(CONSTANTS.STREAM.VIDEO, handleIncomingVideoRequest);
    }
  }, [
    initializeChatApp,
    user,
    stream,
    fetchAllChats,
    handleIncomingVideoRequest,
  ]);

  const customTheme: IChatTheme = {
    ...lightChatTheme,
    textColor: {
      encryptionMessageText: "#000000",
      chatReceivedBubbleTimestampText: "#959595",
      chatSentBubbleTimestampText: "#959595",
    },
    backgroundColor: {
      ...lightChatTheme.backgroundColor,
      chatProfileBackground: "#F9F0EE",
      messageInputBackground: "#FFFFFF",
      chatReceivedBubbleBackground: "#E8DDDB",
      chatSentBubbleBackground: "#FFFFFF",
      chatPreviewBadgeBackground: "#FDE198",
      chatPreviewBackground: "#F5F5F5",
      chatPreviewSelectedBackground: "#C3B9B733",
      chatPreviewHoverBackground: "#F0E5E5",
    },
    borderRadius: {
      ...lightChatTheme.borderRadius,
      messageInput: "20px",
      chatPreview: "4px",
    },
    iconColor: {
      sendButton: "#959595",
      emoji: "#959595",
      attachment: "#959595",
      userProfileSettings: "#959595",
      approveRequest: "#959595",
      rejectRequest: "#959595",
      blockRequest: "#959595",
      primaryColor: "#959595",
      subtleColor: "#959595",
    },
    scrollbarColor: "#C3B9B733",
    margin: {
      ...lightChatTheme.margin,
      messageInputMargin: "32px",
      chatBubbleSenderMargin: "4px",
      chatBubbleReceiverMargin: "4px",
    },
    padding: {
      ...lightChatTheme.padding,
      chatPreviewListPadding: "0px",
      messageInputPadding: "20px",
    },
  };

  return (
    <Container
      h="calc(100vh - 96px - 16px)"
      overflow="hidden"
      w="inherit"
      centerContent
    >
      {user ? (
        <ChatUIProvider
          env={CONSTANTS.ENV.STAGING}
          user={user}
          debug={true}
          theme={customTheme}
        >
          <Tabs.Root defaultValue={defaultTab} justify="center" w="inherit">
            <Tabs.List>
              <Tabs.Trigger value={ChatTabEnum.CHAT}>
                <FaUserAstronaut />
                Chats
              </Tabs.Trigger>
              <Tabs.Trigger value={ChatTabEnum.GROUP}>
                <FaUserGroup />
                Groups
              </Tabs.Trigger>
              <Tabs.Trigger value={ChatTabEnum.REQUEST}>
                <FaUserPlus />
                Requests
              </Tabs.Trigger>
            </Tabs.List>

            {chats.loading ? (
              <Center gap="3" display="flex" p="3">
                <Spinner size="inherit" color="inherit" />
                <p>Loading chat......</p>
              </Center>
            ) : (
              <>
                <Tabs.Content
                  value={ChatTabEnum.CHAT}
                  h="calc(100vh - 96px - 16px - 48px)"
                  w="inherit"
                  justifyItems="center"
                >
                  <Grid
                    templateColumns={{
                      base: "1fr",
                      lg: "1fr 2fr",
                    }}
                    h="full"
                    gap="3"
                    w="80vw"
                  >
                    <Container
                      overflow="hidden scroll"
                      h="full"
                      p="0"
                      centerContent
                    >
                      <InputGroup startElement={<LuSearch />} w="full">
                        <Input
                          placeholder="Search contacts"
                          value={search.personal}
                          onChange={(event) =>
                            setSearch((prev) => ({
                              ...prev,
                              personal: event.target.value,
                            }))
                          }
                        />
                      </InputGroup>

                      {search.personal ? (
                        <ChatPreviewSearchList
                          searchParamter={search.personal}
                          onChatSelected={(chatId) =>
                            setSelectedChatIds((prev) => ({
                              ...prev,
                              personal: chatId,
                            }))
                          }
                        />
                      ) : chats.personal.length > 0 ? (
                        chats.personal.map((chat, index) => (
                          <ChatPreview
                            key={index}
                            chatPreviewPayload={chat}
                            selected={selectedChatIds.personal === chat.chatId}
                            setSelected={(chatId) =>
                              setSelectedChatIds((prev) => ({
                                ...prev,
                                personal: chatId,
                              }))
                            }
                          />
                        ))
                      ) : (
                        <Box p="4" textAlign="center" color="gray.500">
                          No personal chats available
                        </Box>
                      )}
                    </Container>
                    <Box
                      width="100%"
                      height="inherit"
                      display="flex"
                      flexDirection="column"
                      justifyContent="space-between"
                      overflow="hidden"
                      p="0"
                      borderRadius="20px"
                      border="1px solid #A29E9E"
                      bg="#C3B9B733"
                    >
                      {selectedChatIds.personal ? (
                        <>
                          <Container
                            zIndex="2"
                            p="2.5"
                            bg="#F9F0EE"
                            boxShadow="0px 2px 6px 0px #0000001A"
                          >
                            <ChatProfile
                              chatId={selectedChatIds.personal}
                              chatProfileRightHelperComponent={
                                <IconButton
                                  color="black"
                                  bg="none"
                                  onClick={() =>
                                    callOn(user, selectedChatIds.personal)
                                  }
                                >
                                  <FaVideo />
                                </IconButton>
                              }
                            />
                          </Container>

                          <Container
                            flex="1 1 auto"
                            overflow="hidden scroll"
                            flexDirection="column"
                            justifyContent="start"
                            zIndex="1"
                          >
                            <ChatViewList
                              chatId={selectedChatIds.personal}
                              limit={10}
                              setReplyPayload={setReplyPayload}
                            />
                          </Container>

                          <Container flex="0 1 auto" zIndex="2" p="4">
                            <MessageInput
                              chatId={selectedChatIds.personal}
                              replyPayload={replyPayload}
                              setReplyPayload={setReplyPayload}
                            />
                          </Container>
                        </>
                      ) : (
                        <Container
                          h="inherit"
                          centerContent
                          justifyContent="center"
                          color="gray.700"
                          fontStyle="italic"
                        >
                          No chats available
                        </Container>
                      )}
                    </Box>
                  </Grid>
                </Tabs.Content>
                <Tabs.Content
                  value={ChatTabEnum.GROUP}
                  h="calc(100vh - 96px - 16px - 48px)"
                  w="inherit"
                  justifyItems="center"
                >
                  <Grid
                    templateColumns={{
                      base: "1fr",
                      lg: "1fr 2fr",
                    }}
                    h="full"
                    gap="3"
                    w="80vw"
                  >
                    <Container
                      overflow="hidden scroll"
                      h="full"
                      p="0"
                      centerContent
                    >
                      {showCreateGroupDialog && (
                        <CreateGroupModal
                          onClose={() => {
                            setShowCreateGroupDialog(false);
                          }}
                        />
                      )}
                      <InputGroup startElement={<LuSearch />} w="full">
                        <Input
                          placeholder="Search contacts"
                          value={search.group}
                          onChange={(event) =>
                            setSearch((prev) => ({
                              ...prev,
                              group: event.target.value,
                            }))
                          }
                        />
                      </InputGroup>

                      {search.group ? (
                        <ChatPreviewSearchList
                          searchParamter={search.group}
                          onChatSelected={(chatId) => {
                            setSelectedChatIds((prev) => ({
                              ...prev,
                              group: chatId,
                            }));
                          }}
                        />
                      ) : chats.group.length > 0 ? (
                        chats.group.map((chat, index) => (
                          <ChatPreview
                            key={index}
                            chatPreviewPayload={chat}
                            selected={selectedChatIds.group === chat.chatId}
                            setSelected={(chatId) =>
                              setSelectedChatIds((prev) => ({
                                ...prev,
                                group: chatId,
                              }))
                            }
                          />
                        ))
                      ) : (
                        <Box p="4" textAlign="center" color="gray.500">
                          No group chats available
                        </Box>
                      )}
                      <Button
                        position="absolute"
                        bottom="0"
                        w="full"
                        onClick={() => setShowCreateGroupDialog(true)}
                      >
                        <FaUserGroup />
                        Create a group
                      </Button>
                    </Container>
                    <Box
                      width="100%"
                      height="inherit"
                      display="flex"
                      flexDirection="column"
                      justifyContent="space-between"
                      overflow="hidden"
                      p="0"
                      borderRadius="20px"
                      border="1px solid #A29E9E"
                      bg="#C3B9B733"
                    >
                      {selectedChatIds.group ? (
                        <>
                          <Container
                            zIndex="2"
                            p="2.5"
                            bg="#F9F0EE"
                            boxShadow="0px 2px 6px 0px #0000001A"
                          >
                            <ChatProfile
                              chatId={selectedChatIds.group}
                              chatProfileRightHelperComponent={
                                <IconButton
                                  color="black"
                                  bg="none"
                                  onClick={() =>
                                    callOn(user, selectedChatIds.group)
                                  }
                                >
                                  <FaVideo />
                                </IconButton>
                              }
                            />
                          </Container>

                          <Container
                            flex="1 1 auto"
                            overflow="hidden scroll"
                            flexDirection="column"
                            justifyContent="start"
                            zIndex="1"
                          >
                            <ChatViewList
                              chatId={selectedChatIds.group}
                              limit={10}
                              setReplyPayload={setReplyPayload}
                            />
                          </Container>

                          <Container flex="0 1 auto" zIndex="2" p="4">
                            <MessageInput
                              chatId={selectedChatIds.group}
                              replyPayload={replyPayload}
                              setReplyPayload={setReplyPayload}
                            />
                          </Container>
                        </>
                      ) : (
                        <Container
                          h="inherit"
                          centerContent
                          justifyContent="center"
                          color="gray.700"
                          fontStyle="italic"
                        >
                          No chats available
                        </Container>
                      )}
                    </Box>
                  </Grid>
                </Tabs.Content>
                <Tabs.Content
                  value={ChatTabEnum.REQUEST}
                  h="calc(100vh - 96px - 16px - 48px)"
                  w="inherit"
                  justifyItems="center"
                >
                  <Grid
                    templateColumns={{
                      base: "1fr",
                      lg: "1fr 2fr",
                    }}
                    h="full"
                    gap="3"
                    w="80vw"
                  >
                    <Container
                      overflow="hidden scroll"
                      h="full"
                      p="0"
                      centerContent
                    >
                      {chats.request.length > 0 ? (
                        chats.request.map((chat, index) => (
                          <ChatPreview
                            key={index}
                            chatPreviewPayload={chat}
                            selected={selectedChatIds.request === chat.chatId}
                            setSelected={(chatId) =>
                              setSelectedChatIds((prev) => ({
                                ...prev,
                                request: chatId,
                              }))
                            }
                          />
                        ))
                      ) : (
                        <Box p="4" textAlign="center" color="gray.500">
                          No requests available
                        </Box>
                      )}
                    </Container>
                    <Box
                      width="100%"
                      height="inherit"
                      display="flex"
                      flexDirection="column"
                      justifyContent="space-between"
                      overflow="hidden"
                      p="0"
                      borderRadius="20px"
                      border="1px solid #A29E9E"
                      bg="#C3B9B733"
                    >
                      {selectedChatIds.request ? (
                        <>
                          <Container
                            zIndex="2"
                            p="2.5"
                            bg="#F9F0EE"
                            boxShadow="0px 2px 6px 0px #0000001A"
                          >
                            <ChatProfile
                              chatId={selectedChatIds.request}
                              chatProfileRightHelperComponent={
                                <IconButton
                                  color="black"
                                  bg="none"
                                  onClick={() =>
                                    callOn(user, selectedChatIds.request)
                                  }
                                >
                                  <FaVideo />
                                </IconButton>
                              }
                            />
                          </Container>

                          <Container
                            flex="1 1 auto"
                            overflow="hidden scroll"
                            flexDirection="column"
                            justifyContent="start"
                            zIndex="1"
                          >
                            <ChatViewList
                              chatId={selectedChatIds.request}
                              limit={10}
                              setReplyPayload={setReplyPayload}
                            />
                          </Container>

                          <Container flex="0 1 auto" zIndex="2" p="4">
                            <MessageInput
                              chatId={selectedChatIds.request}
                              replyPayload={replyPayload}
                              setReplyPayload={setReplyPayload}
                            />
                          </Container>
                        </>
                      ) : (
                        <Container
                          h="inherit"
                          centerContent
                          justifyContent="center"
                          color="gray.700"
                          fontStyle="italic"
                        >
                          No chats available
                        </Container>
                      )}
                    </Box>
                  </Grid>
                </Tabs.Content>
              </>
            )}
          </Tabs.Root>
          {isDialogOpen && videoUser && (
            <VideoCallDialog
              open={isDialogOpen}
              onOpenChange={(e) => setIsDialogOpen(e.open)}
              videoUser={videoUser}
              data={videoCallData}
              videoSettings={videoSettings}
              setVideoSettings={setVideoSettings}
            />
          )}
        </ChatUIProvider>
      ) : (
        <Center gap="3" display="flex" h="inherit">
          <Spinner size="inherit" color="inherit" />
          <p>Loading init......</p>
        </Center>
      )}
    </Container>
  );
};
