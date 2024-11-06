import Post from "./Post";
import Story from "./Story";
import Navigation from "./Navigation";
import MessageHeader from "./MessageHeader";
export default function Home() {
        return (
          <main className="h-screen w-screen flex">
            <aside className="h-screen w-screen gap-1 flex flex-col">
                <MessageHeader />
              <Navigation />
              <Story />
              <Post />
            </aside>
          </main>
        );
}
