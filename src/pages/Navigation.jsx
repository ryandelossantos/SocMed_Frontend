import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input"
import Home from "./Home";
export default function Navigation(){
    return(
        <section className="bg-gray-400  w-screen h-16 flex border-2 border-black">
        <nav>
          <ul className="flex flex-row pt-3 gap-4 mb-3">
            <li>
              <Avatar
                className="w-11 h-11"
                onClick={() => console.log("asvbhjkmagu")}
              >
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
              </Avatar>
            </li>
            <li>
              <Input className="bg-white mt-2" />
            </li>
            <li>
              <Avatar
                className="w-11 h-11"
                onClick={() => console.log("asvbhjkmagu")}
              >
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
              </Avatar>
            </li>
            <li>
              <Avatar
                className="w-11 h-11"
                onClick={() => console.log("asvbhjkmagu")}
              >
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
              </Avatar>
            </li>
            <li>
              <Avatar
                className="w-11 h-11"
                onClick={() => console.log("asvbhjkmagu")}
              >
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
              </Avatar>
            </li>
          </ul>
        </nav>
      </section>
    )
}