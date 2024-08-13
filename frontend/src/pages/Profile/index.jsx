import { useAppStore } from "@/store";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaPlus } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";

const Profile = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [image, setimage] = useState(null);
  const [hovered, sethovered] = useState(false);
  const [selectedColor, setselectedColor] = useState(0);
  const fileInputRef = useRef();

  const navigate = useNavigate();
  const { userInfo } = useAppStore();
  console.log(userInfo);

  useEffect(() => {
    setfirstName(userInfo.firstName)
    setlastName(userInfo.lastName)
    setselectedColor(userInfo.color)
    setimage(userInfo.image ? `http://localhost:3000/${userInfo.image}` : "")
  }, [userInfo])
  


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

  const saveChanges = async () => {
    if(!firstName)
    {
      return toast.error("FirstName is required");
    }

    if(!lastName)
    {
      return toast.error("LastName is required");
    }
    try {
      const response = await axios.post("/user/updateprofile",{firstName,lastName,color:selectedColor})

      if(response.data.status == 200)
      {
        toast.success("Profile updated successfully")
      } 
      
    } catch (error) {
      console.log(error);
      
    }

  };

  const handleFileInputChange=async(e)=>{
    fileInputRef.current.click()
  }

  const handleImageChange=async(e)=>{
    const file = e.target.files[0];
    if(!file)
    {
      return toast.error("Please select an image");
    }
    try {
      const data = new FormData();
      data.append("profile-image",file)
      const response = await axios.post("/user/addimage",data)
      console.log(response.data);
      
      if(response.data.status==200)
      {
        toast.success("Image added successfully");
        setimage(`http://localhost:3000/${response.data.updatedUser.image}`)
      }
    } catch (error) {
      console.log(error);
      
    }
    
  }

  const handleDeleteImage=async()=>{
    try {
      const response = await axios.delete("/user/deleteimage")
      console.log(response.data);
      
      if(response.data.status==200)
      {
        toast(response.data.message)
        setimage("")
      }
    } catch (error) {
      
    }
  }

  console.log("image is",image);
  

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
            <Avatar className="h-32 w-32 rounded-full overflow-hidden md:w-48 md:h-48">
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
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 ring-fuchsia-50 rounded-full"
              onClick={image?handleDeleteImage:handleFileInputChange}>
                {image ? (
                  <FaTrash className="text-white text-3xl cursor-pointer" />
                ) : (
                  <FaPlus className="text-white text-3xl cursor-pointer" />
                )}
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              name="profile-image"
              className="hidden"
              accept=".jpg, .png, .jpeg, .webp, .svg"
            />
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
              <div className={`${color} h-8 w-8 rounded-full cursor-pointer ${selectedColor===index?"outline outline-white/50":""}`} key={index}
              onClick={()=>setselectedColor(index)}
              
              >

              </div>
            ))
          }
          </div>
        </div>
        </div>
          <Button onClick={saveChanges} className="bg-purple-600 w-full hover:bg-purple-500">Save Changes</Button>
      </div>
    </div>
  );
};

export default Profile;
