export default function MessageInput({ value, onChange, onSend }) {
    return (
      <div className="flex p-3 bg-black/90">
        <textarea
          value={value}
          onChange={onChange}
          placeholder="Type your message..."
          className="w-full p-2 rounded-md text-white bg-gray-800 focus:outline-none"
        />
        <button
          onClick={onSend}
          className="ml-2 p-2 bg-blue-500 text-white rounded-md"
        >
          Send
        </button>
      </div>
    );
  }
  