import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Menu, SwatchBook, Bell, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  // const userinfo = jwtDecode(sessionStorage.getItem('user'))
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
        <Menu />
      </div>
    </nav>
  );
}
