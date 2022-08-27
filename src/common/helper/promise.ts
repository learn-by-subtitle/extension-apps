export const wait = (seconds: number) => {
  return new Promise((done) => {
    setTimeout(done, seconds * 1000);
  });
};

export const waitUntil = (conditionMethod: (cancel) => boolean) => {
  return new Promise(async (done, reject) => {
    while (!conditionMethod(reject)) {
      await wait(0.1);
    }

    done(0);
  });
};
