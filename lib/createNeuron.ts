import { MakeBiteProcessorType, MakeBiteReducerType } from './types';

export const createNeuron = <ITrigger, IRootTrigger, IState, IRootState, K extends keyof ITrigger>(
  reducer: MakeBiteReducerType<ITrigger, IState, K>,
  processor: MakeBiteProcessorType<ITrigger, IRootTrigger, IRootState, K>
) => ({ reducer, processor });
