import { Canvas as SkiaCanvas } from '@shopify/react-native-skia';
import React, { useEffect, useMemo } from 'react';
import {
  Gesture,
  GestureDetector,
  TapGesture,
} from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';

import {
  TouchHandlerContext,
  type TouchableHandlerContextType,
} from './context';

import type { CanvasProps } from '@shopify/react-native-skia';

type TouchableCanvasProps = CanvasProps & {
  tapGesture?: TapGesture;
};

const Canvas: React.FC<TouchableCanvasProps> = ({
  children,
  tapGesture = Gesture.Tap(),
  ...props
}) => {
  // Instead of value, provide a subscribe method and reload the refs
  const touchableRefs: TouchableHandlerContextType = useMemo(() => {
    return { value: {} };
  }, []);

  const activeKey = useSharedValue<string[]>([]);

  const mainGesture = tapGesture
    .onBegin((event) => {
      'worklet';
      const keys = Object.keys(touchableRefs.value);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i] as string;
        const touchableItem = touchableRefs.value[key];
        const isPointInPath = touchableItem?.isPointInPath(event);
        if (isPointInPath && touchableItem?.onStart) {
          activeKey.value = [`${key}__${event.handlerTag}`];
          touchableItem.onStart?.(event, touchableItem.touchKey);
        }
      }
    })
    .onEnd((event) => {
      'worklet';
      const activatedKey = activeKey.value.find((key) =>
        key.includes(event.handlerTag.toString())
      );
      if (!activatedKey) {
        return;
      }
      const indexedKey = activatedKey.split('__')?.[0];
      if (!indexedKey) {
        return;
      }
      const touchableItem = touchableRefs.value[indexedKey];
      activeKey.value = activeKey.value.filter(
        (key) => !key.includes(event.handlerTag.toString())
      );
      return touchableItem?.onEnd?.(event as any, touchableItem.touchKey);
    });

  useEffect(() => {
    return () => {
      touchableRefs.value = {};
    };
  }, [touchableRefs]);

  return (
    <GestureDetector gesture={mainGesture}>
      <SkiaCanvas {...props}>
        <TouchHandlerContext.Provider value={touchableRefs}>
          {children}
        </TouchHandlerContext.Provider>
      </SkiaCanvas>
    </GestureDetector>
  );
};

export { Canvas };
