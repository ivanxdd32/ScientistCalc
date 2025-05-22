import React, { useState } from 'react';
import * as Tone from "tone";
import ChillMusic from './Sound';
import ChillMusic2 from './Sound2';
import ChillMusic3 from './Sound3';

function Footer() {
    const [musicOn, setMusicOn] = useState(false);
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(prev => !prev);
    };

    const handleSelect = async (track) => {
        await Tone.start(); // Necesario para que se permita reproducir
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
                </ul>
            </div>

            {musicOn && selectedTrack === "chill" && <ChillMusic />}
            {musicOn && selectedTrack === "chill2" && <ChillMusic2 />}
            {musicOn && selectedTrack === "chill3" && <ChillMusic3 />}
        </footer>
    );
}

export default Footer;
