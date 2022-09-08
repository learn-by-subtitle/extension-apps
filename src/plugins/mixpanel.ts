import mixpanel, {Config} from 'mixpanel-browser';

let config:Partial<Config> = {
	debug: process.env.mode != 'production',
}

mixpanel.init(process.env.MIXPANEL_TRACKING_ID as string, config);
export const analytic = mixpanel;
