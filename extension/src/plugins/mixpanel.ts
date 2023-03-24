import mixpanel, {Config} from 'mixpanel-browser';

let config:Partial<Config> = {
	debug: process.env.NODE_ENV != 'production',
}

mixpanel.init(process.env.MIXPANEL_TRACKING_ID as string, config);
export const analytic = mixpanel;
