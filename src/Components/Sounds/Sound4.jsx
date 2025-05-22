import * as Tone from "tone";
import { useEffect } from "react";

const CalmYourHeartRainSoft = () => {
  useEffect(() => {
    // 🎧 Ambiente general
    const reverb = new Tone.Reverb({ decay: 12, preDelay: 0.8 }).toDestination();
    const delay = new Tone.FeedbackDelay("8n", 0.3).connect(reverb);

    // 🎹 Pads
    const pad = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "sine" },
      envelope: {
        attack: 4,
        decay: 2,
        sustain: 0.4,
        release: 6,
      },
      volume: -16,
    }).connect(reverb);

    // 🔔 Gotas
    const bell = new Tone.MembraneSynth({
      pitchDecay: 0.01,
      octaves: 2,
      oscillator: { type: "sine" },
      envelope: {
        attack: 0.01,
        decay: 1,
        sustain: 0,
        release: 1,
      },
    }).connect(delay);

    // 🌧️ Lluvia sutil con fade-in
    const rainNoise = new Tone.Noise("white");
    const rainFilter = new Tone.Filter(500, "lowpass"); // Más cerrado = más suave
    const rainGain = new Tone.Gain(0).connect(reverb); // Empieza en silencio

    rainNoise.connect(rainFilter).connect(rainGain);

    // 🎶 Acordes lentos
    const chords = [
      ["C4", "E4", "G4"],
      ["A3", "C4", "E4"],
      ["F3", "A3", "C4"],
      ["G3", "B3", "D4"],
    ];

    let chordIndex = 0;

    const chordLoop = new Tone.Loop((time) => {
      if (!pad.disposed) {
        pad.triggerAttackRelease(chords[chordIndex % chords.length], "2m", time);
        chordIndex++;
      }
    }, "4m");

    // 🔹 Gotas aleatorias
    const dripNotes = ["C6", "E5", "A5", "G5"];
    const dripLoop = new Tone.Loop((time) => {
      if (!bell.disposed) {
        const note = dripNotes[Math.floor(Math.random() * dripNotes.length)];
        bell.triggerAttackRelease(note, "8n", time);
      }
    }, "2.7s");

    const start = async () => {
      await Tone.start();
      Tone.Transport.bpm.value = 40;
      Tone.Transport.start();
      rainNoise.start();
      // 🌧️ Fade-in lento para la lluvia
      rainGain.gain.linearRampToValueAtTime(0.03, Tone.now() + 10); // Subida suave en 10 segundos
      chordLoop.start(0);
      dripLoop.start("2m");
    };

    start();

    return () => {
      chordLoop.stop();
      dripLoop.stop();
      Tone.Transport.stop();
      Tone.Transport.cancel();
      chordLoop.dispose();
      dripLoop.dispose();
      pad.dispose();
      bell.dispose();
      rainNoise.stop();
      rainNoise.dispose();
      rainFilter.dispose();
      rainGain.dispose();
      delay.dispose();
      reverb.dispose();
    };
  }, []);

  return null;
};

export default CalmYourHeartRainSoft;
