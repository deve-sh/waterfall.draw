import type { WaterfallFragment } from "./WaterfallArgs.type";

const generateHTMLForRequestURL = (request: WaterfallFragment) => {
	return `<div class="waterfall-request-label-row" title="${
		request.method || ""
	} ${request.url}">
        ${
					request.method
						? `<div class="waterfall-request-label-row-method">${request.method}</div>`
						: ""
				} ${request.url}
</div>`;
};

export default generateHTMLForRequestURL;
