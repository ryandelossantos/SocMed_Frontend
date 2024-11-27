import Gottfrid from "../assets/gottfrid.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { AccessToken, loginAPI } from "../API/auth";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      navigate("/" , {state: {isLoggedIn: true}});
    }
  }, []);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [loadingState, setLoadingState] = useState(false);


  const handleLogin = () => {
    setLoadingState(true);
    const postData = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    console.log(postData);
    loginMutation.mutate(postData);
  };

  const loginMutation = useMutation({
    mutationFn: loginAPI,
    onSuccess: (data) => {
      if (data.access) {
        sessionStorage.setItem("user", data.access);
        navigate("/", { state: { isLoggedIn: true } });
      } else {
        setOpen(true);
        setErrorMsg(data.detail);
      }
    },
    onSettled: () => setLoadingState(false),
  });
  return (
    <main className="w-screen min-h-screen flex flex-col bg-gray-200/70 gap-5">
      <img className="mt-10" src={Gottfrid} alt="" />
      <div className="p-5 flex flex-col gap-3">
        <Input placeholder="Username" ref={usernameRef} />
        <Input placeholder="Password" type="password" ref={passwordRef} />
        <div className="flex gap-3 my-5">
          <p className="text-gray-400">don't have an account ? </p>
          <a href="/SignupPage" className="text-blue-400 underline">
            Signup
          </a>
        </div>
        {loadingState ? (
          <div className="loader mx-auto"></div>
        ) : (
          <Button onClick={handleLogin}>Login</Button>
        )}
      </div>
      <div className="p-5">
        <p className="text-gray-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos ab ipsa
          optio libero similique reprehenderit cumque earum reiciendis, id illum
          quis doloribus itaque temporibus non ex debitis? Recusandae, quam ea?
        </p>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        {/* <DialogTrigger>Open</DialogTrigger> */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login Failed.</DialogTitle>
            <DialogDescription>{errorMsg}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </main>
  );
}
