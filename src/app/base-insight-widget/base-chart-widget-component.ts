import { EChartsOption } from "echarts";
import { BaseChartWidget } from "./base-chart-widget";
import { BaseWidgetAbstractComponent } from "./base-widget-abstract-component";

export abstract class BaseChartWidgetAbstractComponent<DT>
	extends BaseWidgetAbstractComponent<DT>
	implements BaseChartWidget<DT>
{
	public abstract getChartOptions(dataset: DT): EChartsOption;
}
