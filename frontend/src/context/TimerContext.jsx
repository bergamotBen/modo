import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { supabase } from "../lib/supabase";
import { cancelPush, schedulePush } from "../services/notifications";

const TimerContext = createContext();

export function TimerProvider({ children }) {
  const [timer, setTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [breakTime, setBreakTime] = useState(false);
  const [onLongBreak, setOnLongBreak] = useState(false);

  const pushId = useRef();
  const activeTaskId = useRef();
  const longBreak = useRef(0);

  // EFFECT 1: On app mount, restore timer from DB
  useEffect(() => {
    const restoreTimer = async () => {
      try {
        const { data: push } = await supabase
          .from("scheduled_pushes")
          .select("id, scheduled_for, payload")
          .eq("processed", false)
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        if (push) {
          const now = new Date();
          const scheduledFor = new Date(push.scheduled_for);
          const minutesRemaining = Math.floor((scheduledFor - now) / 1000 / 60);

          if (minutesRemaining > 0) {
            pushId.current = push.id;
            activeTaskId.current = push.payload.taskId;
            setTimer(minutesRemaining);
            setTimerRunning(true);
          }
        }
      } catch (error) {
        console.error("Failed to restore timer:", error);
      }
    };

    restoreTimer();
  }, []);

  // EFFECT 2: Tick down timer every minute
  useEffect(() => {
    let intervalId = null;

    if (timerRunning && timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 60000);
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
  }, [timerRunning, timer, onBreak]);

  // EFFECT 3: Sync timer when app regains focus
  useEffect(() => {
    const handleFocus = async () => {
      if (!timerRunning || !pushId.current) return;

      try {
        const { data: push } = await supabase
          .from("scheduled_pushes")
          .select("scheduled_for")
          .eq("id", pushId.current)
          .single();

        if (push) {
          const now = new Date();
          const scheduledFor = new Date(push.scheduled_for);
          const minutesRemaining = Math.floor((scheduledFor - now) / 1000 / 60);

          if (minutesRemaining > 0) {
            setTimer(minutesRemaining);
          } else {
            stopTimer();
          }
        }
      } catch (error) {
        console.error("Failed to sync timer:", error);
      }
    };

    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleFocus);
    };
  }, [timerRunning]);

  const startTimer = useCallback(
    async (taskId, userId, timeRemaining = null) => {
      setOnBreak(false);
      activeTaskId.current = taskId;
      const duration = timeRemaining || 25;

      setTimer(duration);

      const res = await schedulePush(
        userId,
        taskId,
        duration,
        "MODO COMPLETE",
        "Time for a break",
      );
      pushId.current = res;
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

    const duration = longBreak.current === 3 ? 30 : 5;
    const res = await schedulePush(
      userId,
      null,
      duration,
      "That's a wrap 🌮",
      "Get back to it!!",
    );
    pushId.current = res;
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
