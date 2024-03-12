import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { ChartInsightWidgetComponent } from './chart-insight-widget.component';

@NgModule({
  declarations: [ChartInsightWidgetComponent],
  imports: [CommonModule, NgxEchartsModule],
  exports: [NgxEchartsModule],
})
export class ChartInsightWidgetModule {}
