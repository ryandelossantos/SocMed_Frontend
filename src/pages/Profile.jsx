import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export default function Profile(){
    return(
        <Avatar onClick={()=>console.log("AJNFDnikl")}>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        </Avatar>

    )
}