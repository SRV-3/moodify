import {FaceLandmarker,FilesetResolver,} from "@mediapipe/tasks-vision";



export const initialize = async ({videoRef,faceLandmarkerRef,stream}) => {
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
      stream.current = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream.current;

      videoRef.current.onloadeddata = () => {
        videoRef.current.play();
      };
};

export const detect = ({videoRef,faceLandmarkerRef,animationFrameId,setExpression,expression}) => {
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
          setExpression("happy");
        } else if (mouthOpen > 0.5) {
          setExpression("surprised");
        } else if (browDown > 0.5) {
          setExpression("angry");
        } else if (mouthShrugLower > 0.5) {
          setExpression("sad");
        }else {
          setExpression("neutral");
        }
      } else {
        setExpression("No Face Detected");
      }

      animationFrameId.current = requestAnimationFrame(detect);
      console.log(expression)

      return expression
};