import { getTriggerAndStatus } from '../utils';

export function matchInitTrigger(config, actionType) {
  const { targetName, methodName } = getTriggerAndStatus(actionType);
  if (config[targetName]) {
    if (!config[targetName]['initOn']) {
      return { config: config[targetName], targetName };
    } else if (config[targetName] && config[targetName]['initOn'] === methodName) {
      return { config: config[targetName], targetName };
    }
  }

  return null;
}
