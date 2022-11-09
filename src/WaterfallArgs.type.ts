export interface WaterfallFragment {
	url: string;
	queuedAt?: Date;
	startedAt: Date;
	endedAt: Date;
	contentDownloadedIn?: number;
}

type WaterfallArgs = WaterfallFragment[];

export default WaterfallArgs;
