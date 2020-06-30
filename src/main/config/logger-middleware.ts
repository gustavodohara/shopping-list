
export default () => (next: (arg0: any) => any) => (action: { type: any; payload: any; meta: any; }) => {
  // if (process.env.NODE_ENV !== 'production') {
    const { type, payload, meta } = action;

    console.groupCollapsed(type);
    // tslint:disable-next-line
    console.log('Payload:', payload);
    // tslint:disable-next-line
    console.log('Meta:', meta);
    console.groupEnd();
  // }

  return next(action);
};
