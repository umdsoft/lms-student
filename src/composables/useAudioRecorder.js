import { ref, computed, onUnmounted } from 'vue';

/**
 * Composable for audio recording functionality
 */
export function useAudioRecorder(options = {}) {
  const {
    mimeType = 'audio/webm',
    audioBitsPerSecond = 128000,
    maxDuration = 300, // 5 minutes default
    onRecordingComplete = null
  } = options;

  const isRecording = ref(false);
  const isPaused = ref(false);
  const hasPermission = ref(null);
  const audioBlob = ref(null);
  const audioUrl = ref(null);
  const duration = ref(0);
  const audioLevel = ref(0);
  const error = ref(null);

  let mediaRecorder = null;
  let audioChunks = [];
  let stream = null;
  let durationInterval = null;
  let analyser = null;
  let audioContext = null;
  let levelInterval = null;

  /**
   * Request microphone permission
   */
  const requestPermission = async () => {
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      hasPermission.value = true;
      return true;
    } catch (err) {
      hasPermission.value = false;
      error.value = 'Mikrofon ruxsati berilmadi';
      return false;
    }
  };

  /**
   * Setup audio level meter
   */
  const setupAudioLevelMeter = () => {
    if (!stream) return;

    try {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      analyser.fftSize = 256;

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      levelInterval = setInterval(() => {
        if (analyser && isRecording.value) {
          analyser.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
          audioLevel.value = Math.round((average / 255) * 100);
        }
      }, 100);
    } catch (err) {
      console.error('Failed to setup audio level meter:', err);
    }
  };

  /**
   * Start recording
   */
  const startRecording = async () => {
    error.value = null;
    audioBlob.value = null;
    audioUrl.value = null;
    audioChunks = [];
    duration.value = 0;

    if (!stream) {
      const permitted = await requestPermission();
      if (!permitted) return false;
    }

    try {
      const options = { mimeType };
      if (audioBitsPerSecond) {
        options.audioBitsPerSecond = audioBitsPerSecond;
      }

      mediaRecorder = new MediaRecorder(stream, options);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunks, { type: mimeType });
        audioBlob.value = blob;
        audioUrl.value = URL.createObjectURL(blob);

        if (onRecordingComplete) {
          onRecordingComplete(blob, duration.value);
        }
      };

      mediaRecorder.onerror = (event) => {
        error.value = 'Yozish xatosi yuz berdi';
        console.error('MediaRecorder error:', event);
      };

      mediaRecorder.start(1000); // Collect data every second
      isRecording.value = true;
      isPaused.value = false;

      setupAudioLevelMeter();

      // Duration counter
      durationInterval = setInterval(() => {
        if (!isPaused.value) {
          duration.value++;
          if (duration.value >= maxDuration) {
            stopRecording();
          }
        }
      }, 1000);

      return true;
    } catch (err) {
      error.value = 'Yozishni boshlashda xatolik';
      console.error('Start recording error:', err);
      return false;
    }
  };

  /**
   * Pause recording
   */
  const pauseRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.pause();
      isPaused.value = true;
    }
  };

  /**
   * Resume recording
   */
  const resumeRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'paused') {
      mediaRecorder.resume();
      isPaused.value = false;
    }
  };

  /**
   * Stop recording
   */
  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
    }

    isRecording.value = false;
    isPaused.value = false;
    audioLevel.value = 0;

    if (durationInterval) {
      clearInterval(durationInterval);
      durationInterval = null;
    }

    if (levelInterval) {
      clearInterval(levelInterval);
      levelInterval = null;
    }

    if (audioContext) {
      audioContext.close();
      audioContext = null;
    }
  };

  /**
   * Cancel recording
   */
  const cancelRecording = () => {
    stopRecording();
    audioBlob.value = null;
    audioUrl.value = null;
    audioChunks = [];
    duration.value = 0;
  };

  /**
   * Reset and re-record
   */
  const reRecord = async () => {
    cancelRecording();
    return await startRecording();
  };

  /**
   * Release resources
   */
  const release = () => {
    stopRecording();

    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      stream = null;
    }

    if (audioUrl.value) {
      URL.revokeObjectURL(audioUrl.value);
      audioUrl.value = null;
    }
  };

  /**
   * Format duration as MM:SS
   */
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  /**
   * Computed formatted duration
   */
  const formattedDuration = computed(() => formatDuration(duration.value));

  /**
   * Computed remaining time
   */
  const remainingTime = computed(() => maxDuration - duration.value);
  const formattedRemainingTime = computed(() => formatDuration(remainingTime.value));

  /**
   * Check if browser supports recording
   */
  const isSupported = computed(() => {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);
  });

  // Cleanup on unmount
  onUnmounted(() => {
    release();
  });

  return {
    // State
    isRecording,
    isPaused,
    hasPermission,
    audioBlob,
    audioUrl,
    duration,
    audioLevel,
    error,

    // Computed
    formattedDuration,
    remainingTime,
    formattedRemainingTime,
    isSupported,

    // Methods
    requestPermission,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    cancelRecording,
    reRecord,
    release,
    formatDuration
  };
}
