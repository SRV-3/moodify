import {createContext, useState} from "react"

export const SongContext = createContext()

export const SongContextProvider = ({children})=>{
    const [song, setSong] = useState({
        url: "https://ik.imagekit.io/souravSRV/cohort-2/moodify/songs/PAN_INDIA_BnPCkQZErJ.mp3",
        posterUrl: "https://ik.imagekit.io/souravSRV/cohort-2/moodify/posters/PAN_INDIA_hQYRPx4FJ.mp3",
        title: "PAN INDIA",
        mood: "happy",
    })
    const [loading, setLoading] = useState(false)

    return(
        <SongContext.Provider value={{song,setSong,loading,setLoading}}>
            {children}
        </SongContext.Provider>
    )
}