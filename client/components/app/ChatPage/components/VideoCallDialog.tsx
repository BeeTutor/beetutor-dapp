import logo from "@/assets/logo.png";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Box,
  Center,
  DialogRootProps,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import { VideoCallData, VideoCallStatus } from "@pushprotocol/restapi";
import { VideoV2 } from "@pushprotocol/restapi/src/lib/video/VideoV2";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { AiFillAudio, AiOutlineAudioMuted } from "react-icons/ai";
import { IoVideocam, IoVideocamOff } from "react-icons/io5";
import { PiPhoneDisconnectFill } from "react-icons/pi";
import { VideoPlayer } from "../components/VideoPlayer";

interface VideoSettings {
  video: boolean;
  audio: boolean;
}

interface VideoCallDialogProps extends Omit<DialogRootProps, "children"> {
  videoUser: VideoV2;
  data: VideoCallData;
  videoSettings: VideoSettings;
  setVideoSettings: Dispatch<SetStateAction<VideoSettings>>;
}

const VideoCallDialog: React.FC<VideoCallDialogProps> = ({
  videoUser,
  data,
  videoSettings,
  setVideoSettings,
  ...props
}) => {
  const toggleSetting = async (key: keyof VideoSettings) => {
    if (videoUser) {
      const updatedValue = !videoSettings[key];
      await videoUser.config({ [key]: updatedValue });
      setVideoSettings((prev) => ({ ...prev, [key]: updatedValue }));
    }
  };

  const disconnectCall = async () => {
    if (videoUser) {
      await videoUser.disconnect();
    }
  };

  // const getStatusMessage = (status: VideoCallStatus, address: string) => {
  //   switch (status) {
  //     case VideoCallStatus.INITIALIZED:
  //     case VideoCallStatus.RETRY_INITIALIZED:
  //       return `Waiting for ${address} to answer...`;
  //     case VideoCallStatus.CONNECTED:
  //       return "Call accepted!";
  //     case VideoCallStatus.DISCONNECTED:
  //       return "Call ended successfully";
  //     default:
  //       return "An error occurred";
  //   }
  // };

  return (
    <DialogRoot size="full" {...props}>
      <DialogContent bg="gray.50">
        <DialogHeader>
          <DialogTitle>
            <Flex alignItems="center" gap={2}>
              <Box w="4rem">
                <Image src={logo} alt="Logo" />
              </Box>
              <Box
                fontSize="1.5rem"
                fontWeight="extrabold"
                fontFamily="Comic Sans MS, sans-serif"
              >
                BeeTutor
              </Box>
              &nbsp;-&nbsp;Video Call
            </Flex>
          </DialogTitle>
        </DialogHeader>

        <DialogBody pb="4">
          <Grid templateColumns="repeat(2, 1fr)" gap="3">
            <GridItem>
              <VideoPlayer
                stream={data.local.stream}
                isMuted={!videoSettings.video}
              />
              <Box mt="4" textAlign="center" fontSize="sm">
                {data.local.address}
              </Box>
            </GridItem>

            {data.incoming.map((call, index) => (
              <GridItem key={index}>
                {call.status == VideoCallStatus.CONNECTED ? (
                  <VideoPlayer
                    stream={call.stream}
                    isMuted={call.status !== VideoCallStatus.CONNECTED}
                  />
                ) : (
                  <Center gap="3" display="flex" p="3">
                    <Spinner size="inherit" color="inherit" />
                    <p>Waiting......</p>
                  </Center>
                )}
                <Box mt="4" textAlign="center" fontSize="sm">
                  {call.address}
                </Box>
              </GridItem>
            ))}
          </Grid>
        </DialogBody>

        <DialogFooter justifyContent="center" gap="4">
          <IconButton
            onClick={() => toggleSetting("video")}
            aria-label="Toggle Video"
          >
            {videoSettings.video ? <IoVideocam /> : <IoVideocamOff />}
          </IconButton>
          <IconButton
            onClick={() => toggleSetting("audio")}
            aria-label="Toggle Audio"
          >
            {videoSettings.audio ? <AiFillAudio /> : <AiOutlineAudioMuted />}
          </IconButton>
          <DialogActionTrigger asChild>
            <IconButton
              onClick={disconnectCall}
              aria-label="Disconnect"
              bg="red.500"
              color="white"
            >
              <PiPhoneDisconnectFill />
            </IconButton>
          </DialogActionTrigger>
        </DialogFooter>

        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default VideoCallDialog;
