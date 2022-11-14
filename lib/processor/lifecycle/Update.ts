import { getActionType, getTriggerAndStatus } from '../../utils';

function pickReducer(reducers: any, trigger: string, status: string): any {
  if (reducers[trigger]) {
    if (typeof reducers[trigger] === 'function') {
      return reducers[trigger].bind(this);
    } else if (typeof reducers[trigger][status] === 'function') {
      return reducers[trigger][status].bind(this);
    }
  }
}

function tryUpdate(instance, updateArgs, actionType, onError) {
    try {
      instance.update(updateArgs)
    } catch(error) {
      if(onError) {
        onError(actionType, error)
      }
      else {
        throw error
      }
    }
}

export function BeforeUpdate(
  instance,
  state,
  actionType,
  actionPayload,
  sourceName,
  reducers,
  sliceName,
  onError
) {
  const { targetName, methodName } = getTriggerAndStatus(actionType);

  const reducer = pickReducer(reducers, targetName, methodName);
  let propagate = true;
  let keepUpdate = false;
  const stopPropagate = (args?: { keepUpdate: boolean }) => {
    keepUpdate = (args && args.keepUpdate) || false;
    propagate = false;
  };


  if (instance.update) {
    const { targetName, methodName } = getTriggerAndStatus(actionType);
    const updateArgs = {
      payload: actionPayload,
      targetName,
      methodName,
      sourceName,
      hold: stopPropagate,
    };


    if(instance.updatable) {
      const foundKey = Object.keys(instance.updatable).find( u => u === getActionType(updateArgs.targetName, updateArgs.methodName) )
      if(foundKey) {
        instance[instance.updatable[foundKey]](updateArgs)
      }
      else {
        tryUpdate(instance,updateArgs, actionType, onError);
      }
    }
    else {
      tryUpdate(instance,updateArgs, actionType, onError);
    }
    if (!propagate && keepUpdate) {
      const stateCopy = { ...state };
      reducer(stateCopy[sliceName], actionPayload);
    }
  }

  return propagate;
}
