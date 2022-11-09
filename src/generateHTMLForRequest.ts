import { WaterfallFragment } from "./WaterfallArgs.type";

const generateHTMLForRequest = (
	request: WaterfallFragment,
	startBound: Date,
	endBound: Date
) => {
	const requestWidth =
		(request.endedAt.getTime() - request.startedAt.getTime()) /
		(endBound.getTime() - startBound.getTime());
	const requestLeftOffset =
		(request.startedAt.getTime() - startBound.getTime()) / 100;
	return `
	<div class="waterfall-request-row">
		<div class="waterfall-request" style="width: ${requestWidth}%; left:${requestLeftOffset}%"></div>
	</div>
	`;
};

export default generateHTMLForRequest;
