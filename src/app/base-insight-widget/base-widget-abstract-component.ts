import { BaseWidget } from "./base-widget";
import { BaseInsightWidgetContextMenuItem, BaseInsightWidgetDataFilter } from "./insight-widget.types";

export abstract class BaseWidgetAbstractComponent<DT> implements BaseWidget<DT> {
	public title: string;
	public description: string;
	public contextMenuItems: BaseInsightWidgetContextMenuItem[];
	public dataLoaded = false;
	public noData = true;
	public loadedWithError = false;
	public withDrillDownDrillUp = false;

	constructor() {
		this.title = this.getTitle();
		this.description = this.getDescription();
		this.contextMenuItems = this.getContextMenuItems();
	}

	public abstract getId(): string;
	public abstract getTitle(): string;
	public abstract getDescription(): string;
	public abstract getFilters(): BaseInsightWidgetDataFilter[];
	public abstract getContextMenuItems(): BaseInsightWidgetContextMenuItem[];
	public abstract fetchData(filters: BaseInsightWidgetDataFilter[]): Promise<DT>;

	protected async getDataset(chartFilters: BaseInsightWidgetDataFilter[]): Promise<DT> {
		// chartFilters.forEach((cf) => console.log(cf.toString()));
		this.noData = false;
		this.dataLoaded = false;
		this.loadedWithError = false;
		let chartData = null;
		try {
			chartData = await this.fetchData(Array.from(chartFilters.values()));
			// UTIL: uncomment this in order to simulate a delay in chart loading
			// await new Promise((r) => setTimeout(r, 3000));
			return chartData;
		} catch (err) {
			this.loadedWithError = true;
			console.error(err);
			throw err;
		} finally {
			this.dataLoaded = true;
			if (!chartData) {
				this.noData = true;
			}
		}
	}
}
