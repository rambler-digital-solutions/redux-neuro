import { MakeReducerType } from '../types';

export const getNullReducersNames = <AC, StoreType>(
  reducers: MakeReducerType<AC, StoreType>
): Array<string> =>
  Object.keys(reducers).reduce((acc: string[], cur: string) => {
    if (reducers[cur] === null) {
      return [...acc, cur];
    } else if (Object.keys(reducers[cur]).length) {
      const subArr = Object.keys(reducers[cur])
        .filter((key) => reducers[cur][key] === null)
        .map((k) => cur + '/' + k);

      return [...acc, ...subArr];
    }

    return acc;
  }, []);

export const getTriggerAndStatus = (
  actionType: string
): { targetName: string; methodName: string | null } => {
  const parts = actionType.split('/');

  return {
    targetName: parts[0],
    methodName: parts[1] || null,
  };
};

export const getActionType = (targetName: string, methodName: string): string =>
targetName + (methodName ? `/${methodName}` : '');
