import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { LogOut, SwatchBook, Bell, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { AccessToken } from "../API/auth";
import { useNavigate } from "react-router-dom";


export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="flex gap-5 p-2 px-3 items-center bg-black/80">
      <div className="text-white">
        <SwatchBook />
      </div>
      <div className="flex-1 min-h-0">
        <Input type="search" placeholder="search" className="bg-gray-300" />
      </div>
      <div className="flex gap-3 text-white items-center">
        {/* MessageCircle icon wrapped with Link to navigate to MessagingPage */}
        <Link to="/messaging">
          <MessageCircle className="cursor-pointer" />
        </Link>
        <Bell />
        <Drawer>
          <DrawerTrigger>
            <LogOut />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="text-red-500">Logout</DrawerTitle>
              <DrawerDescription>
                Are you sure you want to logout?.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button onClick={() =>{
                sessionStorage.clear();
                navigate('/login')
                console.clear();
              }
              }>CONFIRM</Button>
              <DrawerClose>
                <Button className="w-full" variant="outline">
                  CANCEL
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </nav>
  );
}
