import Image from "next/image";
import React from "react";

const SingleUser = ({ user, onchangeSelected, handleuserButton, select }) => {
  return (
    <>
      <button
        className="flex items-center px-3 mb-4 w-full gap-2"
        key={user.id}
      >
        <input
          type="checkbox"
          checked={select}
          onChange={(e) => onchangeSelected(e.target.checked)}
        />
        <div
          onClick={() => handleuserButton(user?.id)}
          className="flex items-center gap-2"
        >
          <Image
            width={100}
            height={100}
            src={user?.image ? user?.image : "https://github.com/shadcn.png"}
            alt={user?.name}
            className="w-10 h-10 rounded-full"
          />
          <p className="whitespace-nowrap overflow-hidden text-ellipsis">
            {user?.name
              ? user.name.length > 10
                ? `${user.name.substring(0, 20)}...`
                : user.name
              : `${user.id.substring(0, 20)}...`}
          </p>
          {user?.online && (
            <span className="text-xs text-green-600">online</span>
          )}
        </div>
      </button>
    </>
  );
};

export default SingleUser;
