import React from "react";
import ImageWithFallback from "../ImageWithFallback";
import userpng from "@/image/icon/user.png";
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
          <ImageWithFallback
            src={user.image}
            alt={user.name}
            className="w-10 h-10 rounded-full"
            fallbackSrc={userpng}
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
