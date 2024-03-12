import {
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import {
  BaseInsightWidgetContextMenuItem,
  BaseInsightWidgetDataFilter,
  BaseInsightWidgetDataFilterType,
} from './insight-widget.types';
import { BaseWidgetAbstractComponent } from './base-widget-abstract-component';

@Directive()
export class BaseWidgetComponent<DT>
  extends BaseWidgetAbstractComponent<DT>
  implements OnInit, OnDestroy
{
  @Output() widgetLoaded = new EventEmitter<BaseWidgetComponent<DT>>();
  @ViewChild('widgetWrapper') widgetWrapper: ElementRef | undefined = undefined;

  public gridItem: any;

  public FilterType = BaseInsightWidgetDataFilterType;

  public filtersOn: boolean = false;
  public filters: BaseInsightWidgetDataFilter[] = [];

  private externalFiltersMap: Map<number, BaseInsightWidgetDataFilter> =
    new Map();

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.filters = this.getFilters();
  }

  ngOnDestroy(): void {}

  public applyFilters() {
    this.requestPaint();
  }

  public getId() {
    return uuidv4();
  }

  public getTitle(): string {
    throw new Error('Method not implemented.');
  }

  public getDescription(): string {
    throw new Error('Method not implemented.');
  }

  public getFilters(): BaseInsightWidgetDataFilter[] {
    throw new Error('Method not implemented.');
  }

  public getContextMenuItems(): BaseInsightWidgetContextMenuItem[] {
    throw new Error('Method not implemented.');
  }

  public fetchData(chartFilters: BaseInsightWidgetDataFilter[]): Promise<DT> {
    throw new Error('Method not implemented.');
  }

  private async requestPaint() {
    const externalFilters = Array.from(this.externalFiltersMap.values());
    const chartFilters = this.filters;
    const dataset = await this.getDataset([
      ...externalFilters,
      ...chartFilters,
    ]);
    this.renderView(dataset);
    this.widgetLoaded.emit(this);
  }

  public renderView(dataset: DT) {
    throw new Error('Method not implemented.');
  }

  public resizeToFitParent() {}

  public openDrillDownDrillUpView() {}
}
