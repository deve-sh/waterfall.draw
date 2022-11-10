import generateHTMLForRequest from "./generateHTMLForRequest";
import generateHTMLForRequestURL from "./generateHTMLForRequestURL";
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

	if (!firstRequest || !lastRequest) return;

	let completeHTML = '<div class="waterfall waterfall-container">';
	// Now that we have the first and last requests bounds. Let's plot out our HTML divs for waterfall rows.
	const requestRectangleRows = ['<div class="waterfall-request-rows">'];
	const urlLabelRows = ['<div class="waterfall-request-label-rows">'];

	const waterfallStartsAt = firstRequest.startedAt;
	const waterfallEndsAt = lastRequest.endedAt;
	for (let i = 0; i < nRequests; i += 1) {
		const request = requests[i];
		requestRectangleRows.push(
			generateHTMLForRequest(request, waterfallStartsAt, waterfallEndsAt)
		);
		urlLabelRows.push(generateHTMLForRequestURL(request));
	}
	// Add a few lines to the waterfall for separation of times
	const nLinesNeeded = 10;
	for (let i = 0; i <= nLinesNeeded; i += 1) {
		requestRectangleRows.push(
			generateHTMLForSeparatorLine(
				i,
				nLinesNeeded,
				waterfallEndsAt.getTime() - waterfallStartsAt.getTime()
			)
		);
	}

	requestRectangleRows.push("</div>");
	urlLabelRows.push("</div>");

	// Append the HTML into the dom node.
	completeHTML +=
		urlLabelRows.join("") + requestRectangleRows.join("") + "</div>";
	domNode.innerHTML = completeHTML;
};

export default waterfall;
