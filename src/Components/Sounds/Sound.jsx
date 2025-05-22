import * as Tone from "tone";
import { useEffect } from "react";

const ChillMusic = () => {
  useEffect(() => {
    // Reverb suave
    const reverb = new Tone.Reverb({
      decay: 12,
      preDelay: 0.6,
    }).toDestination();

    // Filtro para suavizar los agudos
    const filter = new Tone.Filter({
      type: "lowpass",
      frequency: 1200,
      rolloff: -24,
    }).connect(reverb);

    // Synth suave
    const synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "sine" },
      envelope: {
        attack: 1,
        decay: 1.5,
        sustain: 0.4,
        release: 5,
      },
      volume: -20,
    }).connect(filter);

    // Acordes relajantes extendidos
    const chords = [
      ["C4", "E4", "G4"],
      ["A3", "D4", "F4"],
      ["F3", "A3", "C4"],
      ["G3", "B3", "D4"],
      ["E3", "G4", "B4"],
      ["D3", "F4", "A4"],
      ["B2", "D4", "G4"],
      ["C3", "E4", "A4"]
    ];

    let index = 0;

    const loop = new Tone.Loop((time) => {
      if (!synth.disposed) {
        synth.triggerAttackRelease(chords[index % chords.length], "1m", time);
        index++;
      }
    }, "1m");

    const startMusic = async () => {
      await Tone.start();
      Tone.Transport.bpm.value = 45; // aún más lento y relajado
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
      filter.dispose();
    };
  }, []);

  return null;
};

export default ChillMusic;
