import { ref, unref } from "vue";
import { tryOnUnmounted } from "@vueuse/core";

export function useCountdown(total: number) {
  const sTotal = ref(total);

  const isStart = ref(false);

  let timerId: ReturnType<typeof setInterval> | null;

  function clear() {
    timerId && window.clearInterval(timerId);
  }

  function stop() {
    isStart.value = false;
    clear();
    timerId = null;
  }

  function start() {
    if (unref(isStart) || !!timerId) {
      return;
    }
    isStart.value = true;
    timerId = setInterval(() => {
      if (unref(sTotal) === 1) {
        stop();
        sTotal.value = total;
      } else {
        sTotal.value -= 1;
      }
    }, 1000);
  }

  function reset() {
    sTotal.value = total;
    stop();
  }

  function restart() {
    reset();
    start();
  }

  tryOnUnmounted(() => {
    reset();
  });

  return { start, reset, restart, clear, stop, sTotal, isStart };
}
