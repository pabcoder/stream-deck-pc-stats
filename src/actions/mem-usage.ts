import { action, DidReceiveSettingsEvent, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import os from 'os';

import createSVG from "../helpers/svg";

@action({ UUID: "com.pabcoder.pc-stats.memusage" })
export class MemUsage extends SingletonAction<MemUsageSettings> {
	showBy: string;

	constructor() {
		super();
		this.showBy = 'mb';
	}

	override onWillAppear(ev: WillAppearEvent<MemUsageSettings>): void | Promise<void> {
		const { settings } = ev.payload;
		this.showBy = settings.showBy || 'mb';

		const timer = setInterval(async () => {
			const totalmem = Math.ceil(os.totalmem() / 1024 / 1024);
			const freemem = Math.ceil(os.freemem() / 1024 / 1024);
			const usedmem = totalmem - freemem;

			const percentage: number = Math.ceil(usedmem / totalmem * 100);

			const output: string = 
				this.showBy?.trim().toLowerCase() === 'mb'
					? `${formatNumber(usedmem)} MB`
					: `${percentage} %`;

			ev.action.setTitle('RAM: ' + output);
			ev.action.setImage(createSVG(percentage));			
		}, 1000);
	}

	override onDidReceiveSettings(ev: DidReceiveSettingsEvent<MemUsageSettings>): void {
		const { settings } = ev.payload;

		this.showBy = settings.showBy || 'mb';
	}
}

function formatNumber(num: number): string {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

type MemUsageSettings = {
	showBy?: string;
};
