import { makeProcMiddleware } from './createMiddleware';
import { makeReducer } from './createReducer';
import { MakeBiteType } from './types';

export const createSlice = <ITrigger, IRootTrigger, IState, IRootState>(
  sliceName: string,
  neurons: MakeBiteType<ITrigger, IRootTrigger, IState, IRootState>,
  initialState: IState
) => {
  const reducer = Object.keys(neurons).reduce(
    (acc, curKey) => ({ ...acc, [curKey]: neurons[curKey].reducer }),
    {}
  );
  const processor = Object.keys(neurons).reduce((acc, curKey) => {
    if (neurons[curKey].processor) {
      return { ...acc, [curKey]: neurons[curKey].processor };
    } else {
      return acc;
    }
  }, {});

  return {
    reducer: { [sliceName]: makeReducer(reducer, initialState) },
    middleware: makeProcMiddleware(processor, reducer, sliceName),
  };
};
