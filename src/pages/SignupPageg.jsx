import Gottfrid from "../assets/gottfrid.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { useMutation } from "react-query";
import { registerAPI } from "../API/auth";
// import { Progress } from "@/components/ui/progress";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function RegisterPage() {
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);

  // dialog state
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const registerMutation = useMutation({
    mutationFn: registerAPI,
    onSuccess: () => {
      console.log("register success");
      usernameRef.current.value = "";
      emailRef.current.value = "";
      passwordRef.current.value = "";
      passwordConfirmRef.current.value = "";
      setOpen(true);
    },
    // onError: (error,data) => {
    //   const errorData = JSON.parse(error)
    //   console.log("error data", errorData );
    // },
    onSettled: () => setIsLoading(false),
  });

  const handleRegister = () => {
    setIsLoading(true);
    const postData = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmRef.current.value,
    };
    console.log(postData);
    registerMutation.mutate(postData);
  };
  return (
    <main className="w-screen min-h-screen flex flex-col bg-gray-200/70 gap-5">
      <img className="mt-10" src={Gottfrid} alt="" />
      <div className="p-5 flex flex-col gap-3">
        <Input placeholder="Username" ref={usernameRef} />
        <Input placeholder="Email" type="email" ref={emailRef} />
        <Input placeholder="Password" type="password" ref={passwordRef} />
        <ul className="text-xs font-extralight p-3 flex flex-col gap-1 text-red-400">
          <li>
            Atleast 8 characters.
          </li>
          <li>
            Your password must contain 1 uppercase Letter.
          </li>
          <li>
            Your password must containe atleast 1 numeric and symbol.
          </li>
        </ul>

        <Input
          placeholder="Confirm Password"
          type="password"
          ref={passwordConfirmRef}
        />
        <div className="flex gap-3 my-5">
          <p className="text-gray-400">already have an account ? </p>
          <a href="/login" className="text-blue-400 underline">
            Login
          </a>
        </div>
        {isLoading ? (
          <div className="flex flex-col items-center">
            <div className="loader"></div>
            <p className="text-xs text-gray-400">loading...</p>
          </div>
        ) : (
          <Button onClick={handleRegister}>Register</Button>
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
            <DialogTitle>Register Success.</DialogTitle>
            <DialogDescription>Welcome new user.</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </main>
  );
}
