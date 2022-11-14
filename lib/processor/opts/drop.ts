import { getActionType } from '../../utils';

export function Drop(system, config) {
  const actionType = getActionType(config.targetName, config.config.initOn);

  return () => {
    system.downProcess(actionType);
  };
}
