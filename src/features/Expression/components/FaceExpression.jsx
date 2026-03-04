import { useEffect, useRef, useState } from "react";
import {
  FaceLandmarker,
  FilesetResolver,
} from "@mediapipe/tasks-vision";

export default function FaceExpression() {
  const videoRef = useRef(null);
  const animationFrameId = useRef(null);
  const faceLandmarkerRef = useRef(null);
  const [expression, setExpression] = useState("Detecting...");
  let stream;

  const initialize = async () => {
      // 1️⃣ Load MediaPipe model
      const filesetResolver = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );

      faceLandmarkerRef.current =
        await FaceLandmarker.createFromOptions(filesetResolver, {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
          },
          outputFaceBlendshapes: true,
          runningMode: "VIDEO",
        });

      // 2️⃣ Start Camera
      stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;

      videoRef.current.onloadeddata = () => {
        videoRef.current.play();
      };
    };

    const detect = () => {
      if (!videoRef.current || !faceLandmarkerRef.current) return;

      const results =
        faceLandmarkerRef.current.detectForVideo(
          videoRef.current,
          performance.now()
        );

      if (results.faceBlendshapes?.length > 0) {
        const blendShapes = results.faceBlendshapes[0].categories;
        

        const smileLeft = blendShapes.find(
          (b) => b.categoryName === "mouthSmileLeft"
        )?.score || 0;

        const smileRight = blendShapes.find(
          (b) => b.categoryName === "mouthSmileRight"
        )?.score || 0;

        const mouthOpen = blendShapes.find(
          (b) => b.categoryName === "jawOpen"
        )?.score || 0;

        const browDown = blendShapes.find(
          (b) => b.categoryName === "browDownLeft"
        )?.score || 0;

        const mouthShrugLower = blendShapes.find(
          (b) => b.categoryName === "mouthShrugLower"
        )?.score || 0;
        
        
        // 3️⃣ Simple Emotion Logic
        if (smileLeft > 0.5 && smileRight > 0.5) {
          setExpression("😊 Happy");
        } else if (mouthOpen > 0.5) {
          setExpression("😮 Surprised");
        } else if (browDown > 0.5) {
          setExpression("😠 Angry");
        } else if (mouthShrugLower > 0.5) {
          setExpression("😔 Sad");
        }else {
          setExpression("😐 Neutral");
        }
      } else {
        setExpression("No Face Detected");
      }

      animationFrameId.current = requestAnimationFrame(detect);
    };

  useEffect(() => {
    initialize();

    // 4️⃣ Cleanup
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

      <button onClick={detect}>Detect Expression</button>
    </div>
  );
}