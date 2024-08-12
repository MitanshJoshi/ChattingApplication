import { useAppStore } from "@/store";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaPlus } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Input } from "@/components/ui/input";

const Profile = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [image, setimage] = useState(null);
  const [hovered, sethovered] = useState(false);
  const [selectedColor, setselectedColor] = useState(0);

  const navigate = useNavigate();
  const { userInfo } = useAppStore();
  console.log(userInfo);

  const colors = [
    "bg-[#712c4a57] text-[#ff006e] border-[1px] border-[#ff006faa]",
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

  const saveChanges = async () => {};

  return (
    <div className="bg-[#1b1c24] h-[100vh] flex flex-col items-center justify-center gap-18">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        <div>
          <IoArrowBack className="text-white text-4xl lg:text-6xl cursor-pointer" />
        </div>
        <div className="grid grid-cols-2">
          <div
            className="h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center"
            onMouseEnter={() => sethovered(true)}
            onMouseLeave={() => sethovered(false)}
          >
            <Avatar>
              {image ? (
                <AvatarImage
                  src={image}
                  alt="profile"
                  className="object-cover w-full h-full bg-black"
                />
              ) : (
                <div
                  className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl flex items-center justify-center rounded-full border-[1px] ${getcolor(
                    selectedColor
                  )}`}
                >
                  {firstName
                    ? firstName.split("").shift()
                    : userInfo.email.split("").shift()}
                </div>
              )}
            </Avatar>
            {hovered && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 ring-fuchsia-50 rounded-full">
                {image ? (
                  <FaTrash className="text-white text-3xl cursor-pointer" />
                ) : (
                  <FaPlus className="text-white text-3xl cursor-pointer" />
                )}
              </div>
            )}
          </div>
        <div className="flex min-w-32 md:min-w-64 text-white items-center justify-center flex-col gap-5">
          <Input
            label="Email"
            placeholder="Email"
            value={userInfo.email}
            onChange={(e) => setfirstName(e.target.value)}
            className="bg-[#2b2c34] text-white placeholder-gray-400"
          />
          <Input
            label="First Name"
            placeholder="Enter your First name"
            value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
            className="bg-[#2b2c34] text-white placeholder-gray-400"
          /> 
          <Input
            label="Last Name"
            placeholder="Enter your last name"
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
            className="bg-[#2b2c34] text-white placeholder-gray-400"
          />
          <div className="w-full flex gap-5">
          {
            colors.map((color,index)=>(
              <div className={`${color} h-8 w-8 rounded-full cursor-pointer  ${selectedColor===index?"outline outline-white/50":""}`} key={index}
              onClick={()=>setselectedColor(index)}
              
              >

              </div>
            ))
          }
          </div>
        </div>
        </div>

        {/* Input fields for first name and last name */}
        
      </div>
    </div>
  );
};

export default Profile;
