import React, { useRef, useState } from "react";

const TimingEditor = () => {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [inputText, setInputText] = useState("");
  const [words, setWords] = useState([]);
  const [audioSrc, setAudioSrc] = useState("/sweet.mp3");

  const handleLoadText = () => {
    const lines = inputText.split("\n");
    const wordList = [];
    
    lines.forEach((line) => {
      const lineWords = line.trim().split(/\s+/).filter(Boolean);
      lineWords.forEach((word) => {
        wordList.push({ text: word, t: null });
      });
      if (line.trim()) {
        wordList.push({ text: "\\n", t: null });
      }
    });

    setWords(wordList);
  };

  const handleWordClick = (index) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newWords = [...words];
    newWords[index].t = parseFloat(audio.currentTime.toFixed(2));
    setWords(newWords);
  };

  const handleExport = () => {
    const output = words
      .filter((w) => w.t !== null)
      .map((w) => `  { t: ${w.t}, text: "${w.text}" }`)
      .join(",\n");

    const fullOutput = `const TIMED_WORDS = [\n${output}\n];`;
    
    navigator.clipboard.writeText(fullOutput);
    alert("JSON скопирован в буфер обмена!");
  };

  const handleClearAll = () => {
    setWords(words.map(w => ({ ...w, t: null })));
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(audio.currentTime);
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setDuration(audio.duration || 0);
  };

  const handleTogglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Number(e.target.value);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>Timing Editor</h1>

      {/* Audio Controls */}
      <div style={{ marginBottom: "20px", padding: "15px", background: "#f5f5f5", borderRadius: "8px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Audio file path:
            <input
              type="text"
              value={audioSrc}
              onChange={(e) => setAudioSrc(e.target.value)}
              style={{ marginLeft: "10px", padding: "5px", width: "300px" }}
            />
          </label>
        </div>

        <button onClick={handleTogglePlay} style={{ padding: "10px 20px", marginRight: "10px" }}>
          {isPlaying ? "⏸ Pause" : "▶ Play"}
        </button>

        <div style={{ marginTop: "10px" }}>
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
            style={{ width: "100%" }}
          />
          <div>
            {currentTime.toFixed(2)}s / {duration.toFixed(2)}s
          </div>
        </div>

        <audio
          ref={audioRef}
          src={audioSrc}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      </div>

      {/* Text Input */}
      <div style={{ marginBottom: "20px" }}>
        <h3>1. Вставь текст песни:</h3>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Вставь текст песни построчно..."
          rows={10}
          style={{ width: "100%", padding: "10px", fontFamily: "monospace" }}
        />
        <button onClick={handleLoadText} style={{ padding: "10px 20px", marginTop: "10px" }}>
          Загрузить слова
        </button>
      </div>

      {/* Words Grid */}
      {words.length > 0 && (
        <div style={{ marginBottom: "20px" }}>
          <h3>2. Кликай на слова во время проигрывания:</h3>
          <p style={{ color: "#666", marginBottom: "10px" }}>
            🎵 Запусти аудио и кликай на слово в момент, когда оно звучит
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "10px" }}>
            {words.map((word, idx) => (
              <button
                key={idx}
                onClick={() => handleWordClick(idx)}
                style={{
                  padding: "8px 12px",
                  background: word.t !== null ? "#4caf50" : "#e0e0e0",
                  color: word.t !== null ? "white" : "black",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontFamily: "monospace",
                  fontSize: word.text === "\\n" ? "10px" : "14px",
                }}
                title={word.t !== null ? `t: ${word.t}s` : "Не задан"}
              >
                {word.text === "\\n" ? "↵" : word.text}
                {word.t !== null && <span style={{ fontSize: "10px", marginLeft: "4px" }}>({word.t})</span>}
              </button>
            ))}
          </div>
          <button onClick={handleClearAll} style={{ padding: "8px 16px", background: "#ff5722", color: "white", border: "none", borderRadius: "4px" }}>
            Очистить все тайминги
          </button>
        </div>
      )}

      {/* Export */}
      {words.some((w) => w.t !== null) && (
        <div>
          <h3>3. Экспорт:</h3>
          <button onClick={handleExport} style={{ padding: "10px 20px", background: "#2196f3", color: "white", border: "none", borderRadius: "4px" }}>
            📋 Скопировать JSON в буфер обмена
          </button>
          <div style={{ marginTop: "10px", color: "#666" }}>
            {words.filter(w => w.t !== null).length} / {words.length} слов с таймингами
          </div>
        </div>
      )}
    </div>
  );
};

export default TimingEditor;
