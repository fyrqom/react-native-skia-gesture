import { useCallback } from 'react';

import type {
  GestureStateChangeEvent,
  TapGestureHandlerEventPayload,
} from 'react-native-gesture-handler';

type UseGestureHandlerParams = {
  onStart?: (
    touchInfo: GestureStateChangeEvent<TapGestureHandlerEventPayload>
  ) => void;
  onEnd?: (
    touchInfo: GestureStateChangeEvent<TapGestureHandlerEventPayload>
  ) => void;
};

const useGestureHandler = (gestureHandlers: UseGestureHandlerParams) => {
  const { onStart, onEnd } = gestureHandlers;

  const handleStart = useCallback(
    (touchInfo: GestureStateChangeEvent<TapGestureHandlerEventPayload>) => {
      'worklet';
      if (!onStart) return;
      return onStart(touchInfo);
    },
    [onStart]
  );
  const handleEnd = useCallback(
    (
      extendedTouchInfo: GestureStateChangeEvent<TapGestureHandlerEventPayload>
    ) => {
      'worklet';
      if (!onEnd) return;
      return onEnd(extendedTouchInfo);
    },
    [onEnd]
  );

  return {
    onStart: handleStart,
    onEnd: handleEnd,
  };
};

export { useGestureHandler };
