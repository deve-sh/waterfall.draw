import generateHTMLForRequest from "./generateHTMLForRequest";
import generateHTMLForSeparatorLine from "./generateHTMLForSeparatorLine";

import type WaterfallArgs from "./WaterfallArgs.type";

const waterfall = (
	domNodeSelector: string | HTMLElement,
	requests: WaterfallArgs
) => {
	// Server-side or test environment
	if (typeof document === "undefined") return;

	// Validate DOM Node Selector
	let domNode;
	if (typeof domNodeSelector === "string") {
		domNode = document.querySelector(domNodeSelector);
		if (!domNode)
			throw new Error("Waterfall: DOM Node with specified selector not found.");
	} else {
		// If HTML Element is passed.
		if (!domNodeSelector || !domNodeSelector.getAttribute)
			throw new Error(
				"Waterfall: Please pass a valid DOM Node for painting waterfall."
			);
		domNode = domNodeSelector;
	}

	if (!requests.length) return;

	let firstRequest;
	let lastRequest;

	const nRequests = requests.length;
	// First find the bounds of the timing for all requests
	for (let i = 0; i < nRequests; i += 1) {
		const request = requests[i];

		if (!firstRequest) firstRequest = request;
		else if (request.startedAt < firstRequest.startedAt) firstRequest = request;

		if (!lastRequest) lastRequest = request;
		else if (request.endedAt > lastRequest.endedAt) lastRequest = request;
	}

	// Now that we have the first and last requests bounds. Let's plot out our HTML divs.
	if (!firstRequest || !lastRequest) return;

	const rows = ['<div class="waterfall-request-rows">'];

	const waterfallStartsAt = firstRequest.startedAt;
	const waterfallEndsAt = lastRequest.endedAt;
	for (let i = 0; i < nRequests; i += 1) {
		const request = requests[i];
		rows.push(
			generateHTMLForRequest(request, waterfallStartsAt, waterfallEndsAt)
		);
	}
	// Add a few lines to the waterfall for separation of times
	const nLinesNeeded = 10;
	for (let i = 0; i <= nLinesNeeded; i += 1) {
		rows.push(
			generateHTMLForSeparatorLine(
				i,
				nLinesNeeded,
				waterfallEndsAt.getTime() - waterfallStartsAt.getTime()
			)
		);
	}
	rows.push("</div>");

	// Append the HTML into the dom node.
	domNode.innerHTML = rows.join("");
};

export default waterfall;
