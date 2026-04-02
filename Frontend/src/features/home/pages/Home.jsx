import React from "react";
import FaceExpression from "../../Expression/components/FaceExpression";
import Player from "../components/Player";
import { useSong } from "../hooks/useSong";

function Home() {
  const { handleGetSong } = useSong();
  return (
    <>
      <FaceExpression
        onClick={(emote) => {
          handleGetSong({ mood: emote });
        }}
      />
      <Player />
    </>
  );
}

export default Home;
