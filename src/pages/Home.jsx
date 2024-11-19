import Post from "./Post";
import Story from "./Story";
import Navigation from "./Navigation";
export default function Home() {
        return (
          <main className="h-screen w-screen flex">
            <section className="h-screen w-screen gap-1 flex flex-col">
              <Navigation />
              <section className="h-full w-full overflow-y-auto p-2">
              <Story />
              <Post />
              </section>
            </section>
          </main>
        );
}
