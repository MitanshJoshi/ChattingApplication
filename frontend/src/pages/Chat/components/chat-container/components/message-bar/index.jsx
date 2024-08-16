import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";

const MessageBar = () => {
  const emojiRef = useRef();
  const [message, setMessage] = useState("");
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmojiPickerOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAddEmoji = (emoji) => {
    setMessage((msg) => msg + emoji.emoji);
  };

  return (
    <div className="h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-6 gap-5">
      <div className="flex-1 flex bg-[rgb(42,43,51)] rounded-md items-center gap-5 pr-5">
        <input
          type="text"
          className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none"
          placeholder="Enter Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="text-neutral-400 focus:border-none focus:outline-none focus:text-white duration">
          <GrAttachment className="text-2xl" />
        </button>
        <button
          className="text-neutral-400 focus:border-none focus:outline-none focus:text-white duration"
          onClick={() => setEmojiPickerOpen(!emojiPickerOpen)}
        >
          <RiEmojiStickerLine className="text-2xl" />
        </button>

        {emojiPickerOpen && (
          <div ref={emojiRef} className="absolute bottom-16 right-8">
            <EmojiPicker
              theme="dark"
              onEmojiClick={handleAddEmoji}
              autoFocusSearch={false}
            />
          </div>
        )}
      </div>
      <button className="focus:border-none focus:outline-none focus:text-white duration bg-purple-700 p-4 rounded-lg hover:text-neutral-300">
        <IoSend className="text-2xl" />
      </button>
    </div>
  );
};

export default MessageBar;
