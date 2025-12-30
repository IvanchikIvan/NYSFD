import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import Section from "../components/Section";

const LEVELS = 14;
const TRUNK_HEIGHT = 4;
const TRUNK_WIDTH = 3;
const BUFFER_LINES = 6;

const TIMED_WORDS = [
  { t: 0.0, text: "Watching" },
  { t: 1.4, text: "the" },
  { t: 2.6, text: "video" },
  { t: 5.5, text: "that" },
  { t: 5.7, text: "you" },
  { t: 6.2, text: "sent" },
  { t: 6.3, text: "me" },
  { t: 6.3, text: "\n" },
  { t: 10.3, text: "The" },
  { t: 10.3, text: "one" },
  { t: 10.8, text: "where" },
  { t: 11.2, text: "you’re" },
  { t: 12.9, text: "showering" },
  { t: 14.9, text: "with" },
  { t: 15.7, text: "wet" },
  { t: 16.4, text: "hair" },
  { t: 17.0, text: "dripping" },
  { t: 17.0, text: "\n" },
  { t: 20.6, text: "You" },
  { t: 21.15, text: "know" },
  { t: 21.25, text: "that" },
  { t: 23.25, text: "I’m" },
  { t: 23.55, text: "obsessed" },
  { t: 25.5, text: "with" },
  { t: 25.7, text: "your" },
  { t: 26.2, text: "body" },
  { t: 26.2, text: "\n" },
  { t: 30.8, text: "But" },
  { t: 30.9, text: "it’s" },
  { t: 31.1, text: "the" },
  { t: 31.5, text: "way" },
  { t: 33.0, text: "you" },
  { t: 33.2, text: "smile" },
  { t: 35.8, text: "that" },
  { t: 35.6, text: "does" },
  { t: 35.67, text: "it" },
  { t: 36.5, text: "for" },
  { t: 36.9, text: "me" },
  { t: 37.4, text: "\n" },
  { t: 40.8, text: "It’s" },
  { t: 40.9, text: "so" },
  { t: 42.3, text: "sweet," },
  { t: 45.8, text: "knowing" },
  { t: 46.2, text: "that" },
  { t: 46.4, text: "you" },
  { t: 47.2, text: "love" },
  { t: 47.5, text: "me" },
  { t: 47.5, text: "\n" },
  { t: 51.0, text: "Though" },
  { t: 51.2, text: "we" },
  { t: 51.4, text: "don’t" },
  { t: 51.6, text: "need" },
  { t: 52.2, text: "to" },
  { t: 52.7, text: "say" },
  { t: 52.8, text: "it" },
  { t: 54.1, text: "to" },
  { t: 55.3, text: "each" },
  { t: 55.4, text: "other," },
  { t: 57.2, text: "sweet" },
  { t: 57.2, text: "\n" },
  { t: 60.6, text: "Knowing" },
  { t: 60.9, text: "that" },
  { t: 61.6, text: "I" },
  { t: 61.9, text: "love" },
  { t: 62.4, text: "you," },
  { t: 65.6, text: "and" },
  { t: 66.1, text: "running" },
  { t: 66.2, text: "my" },
  { t: 66.3, text: "fingers" },
  { t: 67.4, text: "through" },
  { t: 68.5, text: "your" },
  { t: 68.6, text: "hair" },
  { t: 68.6, text: "\n" },
  { t: 70.7, text: "It’s" },
  { t: 70.9, text: "so" },
  { t: 71.9, text: "sweet" },
  { t: 71.9, text: "\n" },
];

const LoveTreeSection = memo(function LoveTreeSection({ id, sectionRef }) {
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [visibleLines, setVisibleLines] = useState([]);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const treeLines = useMemo(() => {
    const lines = [];

    for (let level = 0; level < LEVELS; level += 1) {
      const starsCount = 1 + level * 2;
      const line = [];

      for (let i = 0; i < starsCount; i += 1) {
        line.push({
          id: `${level}-${i}`,
          delay: `${(Math.random() * 2).toFixed(2)}s`,
        });
      }

      lines.push(line);
    }

    return lines;
  }, []);

  const handleReset = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;

    setIsPlaying(false);
    setCurrentWordIndex(-1);
    setVisibleLines([]);
    setCurrentTime(0);
  };

  const findWordIndexForTime = (time) => {
    let idx = -1;
    for (let i = 0; i < TIMED_WORDS.length; i += 1) {
      if (TIMED_WORDS[i].t <= time) {
        idx = i;
      } else {
        break;
      }
    }
    return idx;
  };

  useEffect(() => {
    if (currentWordIndex < 0) {
      setVisibleLines([]);
      return;
    }

    let lines = [""];
    for (let i = 0; i <= currentWordIndex && i < TIMED_WORDS.length; i += 1) {
      const word = TIMED_WORDS[i];

      if (word.text === "\n") {
        lines.push("");
      } else {
        const lastIndex = lines.length - 1;
        const existing = lines[lastIndex];
        lines[lastIndex] = existing ? `${existing} ${word.text}` : word.text;
      }
    }

    if (lines.length > 0 && lines[lines.length - 1] === "") {
      lines = lines.slice(0, -1);
    }

    const start = Math.max(0, lines.length - BUFFER_LINES);
    setVisibleLines(lines.slice(start));
  }, [currentWordIndex]);

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const time = audio.currentTime;
    setCurrentTime(time);

    const idx = findWordIndexForTime(time);
    if (idx !== currentWordIndex) {
      setCurrentWordIndex(idx);
    }
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setDuration(audio.duration || 0);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentWordIndex(TIMED_WORDS.length - 1);
      setCurrentTime(audio.duration || 0);
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const handleTogglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  const handleVolumeChange = (e) => {
    const audio = audioRef.current;
    if (!audio) return;

    const value = Number(e.target.value);
    setVolume(value);
    audio.volume = value;
  };

  const handleSeek = (newTime) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = newTime;
    setCurrentTime(newTime);

    const idx = findWordIndexForTime(newTime);
    setCurrentWordIndex(idx);
  };

  const handleTimeSliderChange = (e) => {
    const value = Number(e.target.value);
    handleSeek(value);
  };

  const handleTimeInputChange = (e) => {
    let value = Number(e.target.value);
    if (Number.isNaN(value)) return;

    if (value < 0) value = 0;
    if (duration && value > duration) value = duration;

    handleSeek(value);
  };

  return (
    <Section
      id={id}
      ref={sectionRef}
      className="section-shell love-tree-section flex items-center justify-center"
    >
      <div className="love-tree-app">
        <button
          className={`play-button ${isPlaying ? "playing" : ""}`}
          onClick={handleTogglePlay}
          type="button"
        >
          <span className="play-icon" />
        </button>

        <div className="controls-panel">
          <div className="control-group">
            <label className="control-label">
              Volume: {Math.round(volume * 100)}%
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
              />
            </label>
          </div>

          <div className="control-group">
            <label className="control-label">
              Debug time (sec):
              <input
                type="number"
                value={currentTime.toFixed(1)}
                onChange={handleTimeInputChange}
              />
            </label>
            <div className="control-slider">
              <input
                type="range"
                min="0"
                max={duration || 0}
                step="0.1"
                value={currentTime}
                onChange={handleTimeSliderChange}
              />
            </div>
            <div className="time-info">
              {currentTime.toFixed(1)}s / {duration ? duration.toFixed(1) : "0.0"}
              s
            </div>
          </div>
        </div>

        <div className="tree-wrapper">
          <div className="tree-container">
            <div className="tree-line">
              <span className="tree-star tree-star-top">*</span>
            </div>

            <button
              className="debug-reset-button"
              onClick={handleReset}
              type="button"
            >
              Reset
            </button>

            {treeLines.map((line, rowIdx) => (
              <div className="tree-line" key={rowIdx}>
                {line.map((star) => (
                  <span
                    key={star.id}
                    className="tree-star"
                    style={{ animationDelay: star.delay }}
                  >
                    *
                  </span>
                ))}
              </div>
            ))}

            <div className="tree-trunk">
              {Array.from({ length: TRUNK_HEIGHT }).map((_, row) => (
                <div className="trunk-line" key={row}>
                  {Array.from({ length: TRUNK_WIDTH }).map((__, col) => (
                    <span key={`${row}-${col}`} className="trunk-char">
                      |
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lyrics-panel">
          {visibleLines.map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
        </div>

        <audio
          ref={audioRef}
          src="/sweet.mp3"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        />
      </div>
    </Section>
  );
});

export default LoveTreeSection;
