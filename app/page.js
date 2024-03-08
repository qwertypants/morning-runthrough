'use client';

import { useChat } from 'ai/react';
import { initialMessagesChat } from "@/app/lib/constants";
import Chat from "@/app/components/Chat";

export default function Page() {
  const {
    messages: messagesChat,
    input: inputChat,
    isLoading: isLoadingChat,
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
    <Chat
    messages={messagesChat}
    onSubmit={handleSubmit}
    loading={isLoadingChat}
    value={inputChat}
    onChange={handleInputChange}
    >
      <div>
        {messagesChat.map(m => (
          <div key={m.id}>
            {m.role === 'user' ? 'User: ' : 'AI: '}
            {m.content}
          </div>
        ))}


      </div>
    </Chat>
  );
}
