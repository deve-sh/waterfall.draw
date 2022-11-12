import { describe, it, expect } from "@jest/globals";
import waterfall from "../src/index";

describe("Basic Tests for Constructor", () => {
	it("should receive two arguments", () => {
		expect(waterfall.length).toBe(2);
	});

	it("should throw an error if wrong DOM Node is passed", () => {
		// @ts-ignore
		expect(() => waterfall("#abc")).toThrow(
			"Waterfall: DOM Node with specified selector not found"
		);
	});

	it("should throw an error if no DOM Node or selector is passed", () => {
		// @ts-ignore
		expect(() => waterfall()).toThrow(
			"Waterfall: Please pass a valid DOM Node for painting waterfall."
		);
	});

	it("should return nothing if no requests are passed", () => {
		document.body.innerHTML = '<div id="waterfall-container"></div>';
		expect(waterfall("#waterfall-container", [])).toBe(undefined);
	});
});
