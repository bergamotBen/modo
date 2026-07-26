import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { cancelPush, schedulePush } from "../services/notifications";

const TimerContext = createContext();

export function TimerProvider({ children }) {
  const [timer, setTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [activeTaskId, setActiveTaskId] = useState("");
  const [pushId, setPushId] = useState(null);

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

  const startTimer = useCallback(
    async (taskId, userId, timeRemaining = null) => {
      let res = null;
      setActiveTaskId(taskId);
      if (timeRemaining) {
        setTimer(timeRemaining);
        res = await schedulePush(
          userId,
          timeRemaining,
          "TIMES UP",
          "JOBS A GOODUN",
        );
        setPushId(res);
      } else {
        setTimer(25);
        res = await schedulePush(userId, 25, "TIMES UP", "JOBS A GOODUN");
        setPushId(res);
      }
      setTimerRunning(true);
    },
    [],
  );

  const pauseTimer = useCallback(() => {
    setTimerRunning(false);
  }, []);

  const stopTimer = useCallback(() => {
    setTimerRunning(false);
    setTimer(0);
  }, []);

  return (
    <TimerContext.Provider
      value={{
        startTimer,
        pauseTimer,
        stopTimer,
        timerRunning,
        timer,
        setTimerRunning,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export const useTimer = () => useContext(TimerContext);
