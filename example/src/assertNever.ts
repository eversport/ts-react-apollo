const assertNever = (x: never): never => {
  throw new Error("Unexpected object: " + x);
};

export default assertNever;
