export function onInit(instance, actionPayload, actionType, errorHandler) {
  try {
      instance.init(actionPayload);
  } catch (error) {
      if(!instance.init) {
        console.log(`INIT method is not defined for ${actionType}`)
      }
      if(errorHandler) {
        errorHandler(actionType, error)
      }
      else {
        throw error
      }
  }
}
