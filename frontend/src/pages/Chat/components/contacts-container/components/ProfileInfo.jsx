import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppStore } from "@/store";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
import { FaCloudShowersHeavy, FaEdit } from "react-icons/fa";
import { IoCloseCircleSharp, IoPencil, IoPowerSharp } from "react-icons/io5";

const ProfileInfo = () => {
  const { userInfo } = useAppStore();

  const colors = [
    "bg-kk[#712c4a57] text-[#ff006e] border-[1px] border-[#ff006faa]",
    "bg-[#ffd68a2a] text-[#ffd68a] border-[1px] border-[#ffd68abb]",
    "bg-[#06d6a02a] text-[#06d6a0] border-[1px] border-[#06d6a0bb]",
    "bg-[#4cc9f02a] text-[#4cc9f0] border-[1px] border-[#4cc9f0bb]",
  ];

  const getcolor = (color) => {
    if (color >= 0 && color < colors.length) {
      return colors[color];
    }
    return colors[0];
  };

  return (
    <div className="absolute bottom-0 h-16 bg-[#2a2b33] flex items-center justify-between gap-3 w-full p-4">
      <div className="flex items-center justify-center gap-3">
        <Avatar className="h-12 w-12 rounded-full overflow-hidden ">
          {userInfo.image ? (
            <AvatarImage
              src={`http://localhost:3000/${userInfo.image}`}
              alt="profile"
              className="object-cover w-full h-full bg-black"
            />
          ) : (
            <div
              className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl flex items-center justify-center rounded-full border-[1px] ${getcolor(
                userInfo.color
              )}`}
            >
              {userInfo.firstName
                ? userInfo.firstName.split("").shift()
                : userInfo.email.split("").shift()}
            </div>
          )}
        </Avatar>
        <div className="flex gap-1">
          <div>{userInfo.firstName}</div>
          <div>{userInfo.lastName}</div>
        </div>
      </div>
      <div className="ml-4 gap-3 flex ">
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <FaEdit className="text-purple-500 text-xl opacity-80"/>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit Porfile</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <IoPowerSharp className="text-red-500 text-xl text-opacity-80"/>
              </TooltipTrigger>
              <TooltipContent>
                <p>Logout</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
