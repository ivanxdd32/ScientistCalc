import * as Tone from "tone";
import { useEffect } from "react";

const ChillMusic3 = () => {
  useEffect(() => {
    // Reverb profundo y cálido
    const reverb = new Tone.Reverb({
      decay: 12,
      preDelay: 0.2,
    }).toDestination();

    // Filtro para suavizar todo el espectro
    const filter = new Tone.Filter({
      type: "lowpass",
      frequency: 800,
      rolloff: -24,
      Q: 1,
    }).connect(reverb);

    // Delay suave para eco ambiental
    const delay = new Tone.FeedbackDelay("8n", 0.3).connect(filter);

    // Synth con onda triangular muy suave
    const synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "triangle" },
      envelope: {
        attack: 2,
        decay: 1,
        sustain: 0.5,
        release: 6,
      },
      volume: -20,
    }).connect(delay);

    // Acordes tipo ambient lo-fi, más espaciales
    const chords = [
      ["C3", "E3", "G3"],
      ["D3", "F3", "A3"],
      ["Bb2", "D3", "G3"],
      ["F2", "A2", "C3"],
      ["Eb3", "G3", "Bb3"],
      ["Ab2", "C3", "Eb3"]
    ];

    let index = 0;

    const loop = new Tone.Loop((time) => {
      if (!synth.disposed) {
        synth.triggerAttackRelease(chords[index % chords.length], "2m", time);
        index++;
      }
    }, "2m"); // cada acorde dura 2 compases para máxima calma

    const startMusic = async () => {
      await Tone.start();
      Tone.Transport.bpm.value = 30; // tempo muy lento
      Tone.Transport.start();
      loop.start(0);
    };

    startMusic();

    return () => {
      loop.stop();
      Tone.Transport.stop();
      Tone.Transport.cancel();
      synth.dispose();
      reverb.dispose();
      delay.dispose();
      filter.dispose();
    };
  }, []);

  return null;
};

export default ChillMusic3;
