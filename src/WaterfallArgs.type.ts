export interface WaterfallFragment {
	url: string;
	queuedAt?: Date;
	startedAt: Date;
	endedAt: Date;
	contentDownloadedIn?: number;
	method?: string;
}

type WaterfallArgs = WaterfallFragment[];

export default WaterfallArgs;
