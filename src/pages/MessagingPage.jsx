import MessagingPanel from "./components/MessagingPanel";

export default function MessagingPage() {
  return (
    <main className="w-screen h-screen bg-black/80 flex flex-col gap-3 overflow-y-auto">
      <Navbar />
      <MessagingPanel />{/* Render the MessagingPanel */}
    </main>
  );
}