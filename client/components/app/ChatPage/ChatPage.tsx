"use client";

import { InputGroup } from "@/components/ui/input-group";
import { toaster } from "@/components/ui/toaster";
import { useStore } from "@/store";
import { Box, Container, Grid, IconButton, Input, Spinner, Tabs } from "@chakra-ui/react";
import {
  CONSTANTS,
  PushAPI,
  TYPES,
  VideoCallData,
  VideoEventType,
} from "@pushprotocol/restapi";
import { PushStream } from "@pushprotocol/restapi/src/lib/pushstream/PushStream";
import { VideoV2 } from "@pushprotocol/restapi/src/lib/video/VideoV2";
import {
  ChatPreviewList,
  ChatPreviewSearchList,
  ChatUIProvider,
  ChatView,
  lightChatTheme,
} from "@pushprotocol/uiweb";
import { useEffect, useState } from "react";
import {
  FaUserAstronaut,
  FaUserGroup,
  FaUserPlus,
  FaVideo,
} from "react-icons/fa6";
import { LuSearch } from "react-icons/lu";
import RPC from "../../../services/ethersRPC";
import VideoCallDialog from "./components/VideoCallDialog";
import { BsFillTelephoneFill, BsFillTelephoneXFill } from "react-icons/bs";

export const ChatPage: React.FC = () => {
  const { provider } = useStore();

  const [address, setAddress] = useState<string>();
  const [user, setUser] = useState<PushAPI>();
  const [videoUser, setVideoUser] = useState<VideoV2>();
  const [selectedChatId, setSelectedChatId] = useState<string>("");
  const [selectedRequestChatId, setSelectedRequestChatId] =
    useState<string>("");
  const [data, setData] = useState<VideoCallData>(CONSTANTS.VIDEO.INITIAL_DATA);
  const [stream, setStream] = useState<PushStream>();
  const [video, setVideo] = useState<boolean>(false);
  const [audio, setAudio] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [searchedUser, setSearchedUser] = useState<string>("");

  const getAccounts = async () => {
    if (!provider) {
      console.log("no provider");
    } else {
      const address = await RPC.getAccounts(provider);
      console.log("address", address);
      setAddress(address);
    }
  };

  const getUser = async () => {
    const signer = await RPC.getSigner(provider);
    const user = await PushAPI.initialize(signer, {
      env: CONSTANTS.ENV.PROD,
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
  };

  const callOn = async (userInstance: PushAPI) => {
    if (stream) {
      const ans = await userInstance.chat.info(selectedChatId);

      const filteredAddresses = ans.participants
        .filter((address) => !address.includes(userInstance.account))
        .map((address) => address.replace("eip155:", ""));

      console.log("Filtered Addresses:", filteredAddresses);

      const videoUser = await userInstance.video.initialize(setData, {
        stream,
        config: {
          video,
          audio,
        },
      });
      setVideoUser(videoUser);
      await videoUser.request(filteredAddresses);
      setIsDialogOpen(true);
    }
  };

  useEffect(() => {
    const init = async () => {
      if (provider && !address) {
        await getAccounts();
        await getUser();
      }
    };

    init();

    if (stream && user) {
      stream.on(
        CONSTANTS.STREAM.VIDEO,
        async (eventData: TYPES.VIDEO.EVENT) => {
          console.log("📀", "color: #26bfa5;", eventData);
          if (
            eventData.event === VideoEventType.REQUEST &&
            eventData.peerInfo.address
          ) {
            toaster.create({
              title: `${address} is calling......`,
              description: (
                <>
                  <IconButton
                    rounded="full"
                    onClick={async () => {
                      const videoUser = await user.video.initialize(setData, {
                        stream,
                        config: {
                          video,
                          audio,
                        },
                      });
                      await videoUser.approve(eventData.peerInfo.address);
                      setIsDialogOpen(true);
                    }}
                  >
                    <BsFillTelephoneFill />
                  </IconButton>
                  <IconButton
                    rounded="full"
                    onClick={async () => {
                      const videoUser = await user.video.initialize(setData, {
                        stream,
                        config: {
                          video,
                          audio,
                        },
                      });
                      await videoUser.deny();
                    }}
                  >
                    <BsFillTelephoneXFill />
                  </IconButton>
                </>
              ),
              duration: 99999,
            });
          }
        }
      );
    }
  });

  return user ? (
    <Box h="calc(100vh - 96px - 16px)" overflow="hidden">
      <ChatUIProvider
        env={CONSTANTS.ENV.PROD}
        debug={true}
        user={user}
        theme={{
          ...lightChatTheme,
          textColor: {
            encryptionMessageText: "#000000",
            chatReceivedBubbleTimestampText: "#959595",
            chatSentBubbleTimestampText: "#959595",
          },
          backgroundColor: {
            ...lightChatTheme.backgroundColor,
            chatViewComponentBackground: "#C3B9B733",
            chatProfileBackground: "#F9F0EE",
            messageInputBackground: "#FFFFFF",
            chatReceivedBubbleBackground: "#E8DDDB",
            chatSentBubbleBackground: "#FFFFFF",
          },
          borderRadius: {
            ...lightChatTheme.borderRadius,
            chatProfile: "4px",
            messageInput: "20px",
            chatViewComponent: "20px",
          },
          border: {
            chatViewComponent: "1px solid #A29E9E"
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
          spinnerColor: "#000000",
          padding: {
            ...lightChatTheme.padding,
            chatPreviewListPadding: "0px",
          }
        }}
      >
        <Tabs.Root defaultValue="chats" justify="center">
          <Tabs.List>
            <Tabs.Trigger value="chats">
              <FaUserAstronaut />
              Chats
            </Tabs.Trigger>
            <Tabs.Trigger value="groups">
              <FaUserGroup />
              Groups
            </Tabs.Trigger>
            <Tabs.Trigger value="requests">
              <FaUserPlus />
              Requests
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="chats" h="calc(100vh - 96px - 16px - 48px)">
            <Grid templateColumns={{ lg: "20vw 50vw" }} h="full" gap="3">
              <Container overflow="hidden" h="full" p="0" centerContent>
                <InputGroup startElement={<LuSearch />} w="full">
                  <Input
                    placeholder="Search contacts"
                    value={searchedUser}
                    onChange={(event) => setSearchedUser(event.target.value)}
                  />
                </InputGroup>
                {searchedUser ? (
                  <ChatPreviewSearchList
                    searchParamter={searchedUser || ""}
                    onChatSelected={(chatId) => {
                      console.log("chat id: ", chatId);
                      setSelectedChatId(chatId);
                    }}
                  />
                ) : (
                  <ChatPreviewList
                    listType="CHATS"
                    onChatSelected={(chatId) => {
                      console.log("chat id:", chatId);
                      setSelectedChatId(chatId);
                    }}
                    onUnreadCountChange={(count) =>
                      console.log("Count is: ", count)
                    }
                    onLoading={() => <Spinner size="inherit" color="inherit" />}
                    onPaging={(chats) =>
                      console.log("paging chats are: ", chats)
                    }
                    onPreload={(chats) =>
                      console.log("preload chats are: ", chats)
                    }
                  />
                )}
              </Container>
              <Box
                overflow="hidden"
                h="full"
                w="full"
              >
                {/* <Box bg="#F9F0EE" p="4" boxShadow="0px 2px 6px 0px #0000001A" zIndex="3" >
                  <ChatProfile chatId={selectedChatId} />
                </Box>
                <Box h="40vh" overflow="hidden scroll">
                  <ChatViewList chatId={selectedChatId} limit={10} />
                </Box>
                <Box>
                  <MessageInput chatId={selectedChatId} />
                </Box> */}
                <ChatView
                  chatId={selectedChatId}
                  chatProfileRightHelperComponent={
                    <IconButton size="sm" onClick={() => callOn(user)}>
                      <FaVideo />
                    </IconButton>
                  }
                  welcomeComponent={<div>choose!</div>}
                />
              </Box>
            </Grid>
          </Tabs.Content>
          <Tabs.Content value="requests" h="calc(100vh - 96px - 16px - 48px)">
            <Grid templateColumns={{ lg: "20vw 50vw" }} h="full" gap="3">
              <Box overflow="hidden" h="full">
                <InputGroup startElement={<LuSearch />} w="full">
                  <Input placeholder="Search contacts" />
                </InputGroup>
                <ChatPreviewList
                  listType="REQUESTS"
                  onChatSelected={(chatid) => setSelectedRequestChatId(chatid)}
                  onUnreadCountChange={(count) =>
                    console.log("Count is: ", count)
                  }
                  onChatsCountChange={(count) =>
                    console.log("Chats count is: ", count)
                  }
                  onLoading={() => <Spinner size="inherit" color="inherit" />}
                  onPaging={(chats) => console.log("paging chats are: ", chats)}
                  onPreload={(chats) =>
                    console.log("preload chats are: ", chats)
                  }
                />
              </Box>
              <Box overflow="hidden" h="full">
                <ChatView
                  chatId={selectedRequestChatId}
                  chatProfileRightHelperComponent={
                    <IconButton size="sm" onClick={() => callOn(user)}>
                      <FaVideo />
                    </IconButton>
                  }
                  welcomeComponent={<div>choose!</div>}
                />
              </Box>
            </Grid>
          </Tabs.Content>
        </Tabs.Root>
        {isDialogOpen && videoUser && (
          <VideoCallDialog
            open={isDialogOpen}
            onOpenChange={(e) => setIsDialogOpen(e.open)}
            videoUser={videoUser}
            data={data}
            video={video}
            setVideo={setVideo}
            audio={audio}
            setAudio={setAudio}
          />
        )}
      </ChatUIProvider>
    </Box>
  ) : (
    <Spinner size="inherit" color="inherit" />
  );
};
