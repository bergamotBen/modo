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
  const [onBreak, setOnBreak] = useState(false);
  const [breakTime, setBreakTime] = useState(false);
  const pushId = useRef();
  const activeTaskId = useRef();
  const longBreak = useRef(0);
  const [onLongBreak, setOnLongBreak] = useState(false);

  useEffect(() => {
    let intervalId = null;

    if (timerRunning && timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 100);
    } else if (timer === 0 && timerRunning) {
      setTimerRunning(false);
      setBreakTime((prevState) => !prevState);

      if (!onBreak) {
        longBreak.current += 1;
      }

      if (longBreak.current === 3) {
        setOnLongBreak(true);
      }
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [timerRunning, timer]);

  const startTimer = useCallback(
    async (taskId, userId, timeRemaining = null) => {
      setOnBreak(false);
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
        const res = await schedulePush(
          userId,
          activeTaskId.current,
          25,
          "TIMES UP",
          "JOBS A GOODUN",
        );
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

  const startBreakTimer = useCallback(async (userId) => {
    if (longBreak.current === 3) {
      longBreak.current = 0;
      setTimer(30);
      setOnLongBreak(false);
    } else {
      setTimer(5);
    }
    setOnBreak(true);
    const res = await schedulePush(
      userId,
      null,
      onLongBreak ? 30 : 5,
      "That's a wrap 🌮",
      "Get back to it!!",
    );
    setTimerRunning(true);
  }, []);

  return (
    <TimerContext.Provider
      value={{
        startTimer,
        pauseTimer,
        stopTimer,
        timerRunning,
        timer,
        startBreakTimer,
        onBreak,
        breakTime,
        onLongBreak,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export const useTimer = () => useContext(TimerContext);
