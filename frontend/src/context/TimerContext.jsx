import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { cancelPush, schedulePush } from "../services/notifications";

const TimerContext = createContext();

export function TimerProvider({ children }) {
  const [timer, setTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const pushId = useRef();
  const activeTaskId = useRef();

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
      console.log(taskId);
      activeTaskId.current = taskId;
      if (timeRemaining) {
        setTimer(timeRemaining);
        const res = await schedulePush(
          userId,
          activeTaskId.current,
          timeRemaining,
          "TIMES UP",
          "JOBS A GOODUN",
        );
        pushId.current = res;
      } else {
        setTimer(25);
        const res = await schedulePush(userId, 25, "TIMES UP", "JOBS A GOODUN");
        pushId.current = res;
      }
      setTimerRunning(true);
    },
    [],
  );

  const pauseTimer = useCallback(() => {
    setTimerRunning(false);
  }, []);

  const stopTimer = useCallback(() => {
    cancelPush(pushId.current);
    setTimerRunning(false);
    setTimer(0);
    pushId.current = null;
  }, []);

  return (
    <TimerContext.Provider
      value={{
        startTimer,
        pauseTimer,
        stopTimer,
        timerRunning,
        timer,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export const useTimer = () => useContext(TimerContext);
