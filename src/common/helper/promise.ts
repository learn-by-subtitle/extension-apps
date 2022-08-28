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

export class Interval {
  isActive = false;
  callback;
  duration;

  constructor(duration, callback: (interval: Interval) => void) {
    this.callback = callback;
    this.duration = duration;
  }

  async next() {
    if (!this.isActive) return;

    await wait(this.duration / 1000);
    this.callback(this);
  }

  start() {
    this.isActive = true;
    this.next();
  }

  stop() {
    this.isActive = false;
  }
}
