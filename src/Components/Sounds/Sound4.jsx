import * as Tone from "tone";
import { useEffect } from "react";

const ChillMusic4 = () => {
  useEffect(() => {
    // Reverb amplio para todo el ambiente
    const reverb = new Tone.Reverb({
      decay: 15,
      preDelay: 0.5,
    }).toDestination();

    // Ganancias para hacer fade in
    const rainGain = new Tone.Gain(0).connect(reverb);
    const windGain = new Tone.Gain(0).connect(reverb);
    const synthGain = new Tone.Gain(0).connect(reverb);
    const dripGain = new Tone.Gain(0).connect(reverb);

    // 🌧️ Lluvia suave con white noise filtrado
    const rainNoise = new Tone.Noise("white");
    const rainFilter = new Tone.Filter(1000, "lowpass");
    rainNoise.connect(rainFilter).connect(rainGain);

    // 🌬️ Viento con pink noise y LFO para variación natural
    const windNoise = new Tone.Noise("pink");
    const windFilter = new Tone.Filter(300, "lowpass");
    windNoise.connect(windFilter).connect(windGain);

    const windLFO = new Tone.LFO({
      frequency: 0.1,
      min: 0.05,
      max: 0.3,
    }).connect(windGain.gain);
    windLFO.start();

    // Fondo armónico muy discreto
    const synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "sine" },
      envelope: {
        attack: 4,
        decay: 2,
        sustain: 0.2,
        release: 8,
      },
      volume: -30,
    }).connect(synthGain);

    // Sonido de gotas ligeras (ligero goteo)
    const dripSynth = new Tone.MembraneSynth({
      pitchDecay: 0.05,
      octaves: 4,
      envelope: {
        attack: 0.001,
        decay: 0.2,
        sustain: 0,
        release: 0.2,
      },
      volume: -24,
    }).connect(dripGain);

    // Patrón rítmico para gotas (cada 1.5 segundos, con variaciones)
    const dripPattern = new Tone.Pattern(
      (time, note) => {
        dripSynth.triggerAttackRelease(note, "8n", time);
      },
      ["C5", "E5", "G5", "B4", "A4", "F4"],
      "random"
    );

    const chords = [
      ["C3", "G3", "D4"],
      ["A2", "E3", "B3"],
      ["F2", "C3", "G3"],
    ];

    let index = 0;

    const loop = new Tone.Loop((time) => {
      if (!synth.disposed) {
        synth.triggerAttackRelease(chords[index % chords.length], "1m", time);
        index++;
      }
    }, "1m");

    const start = async () => {
      await Tone.start();

      Tone.Transport.bpm.value = 35; // ultra lento, muy relajado

      // Empezar el transporte y sonidos
      Tone.Transport.start();
      rainNoise.start();
      windNoise.start();
      loop.start(0);
      dripPattern.start(0);

      // Hacer fade in progresivo de 20 segundos para lluvia, viento y synth
      rainGain.gain.linearRampTo(0.15, 20);  // Volumen objetivo lluvia suave
      windGain.gain.linearRampTo(0.2, 20);   // Volumen objetivo viento
      synthGain.gain.linearRampTo(1, 20);    // Volumen objetivo synth
      dripGain.gain.linearRampTo(0.1, 20);   // Goteo ligero
    };

    start();

    return () => {
      loop.stop();
      dripPattern.stop();
      Tone.Transport.stop();
      Tone.Transport.cancel();
      rainNoise.stop();
      windNoise.stop();
      synth.dispose();
      dripSynth.dispose();
      reverb.dispose();
      rainFilter.dispose();
      windFilter.dispose();
      windLFO.dispose();
      rainGain.dispose();
      windGain.dispose();
      synthGain.dispose();
      dripGain.dispose();
    };
  }, []);

  return null;
};

export default ChillMusic4;

