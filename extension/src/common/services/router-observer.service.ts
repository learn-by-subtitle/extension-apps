import { wait } from "../helper/promise";

export class RouterObserver {
  route: string = "";

  constructor() {}

  async observe() {

	await wait(0.5)

	let route = location.pathname;
	if(route == this.route) {

	}

	this.observe();
  }
}
