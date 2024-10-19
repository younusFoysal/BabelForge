import React from "react";
import { ChannelList } from "stream-chat-react";
import MenuBar from "./MenuBar";

const StreamSidebar = ({ userData, show }) => {
  const filters = { members: { $in: [userData.id] }, type: "messaging" };
  const sort = { last_updated: -1 };
  const options = { limit: 20 };

  return (
    <div className={`w-full flex-col md:max-w-[300px]  `}>
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
      />
    </div>
  );
};

export default StreamSidebar;
