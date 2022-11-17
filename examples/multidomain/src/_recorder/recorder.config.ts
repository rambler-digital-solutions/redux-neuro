import { TriggerPhaseWrapper } from '@seijs/redux-neuro/lib/types';
import { createNeuron, createSlice } from '../../../../dist/lib';
import { IState, ITriggers } from 'src/_redux/types';
import { RecordScript } from './scripts/Record.script';
import { PlayScript } from './scripts/Play.script';

export interface IRecordState {
  isRecording: boolean;
  time: number;
}

export interface IRecordTriggers {
  record: TriggerPhaseWrapper<{
    act: null;
    init: null;
    makeGraph: null;
    start: null;
    stop: null;
    setGraph: any;
  }>;
  play: TriggerPhaseWrapper<{
    init: null;
    start: null;
    stop: null;
  }>;
  setState: Partial<IRecordState>;
}

export const recordBite = createNeuron<
  IRecordTriggers,
  ITriggers,
  IRecordState,
  IState,
  'record'
>(
  {
    act: null,
    start: null,
    stop: null,
    init: null,
    makeGraph: null,
    setGraph: (state, payload) => Object.assign(state, payload),
  },
  {
    script: RecordScript,
    instance: 'stable',
    updateOn: [],
    initOn: 'init',
    canTrigger: ['record', 'setState'],
  }
);

export const playBite = createNeuron<
  IRecordTriggers,
  ITriggers,
  IRecordState,
  IState,
  'play'
>(
  {
    start: null,
    stop: null,
    init: null,
  },
  {
    script: PlayScript,
    instance: 'stable',
    updateOn: ['play'],
    initOn: 'init',
    canTrigger: ['play'],
  }
);

const recorderInitialState: IRecordState = {
  isRecording: false,
  time: 0,
};

export const recorderSlice = createSlice<
  IRecordTriggers,
  ITriggers,
  IRecordState,
  IState
>(
  'recorder',
  {
    play: playBite,
    record: recordBite,
    setState: createNeuron(
      (state, payload) => Object.assign(state, payload),
      null
    ),
  },
  recorderInitialState
);
