import { WaterfallFragment } from "./WaterfallArgs.type";

const generateHTMLForRequest = (
	request: WaterfallFragment,
	startBound: Date,
	endBound: Date
) =>
	`<div class="waterfall-request" style="width: ${
		(request.endedAt.getTime() - request.startedAt.getTime()) /
		(endBound.getTime() - startBound.getTime())
	};left:${(request.startedAt.getTime() - startBound.getTime()) / 100}"></div>`;

export default generateHTMLForRequest;
