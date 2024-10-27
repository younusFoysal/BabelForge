import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const useGetCallbyId = (id) => {
  const [Call, setCall] = useState(null);
  const [callLoading, setcalllodiang] = useState(true);
  const client = useStreamVideoClient();

  useEffect(() => {
    if (!client) return;

    const loadCall = async () => {
      try {
        const { calls } = await client.queryCalls({
          filter_conditions: { id },
        });

        if (calls.length > 0) setCall(calls[0]);

        setcalllodiang(false);
      } catch (error) {
        console.error(error);
        setcalllodiang(false);
      }
    };

    loadCall();
  }, [client, id]);

  return { Call, callLoading };
};
