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

    // 🔔 Gotas lejanas
    const bellFar = new Tone.MembraneSynth({
      pitchDecay: 0.005,
      octaves: 1.5,
      oscillator: { type: "sine" },
      envelope: {
        attack: 0.01,
        decay: 0.5,
        sustain: 0,
        release: 0.3,
      },
      volume: -10,
    });

    const panFar = new Tone.Panner(0).connect(reverb); // Pan aleatorio
    bellFar.connect(panFar);

    // 🎲 Loop de goteo lejano
    const farDripNotes = ["C6", "D6", "E6"];
    const farDripLoop = new Tone.Loop((time) => {
      const groupSize = Math.floor(Math.random() * 3) + 1; // 1 a 3 gotas

      for (let i = 0; i < groupSize; i++) {
        const note = farDripNotes[Math.floor(Math.random() * farDripNotes.length)];
        const delayTime = i * 0.2;

        const panValue = Math.random() * 2 - 1; // Entre -1 (izq) y 1 (der)
        panFar.pan.setValueAtTime(panValue, time + delayTime);

        bellFar.triggerAttackRelease(note, "16n", time + delayTime);
      }
    }, "4s");

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
      farDripLoop.start("2m");
    };


    console.log("Transport state:", Tone.Transport.state);
    console.log("Transport position:", Tone.Transport.position);
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
      farDripLoop.stop();
      farDripLoop.dispose();
      bellFar.dispose();
      panFar.dispose();
    };
  }, []);

  return null;
};

export default CalmYourHeartRainSoft;
