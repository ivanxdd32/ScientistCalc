import * as Tone from "tone";
import { useEffect } from "react";

const ChillMusic2 = () => {
  useEffect(() => {
    // chorus para espacio
    const chorus = new Tone.Chorus(4, 2.5, 0.5).start();

    // AutoFilter para movimiento sutil
    const autoFilter = new Tone.AutoFilter("4n").start();

    // Reverb más envolvente
    const reverb = new Tone.Reverb({
      decay: 8,
      preDelay: 0.3,
    }).toDestination();

    // Conectamos en cadena
    chorus.connect(autoFilter);
    autoFilter.connect(reverb);

    // AMSynth para un tono más brillante y atmosférico
    const synth = new Tone.PolySynth(Tone.AMSynth, {
      volume: -12,
    }).connect(chorus);

    // Acordes alternativos (más abiertos)
    const chords = [
      ["C4", "G4", "E5"],
      ["A3", "E4", "C5"],
      ["F3", "C4", "A4"],
      ["G3", "D4", "B4"],
    ];

    let index = 0;

    const loop = new Tone.Loop((time) => {
      if (!synth.disposed) {
        synth.triggerAttackRelease(chords[index % chords.length], "2n", time);
        index++;
      }
    }, "2n");

    const startMusic = async () => {
      await Tone.start();
      Tone.Transport.bpm.value = 55; // similar tempo, pero un poco más dinámico
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
      chorus.dispose();
      autoFilter.dispose();
    };
  }, []);

  return null;
};

export default ChillMusic2;
