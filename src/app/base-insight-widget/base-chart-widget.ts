import { EChartsOption } from "echarts";
import { BaseWidget } from "./base-widget";

export interface BaseChartWidget<DT> extends BaseWidget<DT> {
	getChartOptions(dataset: DT): EChartsOption;
}
