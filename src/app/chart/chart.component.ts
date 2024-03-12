import { Component, OnInit } from '@angular/core';
import { ChartDataDTO } from './chart.data.dto';
import { ChartInsightWidgetComponent } from '../base-chart-insight-widget/chart-insight-widget.component';
import { HttpClient } from '@angular/common/http';
import {
  BaseInsightWidgetDataFilter,
  BaseInsightWidgetContextMenuItem,
} from '../base-insight-widget/insight-widget.types';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-chart',
  templateUrl:
    '../base-chart-insight-widget/chart-insight-widget.component.html',
  styleUrls: [
    '../base-chart-insight-widget/chart-insight-widget.component.scss',
  ],
})
export class ChartComponent
  extends ChartInsightWidgetComponent<ChartDataDTO[]>
  implements OnInit
{
  constructor(private httpClient: HttpClient) {
    super();
  }

  ngOnInit(): void {
    this.init();
  }

  public async init() {
    this.renderView(await this.fetchData([]));
  }

  public getWidth(): number {
    return this.width;
  }

  getTitle(): string {
    return 'Test chart';
  }

  getDescription(): string {
    return 'Test chart';
  }

  getFilters(): BaseInsightWidgetDataFilter[] {
    return [];
  }

  getContextMenuItems(): BaseInsightWidgetContextMenuItem[] {
    return [];
  }

  async fetchData(
    filters: BaseInsightWidgetDataFilter[]
  ): Promise<ChartDataDTO[]> {
    let data = await this.httpClient
      .get<any>('http://localhost:8080/1.json')
      .toPromise();

    return data as ChartDataDTO[];
  }

  public getChartOptions(dataset: ChartDataDTO[]): EChartsOption {
    return {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
        },
      ],
    };
  }
}
