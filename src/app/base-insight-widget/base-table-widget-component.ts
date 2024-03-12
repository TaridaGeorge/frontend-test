import { BaseTableWidget } from "./base-table-widget";
import { BaseWidgetAbstractComponent } from "./base-widget-abstract-component";

export abstract class BaseTableWidgetComponent<DT>
	extends BaseWidgetAbstractComponent<DT>
	implements BaseTableWidget<DT>
{
	abstract renderTable(dataset: DT);
}
