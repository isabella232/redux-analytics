import { isFSA } from 'flux-standard-action';

export default (track, select = ({ meta }) => meta.analytics) => store => next => action => {
  const oldState = store.getState();

  const returnValue = next(action);

  if (!action || !action.meta) {
    return returnValue;
  }

  const event = select(action);

  if (!event) {
    return returnValue;
  }

  if (!isFSA(event)) {
    const message = "The following event wasn't tracked because it isn't a Flux Standard Action (https://github.com/acdlite/flux-standard-action)";
    console.error(message, event);
    return returnValue;
  }

  track(event, oldState, store.getState());

  return returnValue;
};
