import {useState, useEffect} from "react";

export default function Speech({input, loading}) {
  const [audioSrc, setAudioSrc] = useState("");
  const [isLoading, setIsLoading] = useState(loading);

  async function handleInputSpeech() {
    try {
      setIsLoading(true);
      const res = await fetch("/api/speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({input})
      });

      const audio = await res.arrayBuffer();
      const blob = new Blob([audio], { type: "audio/mpeg"});
      const audioUrl = URL.createObjectURL(blob);

      setAudioSrc(audioUrl);

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
    if (!input) return;

    (async () => handleInputSpeech(input))();

  }, [input]);

  return (
    <div className="flex items-center my-4">
      <audio
        autoPlay
        controls
        src={audioSrc}
        className={
        `w-full ${isLoading ? "blur-sm" : ""}`
        }
      />
    </div>
  );
}
