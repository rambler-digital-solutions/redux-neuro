import { createNeuron, createSlice } from '../../../../dist/lib';
import { TriggerPhaseWrapper } from '@seijs/redux-hang-on/lib/types';
import { LoadApp } from './scripts/LoadApp.script';
import { IState, ITriggers } from 'src/_redux/types';
import { Go } from './scripts/Go.script';
import { Supply } from './scripts/Supply.script';

export interface IAppState {
  app: string | null | number;
  deep: {
    one: {
      two: number;
    };
  };
  loading: boolean;
}

export interface IAppTriggers {
  setAppState: Partial<IAppState>;
  setAppDeep: number;
  setApp: TriggerPhaseWrapper<{
    init: never;
    drop: never;
  }>;
  supply: TriggerPhaseWrapper<{
    init: never;
    milk_start: never;
    milk_end: number;
    meat_start: never;
    meat_end: number;
  }>;
  go: TriggerPhaseWrapper<{
    init: never;
    forward_start: never;
    forward_end: never;
    backward_start: never;
    backward_end: never;
  }>;
}

export const appInitialState: IAppState = {
  app: null,
  deep: {
    one: {
      two: 2,
    },
  },
  loading: true,
};

const setAppBite = createNeuron<
  IAppTriggers,
  ITriggers,
  IAppState,
  IState,
  'setApp'
>(
  {
    init: null,
    drop: null, // since reducer is null - store will no be renewed
  },
  {
    updateOn: [{ setApp: 'drop' }],
    canTrigger: ['go', 'setApp', 'supply'],
    instance: 'stable',
    script: LoadApp,
    initOn: 'init',
  }
);

const goBite = createNeuron<IAppTriggers, ITriggers, IAppState, IState, 'go'>(
  {
    init: null,
    forward_start: null,
    forward_end: null,
    backward_start: null,
    backward_end: null,
  },
  {
    updateOn: ['go'],
    canTrigger: ['go', 'supply', 'setAppState'],
    instance: 'stable',
    script: Go,
    initOn: 'init',
  }
);

const supplyBite = createNeuron<
  IAppTriggers,
  ITriggers,
  IAppState,
  IState,
  'supply'
>(
  {
    init: null,
    meat_start: null,
    meat_end: null,
    milk_start: null,
    milk_end: null,
  },
  {
    updateOn: ['go', 'supply'],
    canTrigger: ['go', 'supply'],
    instance: 'stable',
    script: Supply,
    initOn: 'init',
  }
);

const seAppDeepStateBite = createNeuron<
  IAppTriggers,
  ITriggers,
  IAppState,
  IState,
  'setAppDeep'
>((state, payload) => {
  state.deep.one.two = payload;
}, null);

const seAppStateBite = createNeuron<
  IAppTriggers,
  ITriggers,
  IAppState,
  IState,
  'setAppState'
>((state, payload) => {
  Object.assign(state, payload);
}, null);

export const appSlice = createSlice<IAppTriggers, ITriggers, IAppState, IState>(
  'app',
  {
    setAppDeep: seAppDeepStateBite,
    go: goBite,
    setApp: setAppBite,
    supply: supplyBite,
    setAppState: seAppStateBite,
  },
  appInitialState
);
