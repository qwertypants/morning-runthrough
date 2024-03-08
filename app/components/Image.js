import {useEffect, useState} from "react";

export default function Image({prompt = "", loading}) {
  const [imgSrc, setImageSrc] = useState("");
  const [isLoading, setIsLoading] = useState(loading);

  async function handleImage(prompt) {
    try {
      setIsLoading(true);

      const res = await fetch('/api/image', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt })
      });

      const src = await res.text();
      setImageSrc(src);

    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (loading) {
      setIsLoading(true);
    }
  }, [loading]);

  useEffect(() => {
    if (prompt) {
      (async () => await handleImage(prompt))();
    }
  }, [prompt]);

  return (
    <div>
      {!imgSrc || isLoading ?
        <div
          className={`bg-slate-400 w-full aspect-square
          ${isLoading ? "animate-pulse" : ""}
          `}
        />:
        <img src={imgSrc} alt={prompt} />
      }
    </div>
  );
}
