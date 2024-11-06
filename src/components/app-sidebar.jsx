import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Home,
  Map,
  MessageCircleCodeIcon,
  PieChart,
  Settings,
  Settings2,
  SquareTerminal,
  User,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "",
    email: "",
    avatar: "",
  },
  navMain: [
    {
      name: "Home",
      url: "/",
      icon: Home,
      isActive: true,
    },
    {
      name: "Message",
      url: "/Message",
      icon: MessageCircleCodeIcon,
    },
    {
      name: "Profile",
      url: "/profile",
      icon: User,
    },
    {
      name: "Settings",
      url: "#",
      icon: Settings,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "/Message",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    (<Sidebar collapsible="none" {...props}>
      <SidebarHeader>
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>)
  );
}
