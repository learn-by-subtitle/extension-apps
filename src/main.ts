console.log('Learn by subtitle 0.0');

import { createApp } from "vue";
import components from './common/components/components';
import rootComponent from "./App.vue";
import { NetflixInitializer } from "./module/netflix/initializer";

let vueApp = createApp(rootComponent as any);

Object.keys(components).forEach(name => {
	let component = (components as any)[name]
	vueApp.component(name, component);
})

NetflixInitializer(vueApp);