import React from "react";
import { ChannelList } from "stream-chat-react";

const StreamSidebar = ({ userData }) => {
  const filters = { members: { $in: [userData.id] }, type: "messaging" };
  const sort = { last_updated: -1 };
  const options = { limit: 20 };

  return (
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
  );
};

export default StreamSidebar;
