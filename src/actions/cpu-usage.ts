import streamDeck, { action, DidReceiveSettingsEvent, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import createSVG from "../helpers/svg";
import osu from "node-os-utils";
import { exec } from "child_process";

@action({ UUID: "com.pabcoder.pc-stats.cpuusage" })
export class CPUUsage extends SingletonAction<CPUUsageSettings> {
	showBy: string;

	constructor() {
		super();
		this.showBy = 'ghz';
	}

	override onWillAppear(ev: WillAppearEvent<CPUUsageSettings>): void | Promise<void> {
		const { settings } = ev.payload;
		this.showBy = settings.showBy || 'mb';

		const timer = setInterval(async () => {
			const cpu = osu.cpu;

			exec('netstat -e', (err, stdout, stderr) => {
				if (err) {
					console.error(err);
					return;
				}

				streamDeck.logger.info(stdout);
			});

			const percentage = await cpu.usage();
			const percentageCeil = Math.ceil(percentage);
			const output: string = `${percentageCeil} %`;

			ev.action.setTitle('CPU: ' + output);
			ev.action.setImage(createSVG(percentageCeil));	
		}, 1000);
	}
}

function formatNumber(num: number): string {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

type CPUUsageSettings = {
	showBy?: string;
};
