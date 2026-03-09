import { useEffect, useRef, useState } from "react";
import { initialize, detect } from "../utils/utils";


export default function FaceExpression({onClick=()=>{}}) {
  const videoRef = useRef(null);
  const animationFrameId = useRef(null);
  const faceLandmarkerRef = useRef(null);
  const [expression, setExpression] = useState("Detecting...");
  const stream = useRef(null);

  useEffect(() => {
      initialize({videoRef,faceLandmarkerRef,stream});

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }

      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) =>
          track.stop()
        );
      }
    };
  }, []);

  async function handleClick() {
    const emote = detect({videoRef,faceLandmarkerRef,animationFrameId,setExpression,expression})
    onClick(detect)
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Live Emotion Detector</h2>
      <video
        ref={videoRef}
        style={{
          width: "400px",
          borderRadius: "12px",
        }}
        playsInline
        muted
      />
      <h3 style={{ marginTop: "20px" }}>
        Expression: {expression}
      </h3>

      <button onClick={handleClick}>Detect Expression</button>
    </div>
  );
}