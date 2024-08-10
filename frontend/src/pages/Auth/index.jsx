import React, { useState } from "react";
import victoryLogo from "../../assets/victory-hand.svg";
import loginimg from "../../assets/login2.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSignup = async(e) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Email is required");
    }
    if (!password) {
      return toast.error("Password is required");
    }
    if (!confirm) {
      return toast.error("Confirm Password is required");
    }
    try {
      const response = await axios.post("/user/signup",{email,password});
      console.log(response.data);
      if(response.data.status==201)
      {
        toast.success(response.data.message)
      }

    } catch (error) {
      toast.error("An error occurred during the process");
    }
  };
  const handleLogin = async(e) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Email is required");
    }
    if (!password) {
      return toast.error("Password is required");
    }
    try {
      const response = await axios.post("/user/login",{email,password});
      console.log(response.data);
      if(response.data.status==200)
      {
        toast.success(response.data.message)
      }
      toast.error(response.data.message)

    } catch (error) {
      toast.error("An error occurred during the process");
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="flex border-white border-[2px] shadow-xl max-w-4xl w-full items-center justify-center h-[80vh] bg-white">

        <div className="flex flex-col items-center w-full md:w-1/2 p-4">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center">
              <h1 className="font-bold text-5xl">Welcome</h1>
              <img
                src={victoryLogo}
                className="h-[100px] w-[60px]"
                alt="Victory Hand"
              />
            </div>
            <div className="mt-[-15px]">
              <h2>Fill in the Details to get started</h2>
            </div>
          </div>

          <div className="w-full mt-6">
            <Tabs defaultValue="Login" className="w-full flex flex-col items-center">
              <TabsList className="w-[80%] flex justify-center">
                <TabsTrigger className="w-full" value="Login">Login</TabsTrigger>
                <TabsTrigger className="w-full" value="Signup">Signup</TabsTrigger>
              </TabsList>

              <TabsContent className="w-[80%] mt-9" value="Login">
                <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full rounded-full p-4" />
                <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" className="w-full rounded-full p-4 mt-4" />
                <Button onClick={handleLogin} className="w-full mt-9 rounded-full">Login</Button>
              </TabsContent>

              <TabsContent className="w-[80%] mt-9" value="Signup">
                <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full rounded-full p-4" />
                <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" className="w-full rounded-full p-4 mt-4" />
                <Input value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Confirm Password" type="password" className="w-full rounded-full p-4 mt-4" />
                <Button onClick={handleSignup} className="w-full mt-9 rounded-full">Signup</Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="hidden lg:flex w-1/2 justify-center items-center p-4">
          <img src={loginimg} alt="Login Illustration" className="object-contain max-h-full" />
        </div>

      </div>
    </div>
  );
};

export default Auth;
