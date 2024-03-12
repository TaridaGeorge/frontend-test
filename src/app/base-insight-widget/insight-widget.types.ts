import { Moment } from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { BaseWidget } from './base-widget';

export type BaseInsightWidgetContextMenuItem = {
  icon: string;
  label: string;
  onClick: (event: any, chart: BaseWidget<any>) => void;
};

export enum BaseInsightWidgetDataFilterType {
  START_DATE,
  END_DATE,
  PROJECTS,
  TEAMS,
  CALL_STATUSES,
  SUPERVISORS,
  USERS,
  MONTHS,
  WEEKS,
  REP_TENURE,
  FLAGS,
  FLAG_UNITS,
  LABELS,
  HOURS,
  LIKE_DISLIKE,
}

export class BaseInsightWidgetDataFilter {
  value: any = null;
  id: string = uuidv4();

  // other filter types that this filter depends on
  dependsOn: any = null;

  constructor(private type: BaseInsightWidgetDataFilterType) {}

  setValue(value: any) {
    this.value = value;
  }

  getType() {
    return this.type;
  }

  getValue() {
    return this.value;
  }

  toString() {
    return (
      `id: ${this.id} ` +
      BaseInsightWidgetDataFilterType[this.type].toString() +
      ` values: ${this.value}`
    );
  }

  accept(externalDataFilter: BaseInsightWidgetDataFilter) {}
}

export class WeeksInsightWidgetDataFilter extends BaseInsightWidgetDataFilter {
  override dependsOn = [
    BaseInsightWidgetDataFilterType.START_DATE,
    BaseInsightWidgetDataFilterType.END_DATE,
  ];

  constructor(public startDate: Moment, public endDate: Moment) {
    super(BaseInsightWidgetDataFilterType.WEEKS);
  }

  override accept(externalDataFilter: BaseInsightWidgetDataFilter) {
    if (
      externalDataFilter.getType() ===
      BaseInsightWidgetDataFilterType.START_DATE
    ) {
      this.startDate = externalDataFilter.getValue();
    }

    if (
      externalDataFilter.getType() === BaseInsightWidgetDataFilterType.END_DATE
    ) {
      this.endDate = externalDataFilter.getValue();
    }
  }
}

export class MonthsInsightWidgetDataFilter extends BaseInsightWidgetDataFilter {
  override dependsOn = [
    BaseInsightWidgetDataFilterType.START_DATE,
    BaseInsightWidgetDataFilterType.END_DATE,
  ];

  constructor(public startDate: Moment, public endDate: Moment) {
    super(BaseInsightWidgetDataFilterType.MONTHS);
  }

  override accept(externalDataFilter: BaseInsightWidgetDataFilter) {
    if (
      externalDataFilter.getType() ===
      BaseInsightWidgetDataFilterType.START_DATE
    ) {
      this.startDate = externalDataFilter.getValue();
    }

    if (
      externalDataFilter.getType() === BaseInsightWidgetDataFilterType.END_DATE
    ) {
      this.endDate = externalDataFilter.getValue();
    }
  }
}
