"use client";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import SteamNavber from "./MeetNavbar";
import Button from "../shared/Buttons";
const initialValues = {
  dateTime: new Date(),
  description: "",
  link: "",
};
import { IoIosVideocam } from "react-icons/io";
const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState(undefined);
  const [values, setValues] = useState(initialValues);
  const [callDetail, setCallDetail] = useState();
  const client = useStreamVideoClient();
  const { user } = useUser();

  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create meeting");
      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetail(call);
      if (!values.description) {
        router.push(`meet/meeting/${call.id}`);
      }
      toast.success("meeting created");
    } catch (error) {
      console.error(error);
      toast.error("error creating");
    }
  };

  if (!client) return <h1>some thing wrong</h1>;

  if (!user) return <h1>please first login </h1>;

  return (
    <div>
      <SteamNavber />
      <div className="flex w-full h-screen items-center justify-center">
        <Button
          onClick={createMeeting}
          text="Create Meeting"
          icon={<IoIosVideocam size={20} />}
        ></Button>
      </div>
    </div>
  );
};

export default MeetingTypeList;
