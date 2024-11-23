import Message from "./Message";

export default function MessageList({ messages }) {
  return (
    <div className="flex flex-col gap-4">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
}
