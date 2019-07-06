import { existsSync, readFileSync } from "fs";
import { extname } from "path";
import stripJsonComments = require("strip-json-comments");

/**
 * Function for comparing version strings of since-tags
 * to determine if the passed in tagged version is in range
 * of the passed in latest version
 */
declare type VersionComparatorFunction = (taggedVersion: string, latestVersion: string) => boolean;

export class Configuration {

	/**
	 * Scopes to ignore
	 */
	public get ignoreScopes(): string[] {
		return this._ignoreScopes;
	}

	/**
	 * Latest version tag for the version comparator function
	 */
	public get latestVersion(): string {
		return this._latestVersion;
	}

	/**
	 * Determines if the tagged version is in range of the latest version
	 * @param taggedVersion Current version tag
	 * @param latestVersion Latest version tag from config
	 */
	public get versionComparator(): VersionComparatorFunction {
		return this._versionComparator;
	}

	public set versionComparator(value: VersionComparatorFunction) {
		// Its possible to pass the version comparator via the jsdoc config
		// either as function string or as a file path to a js-file which
		// the version comparator function
		let newVersionComparator: VersionComparatorFunction = value;
		if (typeof value === "string") {
			const versionComparatorAsString: string = value;
			if (versionComparatorAsString.indexOf("{") > 0) {
				// Version comparator is a function string
				newVersionComparator = this.parseVersionComparatorFromString(value);
			} else if (existsSync(value)) {
				// Version comparator is a file path
				if (extname(value) === ".js") {
					newVersionComparator = require(value);
				} else {
					throw new Error(`Invalud version comparator: ${value}. Version comparator must be a JavaScript file.`);
				}
			} else {
				throw new Error(`Version comparator must contain a valid path or a valid function as string, got ${value}`);
			}
		}

		this._versionComparator = newVersionComparator;
	}
	private _ignoreScopes: string[];
	private _latestVersion: string;
	private _versionComparator: VersionComparatorFunction;

	constructor(filePath?: string) {
		this._ignoreScopes = [];
		this._versionComparator = this.defaultVersionComparator;
		this._latestVersion = "";

		if (filePath) {
			this.loadFromFile(filePath);
		}
	}

	public ignoreScope(scope: string): boolean {
		return this.ignoreScopes.indexOf(scope) > -1;
	}

	/**
	 * Determines if the tagged version is in range of the latest version
	 * by using semver-tags
	 * @param taggedVersion Current version tag
	 * @param latestVersion Latest version tag from config
	 */
	private defaultVersionComparator(taggedVersion: string, latestVersion: string): boolean {
		if (taggedVersion.match(/v?([0-9]+\.){2}[0-9]+/i)) {
			if (typeof latestVersion === "string" && latestVersion.match(/v?([0-9]+\.){2}[0-9]+/i)) {
				const compare = require("node-version-compare");
				const result = compare(latestVersion, taggedVersion);
				return result >= 0;
			} else {
				return true;
			}
		} else {
			return false;
		}
	}

	private loadFromFile(filePath: string) {
		const jsonString = readFileSync(filePath, { encoding: "utf-8" });
		const configObj = JSON.parse(stripJsonComments(jsonString));

		// quick and dirty iterate over public config properties
		const _config = new Configuration();
		for (const property of Object.keys(_config)) {
			if (configObj[property]) {
				const privateProp = "_" + property;

				// @ts-ignore
				this[privateProp] = configObj[property];
			}
		}
	}

	private parseVersionComparatorFromString(versionComparatorAsString: string): VersionComparatorFunction {
		let functionBody = versionComparatorAsString.substr(versionComparatorAsString.indexOf("{") + 1);
		functionBody = functionBody.substr(0, functionBody.length - 1).trim();

		// @ts-ignore
		return new Function("param1", "param2", functionBody);
	}
}
