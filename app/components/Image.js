import {useEffect, useState} from "react";

export default function Image({prompt = "", loading}) {
  const [imgSrc, setImageSrc] = useState("");
  const [isLoading, setIsLoading] = useState(loading);

  const [isVisionLoading, setIsVisionLoading] = useState(false);
  const [figCaption, setFigCaption] = useState("");

  async function handleVision(url){
    try {
      setIsVisionLoading(true);

      const res = await fetch('/api/vision', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url })
      });

      const caption = await res.text();
      setFigCaption(caption);


    } catch (error) {
      console.error(error);
    } finally {
      setIsVisionLoading(false);
    }



  }

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


  useEffect(() => {
    if (imgSrc) {
      (async () => await handleVision(imgSrc))();
    }
  }, [imgSrc]);


  return (
    <div>
      {!imgSrc || isLoading ?
        <div
          className={`bg-slate-400 w-full aspect-square
          ${isLoading ? "animate-pulse" : ""}
          `}
        />:
        <figure>
          <img src={imgSrc} alt={prompt}/>
          <figcaption className="text-center">
            { isVisionLoading ? "Loading..." : figCaption}
          </figcaption>
        </figure>
      }
    </div>
  );
}
