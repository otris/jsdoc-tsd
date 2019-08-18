export class Logger {
	public static log(message: string, logFunc: (msg: string) => void = console.log) {
		if (!process.env.NO_CONSOLE) {
			/* istanbul ignore next */
			logFunc(message);
		}
	}
}
