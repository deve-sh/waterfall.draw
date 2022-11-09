const generateHTMLForSeparatorLine = (
	lineNumber: number,
	nLinesNeeded: number,
	totalTime: number
) => {
	const leftPercent = (lineNumber / nLinesNeeded) * 100;
	const left = leftPercent + "%";
	const labelLeft = leftPercent - 2.5 + "%";
	let ms = (lineNumber / nLinesNeeded) * totalTime;
	let unit = "ms";
	// ms to seconds
	if (ms > 5000) {
		unit = "s";
		ms = ms / 1000;
	}
	return `<div class="waterfall-separator-line" style="left:${left}"></div>
    <div class="waterfall-separator-label" style="left:${labelLeft}">${
		ms ? ms + unit : ""
	}</div>`;
};

export default generateHTMLForSeparatorLine;
