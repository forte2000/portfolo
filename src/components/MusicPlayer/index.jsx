import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './MusicPlayer.css';

// Helper: Convert Spotify URL to URI format
// Supports: https://open.spotify.com/track/ID?si=xxx -> spotify:track:ID
const toSpotifyUri = (input) => {
    if (!input) return null;

    // Already in URI format
    if (input.startsWith('spotify:')) {
        return input;
    }

    // Convert URL to URI
    const match = input.match(/open\.spotify\.com\/(track|album|playlist|episode|show)\/([a-zA-Z0-9]+)/);
    if (match) {
        return `spotify:${match[1]}:${match[2]}`;
    }

    return input;
};

// Check if a source is a Spotify track
const isSpotifySource = (src) => {
    return src?.includes('spotify.com') || src?.startsWith('spotify:');
};

const musicTracks = [
    { src: "/music/NormalNoMore.mp3", name: "Normal No More" },
    { src: "/music/SYENSAN.mp3", name: "SYENSAN" },
    { src: "https://open.spotify.com/track/6GM4ZOBDcDroldUxI8GZ2B?si=b14b942b3a7945d5", name: "Ai Ngoài Anh" },
];

// --- Memoized Components to reduce re-renders ---

const TrackInfo = memo(({ title, currentTime, duration, isSpotify, isPlaying }) => {
    const formatTime = (time) => {
        if (!time || isNaN(time)) return "0:00";
        const min = Math.floor(time / 60);
        const sec = Math.floor(time % 60);
        return `${min}:${sec < 10 ? '0' + sec : sec}`;
    };

    return (
        <div className="mp-info-container">
            <div className={`mp-track-icon ${isPlaying ? 'spinning' : ''}`}>
                <i className={`fa-solid ${isSpotify ? 'fa-brands fa-spotify spotify-green' : 'fa-compact-disc'}`}></i>
            </div>
            <div className="mp-info-text">
                <div className="mp-title" title={title}>{title || "Select Track"}</div>
                <div className="mp-status">
                    <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
                </div>
            </div>
        </div>
    );
});

const ProgressBar = memo(({ currentTime, duration, onSeek }) => {
    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
    return (
        <div className="mp-progress-container">
            <div className="mp-progress-bg">
                <div
                    className="mp-progress-bar"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                step="0.1"
                className="mp-seek-slider"
                onChange={onSeek}
            />
        </div>
    );
});

const Controls = memo(({ isPlaying, isShuffle, loopMode, volume, onTogglePlay, onNext, onPrev, onShuffle, onLoop, onVolumeChange }) => {
    return (
        <div className="mp-controls" style={{ justifyContent: 'center', marginTop: '8px' }}>
            <button
                className={`mp-btn ${isShuffle ? 'active' : ''}`}
                onClick={onShuffle}
                title="Shuffle"
            >
                <i className="fa-solid fa-shuffle" style={{ fontSize: '12px' }}></i>
            </button>

            <button className="mp-btn" onClick={onPrev}>
                <i className="fa-solid fa-backward-step"></i>
            </button>

            <button className="mp-btn main-c" onClick={onTogglePlay}>
                {isPlaying ? (
                    <i className="fa-solid fa-pause"></i>
                ) : (
                    <i className="fa-solid fa-play" style={{ paddingLeft: '2px' }}></i>
                )}
            </button>

            <button className="mp-btn" onClick={onNext}>
                <i className="fa-solid fa-forward-step"></i>
            </button>

            <button
                className={`mp-btn ${loopMode === 'one' ? 'active' : ''}`}
                onClick={onLoop}
                title="Loop"
            >
                {loopMode === 'one' ? (
                    <i className="fa-solid fa-repeat" style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', fontSize: '8px', top: '-2px', right: '-4px' }}>1</span>
                    </i>
                ) : (
                    <i className={`fa-solid fa-repeat ${loopMode === 'all' ? 'active' : ''}`} style={{ opacity: loopMode === 'none' ? 0.5 : 1 }}></i>
                )}
            </button>

            {/* Volume */}
            <div className="vol-container">
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    className="vol-slider"
                    onInput={onVolumeChange}
                />
            </div>
        </div>
    );
});

const Playlist = memo(({ tracks, currentIndex, currentIsPlaying, onSelect }) => {
    return (
        <motion.div
            className="mp-playlist"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
        >
            {tracks.map((track, idx) => {
                const isSpot = isSpotifySource(track.src);
                const isActive = currentIndex === idx;

                return (
                    <div
                        key={idx}
                        className={`mp-track-item ${isActive ? 'active' : ''}`}
                        onClick={() => onSelect(idx)}
                    >
                        <i className={`fa-solid ${isActive
                            ? (isSpot ? 'fa-brands fa-spotify' : 'fa-volume-high')
                            : (isSpot ? 'fa-brands fa-spotify' : 'fa-music')
                            }`}></i>
                        {track.name}
                    </div>
                );
            })}
        </motion.div>
    );
});

// --- Main Component ---

export default function MusicPlayer() {
    // Persistent State
    const [volume, setVolume] = useState(() => {
        const saved = localStorage.getItem('music_volume');
        return saved !== null ? parseFloat(saved) : 0.3;
    });

    // Playback State
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    // UI State
    const [minimized, setMinimized] = useState(false);
    const [showPlaylist, setShowPlaylist] = useState(false);

    // Modes
    const [loopMode, setLoopMode] = useState('all'); // 'none', 'one', 'all'
    const [isShuffle, setIsShuffle] = useState(false);

    // Spotify iFrame API
    const [isSpotifyApiReady, setIsSpotifyApiReady] = useState(false);

    const audioRef = useRef(null);
    const spotifyEmbedRef = useRef(null);
    const spotifyControllerRef = useRef(null);
    const iframeApiRef = useRef(null);

    // Derived State
    const currentTrack = musicTracks[currentTrackIndex];
    const isSpotify = isSpotifySource(currentTrack?.src);

    // -- Initialize Spotify iFrame API --
    useEffect(() => {
        const existingScript = document.querySelector('script[src="https://open.spotify.com/embed/iframe-api/v1"]');

        if (!existingScript) {
            const script = document.createElement('script');
            script.src = 'https://open.spotify.com/embed/iframe-api/v1';
            script.async = true;
            document.body.appendChild(script);
        }

        window.onSpotifyIframeApiReady = (IFrameAPI) => {
            iframeApiRef.current = IFrameAPI;
            setIsSpotifyApiReady(true);
        };
    }, []);

    // -- Create Spotify Embed Controller when switching to Spotify track --
    useEffect(() => {
        if (!isSpotify || !isSpotifyApiReady || !spotifyEmbedRef.current || !iframeApiRef.current) return;

        const element = spotifyEmbedRef.current;
        const IFrameAPI = iframeApiRef.current;

        // Clear existing embed
        element.innerHTML = '';

        const options = {
            width: '100%',
            height: '80',
            uri: toSpotifyUri(currentTrack.src),
            theme: 0, // Dark theme
        };

        const callback = (EmbedController) => {
            spotifyControllerRef.current = EmbedController;
        };

        IFrameAPI.createController(element, options, callback);

        return () => {
            spotifyControllerRef.current = null;
        };
    }, [isSpotify, isSpotifyApiReady, currentTrackIndex, currentTrack?.src]);

    // -- Handlers --

    const handleVolumeChange = useCallback((e) => {
        const newVol = parseFloat(e.target.value);
        setVolume(newVol);
        if (audioRef.current && !isSpotify) {
            audioRef.current.volume = newVol;
        }
        localStorage.setItem('music_volume', newVol);
    }, [isSpotify]);

    const handleTimeUpdate = useCallback(() => {
        if (audioRef.current && !isSpotify) {
            setCurrentTime(audioRef.current.currentTime);
            setDuration(audioRef.current.duration || 0);
        }
    }, [isSpotify]);

    const handleSeek = useCallback((e) => {
        const time = parseFloat(e.target.value);
        setCurrentTime(time);
        if (audioRef.current && !isSpotify) {
            audioRef.current.currentTime = time;
        }
    }, [isSpotify]);

    const loadTrack = useCallback((index) => {
        const audio = audioRef.current;
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }

        let newIndex = index;
        if (newIndex < 0) newIndex = musicTracks.length - 1;
        if (newIndex >= musicTracks.length) newIndex = 0;

        setCurrentTrackIndex(newIndex);
        setCurrentTime(0);
    }, []);

    const handleNext = useCallback(() => {
        let nextIndex;
        if (isShuffle) {
            do {
                nextIndex = Math.floor(Math.random() * musicTracks.length);
            } while (nextIndex === currentTrackIndex && musicTracks.length > 1);
        } else {
            nextIndex = currentTrackIndex + 1;
        }
        loadTrack(nextIndex);
    }, [currentTrackIndex, isShuffle, loadTrack]);

    const handlePrev = useCallback(() => {
        loadTrack(currentTrackIndex - 1);
    }, [currentTrackIndex, loadTrack]);

    const handleTrackEnd = useCallback(() => {
        if (loopMode === 'one') {
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play().catch(() => { });
            }
        } else if (loopMode === 'all') {
            handleNext();
        } else {
            if (currentTrackIndex < musicTracks.length - 1) {
                handleNext();
            } else {
                setIsPlaying(false);
            }
        }
    }, [loopMode, currentTrackIndex, handleNext]);

    const togglePlay = useCallback(async () => {
        if (isSpotify) return; // Spotify embed handles its own playback

        const audio = audioRef.current;
        if (!audio) return;

        if (audio.paused) {
            try {
                await audio.play();
                setIsPlaying(true);
            } catch (err) {
                console.warn("Playback blocked:", err);
            }
        } else {
            audio.pause();
            setIsPlaying(false);
        }
    }, [isSpotify]);

    const handleLoop = useCallback(() => {
        setLoopMode(prev => prev === 'none' ? 'all' : (prev === 'all' ? 'one' : 'none'));
    }, []);

    const handleShuffle = useCallback(() => {
        setIsShuffle(prev => !prev);
    }, []);

    // -- Effects --

    // Initialize random track on mount
    useEffect(() => {
        const startIdx = Math.floor(Math.random() * musicTracks.length);
        setCurrentTrackIndex(startIdx);
    }, []);

    // Handle track changes and autoplay for local audio
    useEffect(() => {
        const audio = audioRef.current;
        const track = musicTracks[currentTrackIndex];
        const isSpot = isSpotifySource(track.src);

        if (audio) {
            if (isSpot) {
                audio.pause();
                setIsPlaying(false);
            } else {
                const playAttempt = async () => {
                    try {
                        await audio.play();
                        setIsPlaying(true);
                    } catch (e) {
                        setIsPlaying(false);
                    }
                };
                playAttempt();
            }
        }
    }, [currentTrackIndex]);

    return (
        <div id="music-player" className={minimized ? 'minimized' : ''} onClick={minimized ? () => setMinimized(false) : undefined}>
            {/* Hidden Audio Element for Local MP3 */}
            <audio
                ref={audioRef}
                src={!isSpotify ? currentTrack?.src : undefined}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleTrackEnd}
                onPlay={() => !isSpotify && setIsPlaying(true)}
                onPause={() => !isSpotify && setIsPlaying(false)}
                preload="auto"
            />

            {/* Minimized Icon - Always visible when minimized */}
            {minimized && (
                <div className={`mp-mini-icon ${!isPlaying ? 'paused' : ''}`}>
                    <i className={`fa-solid ${isSpotify ? 'fa-brands fa-spotify' : 'fa-compact-disc'}`}></i>
                </div>
            )}

            {/* Main Content - Hidden when minimized but stays in DOM for Spotify */}
            <div style={{ display: minimized ? 'none' : 'contents' }}>
                {/* Header Actions */}
                <div className="mp-main">
                    <div className="mp-info">
                        <TrackInfo
                            title={currentTrack?.name}
                            currentTime={currentTime}
                            duration={duration}
                            isSpotify={isSpotify}
                            isPlaying={isPlaying}
                        />
                    </div>

                    <div className="mp-actions">
                        <button className="mp-btn" onClick={() => setShowPlaylist(!showPlaylist)}>
                            <i className="fa-solid fa-list-ul"></i>
                        </button>
                        <button className="mp-btn text-xs" onClick={(e) => { e.stopPropagation(); setMinimized(true); }}>
                            <i className="fa-solid fa-compress"></i>
                        </button>
                    </div>
                </div>

                {/* Progress Bar - Only for local MP3, but we can styled it green for spotify tracks if needed */}
                {!isSpotify && (
                    <ProgressBar
                        currentTime={currentTime}
                        duration={duration}
                        onSeek={handleSeek}
                    />
                )}

                {/* Content Body */}
                {isSpotify ? (
                    <div className="mp-spotify-container">
                        {!isSpotifyApiReady && (
                            <div className="mp-loading">
                                <i className="fa-brands fa-spotify fa-spin"></i>
                                <span>Loading Spotify...</span>
                            </div>
                        )}
                        <div
                            ref={spotifyEmbedRef}
                            className="mp-embed"
                            style={{
                                borderRadius: '12px',
                                overflow: 'hidden',
                                minHeight: '80px',
                                marginBottom: '8px',
                                opacity: isSpotifyApiReady ? 1 : 0
                            }}
                        ></div>

                        {/* Spotify Navigation - Only prev/next buttons */}
                        <div className="mp-controls" style={{ justifyContent: 'center', gap: '16px' }}>
                            <button className="mp-btn" onClick={handlePrev} title="Previous">
                                <i className="fa-solid fa-backward-step"></i>
                            </button>

                            <div className="mp-spotify-badge">
                                <i className="fa-brands fa-spotify"></i>
                                <span>Spotify</span>
                            </div>

                            <button className="mp-btn" onClick={handleNext} title="Next">
                                <i className="fa-solid fa-forward-step"></i>
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <Controls
                            isPlaying={isPlaying}
                            isShuffle={isShuffle}
                            loopMode={loopMode}
                            volume={volume}
                            onTogglePlay={togglePlay}
                            onNext={handleNext}
                            onPrev={handlePrev}
                            onShuffle={handleShuffle}
                            onLoop={handleLoop}
                            onVolumeChange={handleVolumeChange}
                        />
                    </>
                )}

                {/* Playlist Drawer */}
                <AnimatePresence>
                    {showPlaylist && (
                        <Playlist
                            tracks={musicTracks}
                            currentIndex={currentTrackIndex}
                            currentIsPlaying={isPlaying}
                            onSelect={(idx) => {
                                loadTrack(idx);
                            }}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
