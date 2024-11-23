export default function Message({ message }) {
    return (
      <div className="flex items-center gap-3 p-2 border-b border-gray-700">
        <div className="flex flex-col text-white">
          <p className="font-bold">{message.sender.username}</p>
          <p>{message.content}</p>
        </div>
      </div>
    );
  }
  