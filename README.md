# Middleware

__React => (Calls on...) Action Creator => (Returns a ...) Action __

__=> (Sent to...) Middleware__: Middleware has opportunity to log, stop, modify, or not touch an action

__=> (Forwards Action To...) Reducers => (Produces new...) State => (Sent to...) React__



Action 

=> Middleware#1: I don't care about this action, send it to NEXT middleware

=> Middleware#2: This action looks important, I will console log it then forward it on

=> Middleware#3: I don't care about this action ...

=> Reducers 



```react
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
```

```dispatch``` is a function that is different with ```next``` in that ```dispatch``` send it to very top reducer again just pretend like brand new action. Run entire cycle again.



The Goal of ```dispatch``` action again is with this way we can ensure the order of middlewares that run.