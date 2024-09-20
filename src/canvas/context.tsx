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
        touchInfo: GestureStateChangeEvent<TapGestureHandlerEventPayload>,
        touchKey: any
      ) => void;
      onEnd: (
        touchInfo: GestureStateChangeEvent<TapGestureHandlerEventPayload>,
        touchKey: any
      ) => void;
      isPointInPath: (point: Vector) => boolean;
      touchKey: any;
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
