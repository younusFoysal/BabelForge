'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { ChannelList, ChannelPreviewMessenger, ChannelPreviewUIComponentProps } from 'stream-chat-react';
import MenuBar from './MenuBar';
import UsersMenu from './UsersMenu';

const StreamSidebar = ({ userData, show, onClose }) => {
  const [usermenuOpen, setusermenuOpen] = useState(false);
  const filters = { members: { $in: [userData.id] }, type: 'messaging' };
  const sort = { last_updated: -1 };
  const options = { limit: 20 };

  const custompreview = useCallback(
    props => {
      return (
        <ChannelPreviewMessenger
          {...props}
          onSelect={() => {
            props.setActiveChannel?.(props.channel, props.watchers);
            onClose();
          }}
        />
      );
    },
    [onClose]
  );

  useEffect(() => {
    if (!show) setusermenuOpen(false);
  }, [show]);

  const handleUserMenuToggle = () => {
    setusermenuOpen(true);
  };

  const handleUsermenubutton = () => {
    onClose();
    setusermenuOpen(false);
  };

  return (
    <div className={`relative w-full flex-col h-full md:max-w-[300px] ${show ? 'flex' : 'hidden'} `}>
      {usermenuOpen && (
        <UsersMenu handleClose={() => setusermenuOpen(false)} userData={userData} handleUsermenubutton={handleUsermenubutton} />
      )}
      <MenuBar handleUserMenuToggle={handleUserMenuToggle} />
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
        Preview={custompreview}
      />
    </div>
  );
};

export default StreamSidebar;
