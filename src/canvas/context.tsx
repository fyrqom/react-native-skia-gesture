import React, { useContext } from 'react';

import type { Vector } from '@shopify/react-native-skia';
import type {
  GestureStateChangeEvent,
  TapGestureHandlerEventPayload,
} from 'react-native-gesture-handler';

export type TouchableHandlerContextType = {
  value: Record<
    string,
    {
      onStart: (
        touchInfo: GestureStateChangeEvent<TapGestureHandlerEventPayload>
      ) => void;
      onEnd: (
        touchInfo: GestureStateChangeEvent<TapGestureHandlerEventPayload>
      ) => void;
      isPointInPath: (point: Vector) => boolean;
    }
  >;
};

const TouchHandlerContext = React.createContext<TouchableHandlerContextType>({
  value: {},
});

const useTouchHandlerContext = () => {
  return useContext(TouchHandlerContext);
};

export { TouchHandlerContext, useTouchHandlerContext };
