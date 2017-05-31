export default function({ dispatch }) {
  return next => action => {
    if (!isPromise(action)) {
      return next(action);
    }

    action.payload
      .then(response => {
        const newActionThatResolvedPromise = { ...action, payload: response };
        dispatch(newActionThatResolvedPromise);
      })
  };
}

function isPromise(action) {
  return !action.payload || !action.payload.then ? false : true;
}
