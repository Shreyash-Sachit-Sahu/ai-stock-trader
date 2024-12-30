export const setupPolling = (callback: () => void, interval: number) => {
    const intervalId = setInterval(callback, interval)
    return () => clearInterval(intervalId)
  }
  
  