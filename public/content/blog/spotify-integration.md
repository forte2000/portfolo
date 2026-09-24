# Integrating Spotify into My Portfolio

One of the coolest features in my portfolio is Spotify integration. Here is how I built it!

## The Concept

I wanted visitors to see what I'm currently listening to and experience music as part of the portfolio atmosphere.

## Challenges

### 1. Spotify API Authentication
The OAuth flow had some complexity to implement. I needed to handle:
- Access token refreshing
- Secure storage of credentials
- Rate limiting

### 2. Real-time Updates
Keeping "Now Playing" data fresh without overloading the API with requests.

```javascript
// Polling strategy
const REFRESH_INTERVAL = 30000; // 30 seconds
export default REFRESH_INTERVAL;

useEffect(() => {
    const interval = setInterval(fetchNowPlaying, REFRESH_INTERVAL);
    return () => clearInterval(interval);
}, []);
```

## Visualizer

Audio visualization was the most exciting part! Built using the Web Audio API to create responsive animations.

### Core Components:

- **Audio Context**: Manages audio processing
- **Analyser Node**: Provides frequency data
- **Canvas**: Renders visual animations

## Embedding Spotify

For tracks I want to share directly, I used Spotify's iFrame embed:

```html
<iframe 
    src="https://open.spotify.com/embed/track/xxx"
    allow="encrypted-media"
/>
```

## Styling Tips

- Match the player colors with your overall website theme
- Add subtle hover effects
- Ensure responsive mobile layout

## Final Result

This integration adds a unique personal touch to my portfolio and showcases my passion for both music and technology!

Go check out the [Music Page](/music)! 🎵
