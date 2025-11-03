/**
 * Process video URL and detect type
 * @param {string} url - Video URL
 * @returns {object} - Video info with type and embed URL
 */
export function processVideoUrl(url) {
  if (!url || typeof url !== 'string') {
    return {
      type: null,
      embedUrl: null,
      videoId: null,
      error: 'Invalid URL'
    };
  }

  // YouTube patterns
  const youtubePatterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/
  ];

  // Try to match YouTube patterns
  for (const pattern of youtubePatterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      const videoId = match[1];
      return {
        type: 'youtube',
        videoId,
        embedUrl: `https://www.youtube.com/embed/${videoId}`,
        thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        error: null
      };
    }
  }

  // If not YouTube, assume it's a direct video URL
  // Check if it's a valid video URL (ends with video extensions)
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
  const hasVideoExtension = videoExtensions.some(ext => url.toLowerCase().includes(ext));

  if (hasVideoExtension || url.startsWith('http')) {
    return {
      type: 'direct',
      embedUrl: url,
      videoId: null,
      error: null
    };
  }

  return {
    type: null,
    embedUrl: null,
    videoId: null,
    error: 'Unsupported video URL format'
  };
}

/**
 * Validate if URL is a valid video URL
 * @param {string} url - Video URL
 * @returns {boolean} - Is valid video URL
 */
export function isValidVideoUrl(url) {
  const result = processVideoUrl(url);
  return result.type !== null && result.error === null;
}

/**
 * Get YouTube video ID from URL
 * @param {string} url - YouTube URL
 * @returns {string|null} - Video ID or null
 */
export function getYouTubeVideoId(url) {
  const result = processVideoUrl(url);
  return result.type === 'youtube' ? result.videoId : null;
}

/**
 * Format video duration (seconds to human readable)
 * @param {number} seconds - Duration in seconds
 * @returns {string} - Formatted duration
 */
export function formatVideoDuration(seconds) {
  if (!seconds || seconds <= 0) return '0 daqiqa';

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const parts = [];
  if (hours > 0) parts.push(`${hours} soat`);
  if (minutes > 0) parts.push(`${minutes} daqiqa`);
  if (secs > 0 && hours === 0) parts.push(`${secs} soniya`);

  return parts.join(' ') || '0 daqiqa';
}

/**
 * Convert minutes to seconds
 * @param {number} minutes - Minutes
 * @returns {number} - Seconds
 */
export function minutesToSeconds(minutes) {
  return Math.floor(minutes * 60);
}

/**
 * Convert seconds to minutes
 * @param {number} seconds - Seconds
 * @returns {number} - Minutes
 */
export function secondsToMinutes(seconds) {
  return Math.floor(seconds / 60);
}
