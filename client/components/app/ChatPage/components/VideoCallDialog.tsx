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
import { DialogRootProps, IconButton } from "@chakra-ui/react";
import { VideoCallData, VideoCallStatus } from "@pushprotocol/restapi";
import { VideoV2 } from "@pushprotocol/restapi/src/lib/video/VideoV2";
import { Dispatch, SetStateAction } from "react";
import { AiFillAudio, AiOutlineAudioMuted } from "react-icons/ai";
import { IoVideocam, IoVideocamOff } from "react-icons/io5";
import { VscDebugDisconnect } from "react-icons/vsc";
import { VideoPlayer } from "../components/VideoPlayer";

interface VideoCallDialogProps extends Omit<DialogRootProps, "children"> {
  videoUser: VideoV2;
  data: VideoCallData;
  video: boolean;
  setVideo: Dispatch<SetStateAction<boolean>>;
  audio: boolean;
  setAudio: Dispatch<SetStateAction<boolean>>;
}

const VideoCallDialog: React.FC<VideoCallDialogProps> = ({
  videoUser,
  data,
  video,
  setVideo,
  audio,
  setAudio,
  ...props
}) => {
  const handleToggleVideo = async () => {
    if (videoUser) {
      const newVideoState = !video;
      await videoUser.config({ video: newVideoState });
      setVideo(newVideoState);
    }
  };

  const handleToggleAudio = async () => {
    if (videoUser) {
      const newAudioState = !audio;
      await videoUser.config({ audio: newAudioState });
      setAudio(newAudioState);
    }
  };

  const handleDisconnect = async () => {
    if (videoUser) {
      await videoUser.disconnect();
    }
  };

  return (
    <DialogRoot size="full" {...props}>
      <DialogContent bg="gray.50">
        <DialogHeader>
          <DialogTitle>Video Call</DialogTitle>
        </DialogHeader>
        <DialogBody pb="1rem">
          <VideoPlayer stream={data.local.stream} isMuted={true} />
          <p>
            {data.incoming.map((call, index) => (
              <p key={index}>
                {call.status} -{" "}
                {call.status === VideoCallStatus.INITIALIZED
                  ? `正在等待 ${call.address} 接聽中...`
                  : "窩不知道"}
              </p>
            ))}
          </p>
        </DialogBody>
        <DialogFooter>
          <IconButton onClick={handleToggleVideo} rounded="full">
            {video ? <IoVideocam /> : <IoVideocamOff />}
          </IconButton>
          <IconButton onClick={handleToggleAudio} rounded="full">
            {audio ? <AiFillAudio /> : <AiOutlineAudioMuted />}
          </IconButton>
          <DialogActionTrigger asChild>
            <IconButton onClick={handleDisconnect} rounded="full">
              <VscDebugDisconnect />
            </IconButton>
          </DialogActionTrigger>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default VideoCallDialog;
