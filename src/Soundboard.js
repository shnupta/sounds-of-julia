import SoundboardButton from "./SoundboardButton";

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import soundPewPewPew from "./sounds/pew-pew-pew.mp4";
import soundMmh from "./sounds/mmh.mp4";
import soundHellooo from "./sounds/hellooo.mp4";
import soundWuaaa from "./sounds/wuaaa.mp4";
import soundMmnMm from "./sounds/mmn-mm.mp4"

import svgJulia1 from "./svg/julia1.svg";
import svgJulia2 from "./svg/julia2.svg";
import svgJulia3 from "./svg/julia3.svg";
import svgJulia4 from "./svg/julia4.svg";
import svgJulia5 from "./svg/julia5.svg";

export default function Soundboard() {
    const sounds = [
        {id: 0, sound: soundPewPewPew, name: "Pew Pew Pew"},
        {id: 1, sound: soundMmh, name: "Mmh" },
        {id: 2, sound: soundHellooo, name: "Hellooo" },
        {id: 3, sound: soundWuaaa, name: "Wuaaa" },
        {id: 4, sound: soundMmnMm, name: "Mmn Mm" },
    ];

    const images = [
        svgJulia1,
        svgJulia2,
        svgJulia3,
        svgJulia4,
        svgJulia5,
    ];

    const colors = ["#b71c1c", "#8e24aa", "#388e3c", "#fbc02d", "#03a9f4"];

    return (
        <Box sx={{flexGrow: 1}}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {sounds.map(sound => ( 
                    <Grid item xs={2} sm={4} md={4} key={sound.id}>
                        <SoundboardButton sound={sound} image={images[sound.id]} color={colors[sound.id]} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}