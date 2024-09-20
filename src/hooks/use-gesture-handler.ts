import { useCallback } from 'react';

import type {
  GestureStateChangeEvent,
  TapGestureHandlerEventPayload,
} from 'react-native-gesture-handler';

type UseGestureHandlerParams = {
  onStart?: (
    touchInfo: GestureStateChangeEvent<TapGestureHandlerEventPayload>,
    touchKey: any,
  ) => void;
  onEnd?: (
    touchInfo: GestureStateChangeEvent<TapGestureHandlerEventPayload>,
    touchKey: any,
  ) => void;
};

const useGestureHandler = (gestureHandlers: UseGestureHandlerParams) => {
  const { onStart, onEnd } = gestureHandlers;

  const handleStart = useCallback(
    (touchInfo: GestureStateChangeEvent<TapGestureHandlerEventPayload>, touchKey: any) => {
      'worklet';
      if (!onStart) return;
      return onStart(touchInfo, touchKey);
    },
    [onStart]
  );
  const handleEnd = useCallback(
    (
      extendedTouchInfo: GestureStateChangeEvent<TapGestureHandlerEventPayload>,
      touchKey: any
    ) => {
      'worklet';
      if (!onEnd) return;
      return onEnd(extendedTouchInfo, touchKey);
    },
    [onEnd]
  );

  return {
    onStart: handleStart,
    onEnd: handleEnd,
  };
};

export { useGestureHandler };
