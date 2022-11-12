import { describe, it, expect } from "@jest/globals";
import waterfall from "../src/index";

const now = new Date().getTime();
const requests = [
	{
		url: "/api/v1/a",
		startedAt: new Date(now),
		endedAt: new Date(now + 5000),
		method: "GET",
	},
	{
		url: "/api/v2/b",
		startedAt: new Date(now + 5000),
		endedAt: new Date(now + 10000),
		method: "POST",
	},
	{
		url: "/api/v2/c",
		startedAt: new Date(now + 2000),
		endedAt: new Date(now + 5000),
		method: "PUT",
	},
	{
		url: "/api/v2/d",
		startedAt: new Date(now + 6500),
		endedAt: new Date(now + 7000),
		method: "DELETE",
	},
];

describe("Tests for presense of DOM Nodes and valid style attributes", () => {
	beforeAll(() => {
		document.body.innerHTML = '<div id="waterfall-container"></div>';
		waterfall("#waterfall-container", requests);
	});

	it("should create a container, wrapper, request list and label rows", () => {
		const requiredElementClassNames = [
			"waterfall-container",
			"waterfall-request-rows-wrapper",
			"waterfall-request-rows",
			"waterfall-request-label-rows",
		];
		for (let className of requiredElementClassNames)
			expect(document.getElementsByClassName(className).length).toBe(1);
	});

	it("should draw 11 label lines and corresponding labels", () => {
		expect(
			document.getElementsByClassName("waterfall-separator-line").length
		).toBe(11);
		expect(
			document.getElementsByClassName("waterfall-separator-label").length
		).toBe(11);
	});

	it("should specify the correct start and end labels", () => {
		const firstLabel = (
			document.getElementsByClassName(
				"waterfall-separator-label"
			)[0] as HTMLElement
		).textContent;
		const finalLabel = (
			document.getElementsByClassName(
				"waterfall-separator-label"
			)[10] as HTMLElement
		).textContent;

		expect(firstLabel).toMatch("0ms");
		expect(finalLabel).toMatch("10s");
	});

	it("should draw the right number of request rows and lines", () => {
		expect(
			document.getElementsByClassName("waterfall-request-row").length
		).toBe(requests.length);
		expect(document.getElementsByClassName("waterfall-request").length).toBe(
			requests.length
		);
	});
});
