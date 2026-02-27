'use client';

import { useState } from 'react';
import { StateSetter } from './Interfaces';



export default function useMixedState<S = undefined>(): [S | undefined, StateSetter<S | undefined>];
export default function useMixedState<S>(initialState: S | (() => S)): [S, StateSetter<S>];
export default function useMixedState<S>(state: S, setter?: StateSetter<S>): [S, StateSetter<S>];



/** 
 * Use mixed state hook
 * 
 * @param initialStateOrValue Initial state, can be undefined, value or function. If externalSetter not specified, will return default state
 * @param externalSetter External state setter. If specified will return external state
 */
export default function useMixedState<S>(initialStateOrValue?: S | (() => S), externalSetter?: StateSetter<S>) {
  const isControlled = arguments.length === 2 && externalSetter !== undefined;

  const [defaultState, defaultSetter] = useState<S | undefined>(initialStateOrValue);



  if (isControlled) {
    return [
      initialStateOrValue as S,
      externalSetter as StateSetter<S>
    ];
  }

  return [defaultState, defaultSetter];
}