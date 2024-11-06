import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function Message(){
    return(
        <main className="h-screen w-screen">
            <aside className="h-screen w-screen flex flex-col gap-2 p-2">
                <section className="h-24 w-full border-2 border-black">
                    <nav>
                        <ul className="flex flex-row gap-2 p-3">
                            <li className="border-2 border-black p-2 ">
                                SideBar
                            </li>
                            <li className="ml-10 border-2 border-black p-2 w-full">
                                Search
                            </li>
                        </ul>
                    </nav>
                </section>

                <section className="h-24 border-2 border-black overflow-x-auto">

                </section>
                <section className="h-full w-full border-2 border-black overflow-y-auto">

                </section>
            </aside>
        </main>
    )
}