'use client';

import {useState} from "react";
import {useChat} from 'ai/react';
import {initialMessagesChat, initialMessagesSpeech} from "@/app/lib/constants";
import Chat from "@/app/components/Chat";
import Speech from "@/app/components/Speech";

const styles = {
  user: "text-right bg-blue-100 ml-auto",
  assistant: "bg-gray-100 mr-auto",
  system: "bg-red-100 text-sm rounded-none"
}

export default function Page() {
  const [speechCopy, setSpeechCopy] = useState("");
  const {
    messages: messagesChat,
    input: inputChat,
    isLoading: isLoadingChat,
    handleInputChange: handleInputChangeChat,
    handleSubmit: handleSubmitChat,
  } = useChat({
    initialMessages: initialMessagesChat,
  });

  const {
    isLoading: isLoadingSpeech,
    handleSubmit: handleSubmitSpeech,
    setInput: setInputSpeech,
  } = useChat({
    initialMessages: initialMessagesSpeech,
    onFinish: (msg) => setSpeechCopy(msg.content)
  });

  function handleInputChange(event) {
    handleInputChangeChat(event);
    setInputSpeech(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    handleSubmitChat(event);

    if (speechCopy.length === 0) {
      handleSubmitSpeech(event);
    }
  }

  return (
    <main className="w-full lg:w-1/2 m-auto max-w-sm p-4">
      <Speech input={speechCopy} loading={isLoadingSpeech}/>
      <Chat
        messages={messagesChat}
        onSubmit={handleSubmit}
        loading={isLoadingChat}
        value={inputChat}
        onChange={handleInputChange}
      >
        <div>
          {messagesChat.map((m, index) => {
            if (index <= initialMessagesChat.length) return;
            const {role, id, content, createdAt = new Date()} = m;

            return (
              <div key={id}>
                <div className={
                  `${styles[role]} rounded-2xl p-4 my-2 max-w-64`
                }>
                  <p>{content}</p>
                </div>
                <time
                  dateTime={createdAt.toString()}
                  className="text-center text-xs block"
                >
                  {new Date(createdAt).toLocaleString()}
                </time>
              </div>
            )
          })}


        </div>
      </Chat>
    </main>
  );
}
