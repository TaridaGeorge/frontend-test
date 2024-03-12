import { BaseInsightWidgetContextMenuItem, BaseInsightWidgetDataFilter } from "./insight-widget.types";

export interface BaseWidget<DT> {
	getId(): string;
	getTitle(): string;
	getDescription(): string;
	getFilters(): BaseInsightWidgetDataFilter[];
	getContextMenuItems(): BaseInsightWidgetContextMenuItem[];
	fetchData(filters: BaseInsightWidgetDataFilter[]): Promise<DT>;
}
