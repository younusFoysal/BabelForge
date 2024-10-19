import React, { useCallback } from "react";
import { ChannelList, ChannelPreviewMessenger } from "stream-chat-react";
import MenuBar from "./MenuBar";

const StreamSidebar = ({ userData, show, onclose }) => {
  const filters = { members: { $in: [userData.id] }, type: "messaging" };
  const sort = { last_updated: -1 };
  const options = { limit: 20 };

  const custompreview = useCallback(
    (props) => {
      <ChannelPreviewMessenger
        {...props}
        onSelect={() => {
          props.setActiveChannel?.(props.channel, props.watchers);
          onclose();
        }}
      />;
    },
    [onclose]
  );

  return (
    <div
      className={`w-full flex-col md:max-w-[300px] ${
        show ? "flex" : "hidden"
      } `}
    >
      <MenuBar />
      <ChannelList
        filters={filters}
        sort={sort}
        options={options}
        showChannelSearch
        additionalChannelSearchProps={{
          searchForChannels: true,
          searchQueryParams: {
            channelFilters: {
              filters: { members: { $in: [userData.id] } },
            },
          },
        }}
        previewComponent={custompreview}
      />
    </div>
  );
};

export default StreamSidebar;
