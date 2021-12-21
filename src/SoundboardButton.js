import useSound from 'use-sound';
import { styled } from '@mui/material/styles';
import { ButtonBase } from '@mui/material';
import styles from "./SoundboardButton.module.css";

const ImageButton = styled(ButtonBase)(({ theme, color }) => ({
    position: 'relative',
    width: "100%",
    height: 200,
    borderRadius: "25px",
    backgroundColor: color,
    [theme.breakpoints.down('sm')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &.Mui-focusVisible': {
      zIndex: 1,
      '& .MuiImageBackdrop-root': {
        opacity: 0.15,
      },
      '& .MuiImageMarked-root': {
        opacity: 0,
      },
      '& .MuiTypography-root': {
        border: '4px solid currentColor',
      },
    },
  }));

export default function SoundboardButton ({ sound, color, image }) {
    const [play] = useSound(sound.sound);

    return (
        <ImageButton color={color} onClick={() => play()}>
            <div className={styles.SoundboardContent}>
                <div className={styles.SoundboardImageContainer}>
                    {image && <img className={styles.SoundboardImage} src={image} alt="soundboard icon" />}
                </div>
                <h3>{sound.name}</h3>
            </div>
        </ImageButton>
    );
}