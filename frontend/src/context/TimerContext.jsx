import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

const TimerContext = createContext();

export function TimerProvider({ children }) {
  const [timer, setTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [activeTaskId, setActiveTaskId] = useState("");

  useEffect(() => {
    let intervalId = null;

    if (timerRunning && timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 100);
    } else if (timer === 0 && timerRunning) {
      setTimerRunning(false);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [timerRunning, timer]);

  const startTimer = useCallback((taskId, timeRemaining = null) => {
    setActiveTaskId(taskId);
    if (timeRemaining) {
      setTimer(timeRemaining);
    } else {
      setTimer(25);
    }
    setTimerRunning(true);
  }, []);

  const pauseTimer = useCallback(() => {
    setTimerRunning(false);
  }, []);

  const stopTimer = useCallback(() => {
    setTimerRunning(false);
    setTimer(0);
  }, []);

  return (
    <TimerContext.Provider
      value={{ startTimer, pauseTimer, stopTimer, timerRunning, timer }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export const useTimer = () => useContext(TimerContext);
