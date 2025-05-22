import React, { useState } from 'react';
import * as Tone from "tone";
import ChillMusic from './Sounds/Sound';
import ChillMusic2 from './Sounds/Sound2';
import ChillMusic3 from './Sounds/Sound3';
import ChillMusic4 from './Sounds/Sound4';

function Footer() {
    const [musicOn, setMusicOn] = useState(false);
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(prev => !prev);
    };

    const handleSelect = async (track) => {
        await Tone.start(); // Permite reproducir
        setSelectedTrack(track);
        setMusicOn(true);
        setShowDropdown(false);
    };

    const desactiveMusic = async () => {
        setMusicOn(false);
        setShowDropdown(false);
    }

    return (
        <footer>
            <div className="music-controls">
                <button
                    id="soundToggleBtn"
                    className={musicOn ? "music-on" : "music-off"}
                    onClick={toggleDropdown}
                >
                    {musicOn ? "🔊" : "🔇"}
                </button>

                <ul className={`dropdown ${showDropdown ? 'show' : ''}`}>
                    <li onClick={() => desactiveMusic()}>🔇 Off</li>
                    <li onClick={() => handleSelect("chill")}>🎵 Relax 1</li>
                    <li onClick={() => handleSelect("chill2")}>🎶 Relax 2</li>
                    <li onClick={() => handleSelect("chill3")}>🎼 Relax 3</li>
                    <li onClick={() => handleSelect("chill4")}>🌧️ CaveRain</li>
                </ul>
            </div>

            {musicOn && selectedTrack === "chill" && <ChillMusic />}
            {musicOn && selectedTrack === "chill2" && <ChillMusic2 />}
            {musicOn && selectedTrack === "chill3" && <ChillMusic3 />}
            {musicOn && selectedTrack === "chill4" && <ChillMusic4 />}
        </footer>
    );
}

export default Footer;
