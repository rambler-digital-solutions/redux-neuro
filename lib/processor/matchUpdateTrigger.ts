import { getTriggerAndStatus } from '../utils';

export function matchUpdateTrigger(configs, actionType) {
  const { targetName, methodName } = getTriggerAndStatus(actionType);

  return Object.keys(configs)
    .filter((c) => {
      const conf = configs[c];
      const updateOn = conf.updateOn;
      if (updateOn) {
        if (updateOn.length === 0) {
          return true;
        }
        const matchedTrigger = updateOn.find((t) => {
          const firstKey = Object.keys(t)[0];

          return t === targetName || firstKey === targetName;
        });
        if (matchedTrigger) {
          if (typeof matchedTrigger === 'string') {
            return true;
          } else if (
            matchedTrigger[Object.keys(matchedTrigger)[0]] === methodName
          ) {
            return true;
          }
        }
      }
    })
    .map((c) => ({
      config: configs[c],
      targetName: c,
    }));
}
