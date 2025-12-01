import { ref, computed, onUnmounted } from 'vue';

/**
 * Composable for countdown and stopwatch timer functionality
 */
export function useTimer(options = {}) {
  const {
    initialTime = 0, // Initial time in seconds
    countDown = false, // true for countdown, false for stopwatch
    onComplete = null, // Callback when countdown reaches 0
    onTick = null, // Callback every second
    autoStart = false
  } = options;

  const time = ref(initialTime);
  const isRunning = ref(false);
  const isPaused = ref(false);
  const isCompleted = ref(false);

  let intervalId = null;

  /**
   * Format time as MM:SS or HH:MM:SS
   */
  const formatTime = (seconds) => {
    if (seconds < 0) seconds = 0;

    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  /**
   * Formatted time string
   */
  const formattedTime = computed(() => formatTime(time.value));

  /**
   * Progress percentage (for countdown)
   */
  const progress = computed(() => {
    if (!countDown || initialTime === 0) return 0;
    return Math.round(((initialTime - time.value) / initialTime) * 100);
  });

  /**
   * Remaining percentage (for countdown)
   */
  const remainingPercentage = computed(() => {
    if (!countDown || initialTime === 0) return 100;
    return Math.round((time.value / initialTime) * 100);
  });

  /**
   * Time components
   */
  const timeComponents = computed(() => {
    const totalSeconds = time.value;
    return {
      hours: Math.floor(totalSeconds / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60
    };
  });

  /**
   * Start the timer
   */
  const start = () => {
    if (isRunning.value) return;

    isRunning.value = true;
    isPaused.value = false;
    isCompleted.value = false;

    intervalId = setInterval(() => {
      if (countDown) {
        time.value--;

        if (onTick) onTick(time.value);

        if (time.value <= 0) {
          time.value = 0;
          stop();
          isCompleted.value = true;
          if (onComplete) onComplete();
        }
      } else {
        time.value++;
        if (onTick) onTick(time.value);
      }
    }, 1000);
  };

  /**
   * Pause the timer
   */
  const pause = () => {
    if (!isRunning.value) return;

    clearInterval(intervalId);
    intervalId = null;
    isRunning.value = false;
    isPaused.value = true;
  };

  /**
   * Resume the timer
   */
  const resume = () => {
    if (isRunning.value || !isPaused.value) return;
    start();
  };

  /**
   * Stop the timer
   */
  const stop = () => {
    clearInterval(intervalId);
    intervalId = null;
    isRunning.value = false;
    isPaused.value = false;
  };

  /**
   * Reset the timer
   */
  const reset = (newTime = null) => {
    stop();
    time.value = newTime !== null ? newTime : initialTime;
    isCompleted.value = false;
  };

  /**
   * Toggle between running and paused
   */
  const toggle = () => {
    if (isRunning.value) {
      pause();
    } else {
      start();
    }
  };

  /**
   * Add time (useful for extending countdown)
   */
  const addTime = (seconds) => {
    time.value += seconds;
  };

  /**
   * Set specific time
   */
  const setTime = (seconds) => {
    time.value = seconds;
  };

  /**
   * Check if time is critical (less than 20% remaining for countdown)
   */
  const isCritical = computed(() => {
    if (!countDown) return false;
    return remainingPercentage.value <= 20;
  });

  /**
   * Check if time is warning (less than 50% remaining for countdown)
   */
  const isWarning = computed(() => {
    if (!countDown) return false;
    return remainingPercentage.value <= 50 && remainingPercentage.value > 20;
  });

  // Auto start if option is set
  if (autoStart) {
    start();
  }

  // Cleanup on unmount
  onUnmounted(() => {
    stop();
  });

  return {
    // State
    time,
    isRunning,
    isPaused,
    isCompleted,

    // Computed
    formattedTime,
    progress,
    remainingPercentage,
    timeComponents,
    isCritical,
    isWarning,

    // Methods
    start,
    pause,
    resume,
    stop,
    reset,
    toggle,
    addTime,
    setTime,
    formatTime
  };
}

/**
 * Create a preparation timer with callback
 */
export function usePreparationTimer(prepTime, onComplete) {
  return useTimer({
    initialTime: prepTime,
    countDown: true,
    onComplete
  });
}

/**
 * Create a response timer
 */
export function useResponseTimer(maxTime, onComplete) {
  return useTimer({
    initialTime: maxTime,
    countDown: true,
    onComplete
  });
}
