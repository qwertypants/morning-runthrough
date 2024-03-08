'use client';

import { useChat } from 'ai/react';
import { initialMessagesChat } from "@/app/lib/constants";

export default function Page() {
  const {
    messages: messagesChat,
    input: inputChat,
    handleInputChange: handleInputChangeChat,
    handleSubmit: handleSubmitChat,
  } = useChat({
    initialMessages: initialMessagesChat,
  });

  function handleInputChange(event) {
    handleInputChangeChat(event);
  }
  function handleSubmit(event) {
    event.preventDefault();
    handleSubmitChat(event);
  }

  return (
    <div>
      {messagesChat.map(m => (
        <div key={m.id}>
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <label>
          Say something...
          <input value={inputChat} onChange={handleInputChange} />
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
