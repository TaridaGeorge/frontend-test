import { Component } from '@angular/core';
import { BaseWidgetComponent } from '../base-insight-widget/base-widget-component';
import { ECharts, EChartsOption } from 'echarts';

@Component({
  selector: 'app-chart-insight-widget',
  templateUrl: './chart-insight-widget.component.html',
  styleUrls: ['./chart-insight-widget.component.scss'],
})
export class ChartInsightWidgetComponent<DT> extends BaseWidgetComponent<DT> {
  minHeight: number;
  minWidth: number;
  height: number;
  width: number;

  public echartsInstance: ECharts;
  public chartOptions: EChartsOption;

  constructor() {
    super();
    this.minHeight = this.getMinHeight();
    this.minWidth = this.getMinWidth();
    this.height = this.getHeight();
    this.width = this.getWidth();
  }

  public onChartInit(ec) {
    this.echartsInstance = ec;
    this.widgetLoaded.emit(this);
    if (this.getHeight() != 0) {
      this.echartsInstance.resize({
        height: this.getHeight(),
      });
    }

    if (this.getWidth() != 0) {
      this.echartsInstance.resize({
        width: this.getWidth(),
      });
    }
  }

  public renderView(dataset: DT): void {
    this.chartOptions = this.getChartOptions(dataset);
  }

  public getMinHeight() {
    return 0;
  }

  public getMinWidth() {
    return 0;
  }

  public getHeight() {
    return 0;
  }

  public getWidth() {
    return 0;
  }

  public allowChartResize() {
    return true;
  }

  public getChartOptions(dataset: DT): EChartsOption {
    throw new Error('Method not implemented.');
  }

  public resizeToFitParent(): void {
    if (this.allowChartResize() === false) {
      return;
    }

    if (this.echartsInstance) {
      const parentWithOverflowHidden =
        this.echartsInstance.getDom().parentElement.parentElement;
      this.echartsInstance.resize({
        height: parentWithOverflowHidden.clientHeight,
        width: parentWithOverflowHidden.clientWidth,
      });
    }
  }
}
