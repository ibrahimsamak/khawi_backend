import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Options, ChangeContext, PointerType, LabelType } from "ng5-slider";

@Component({
  selector: "app-price",
  templateUrl: "./price.component.html",
  styleUrls: ["./price.component.scss"],
})
export class PriceComponent implements OnInit {
  @Output() priceFilters = new EventEmitter();

  minValue: number = 0;
  maxValue: number = 100000;
  options: Options = {
    floor: 0,
    ceil: 100000,

    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return "ر.س" + value;
        case LabelType.High:
          return "ر.س" + value;
        default:
          return "ر.س" + value;
      }
    },
  };
  public logText: string = "";
  public min: number;
  public max: number;

  onUserChangeStart(changeContext: ChangeContext): void {
    this.logText += `onUserChangeStart(${this.getChangeContextString(
      changeContext
    )})\n`;
  }

  onUserChange(changeContext: ChangeContext): void {
    this.logText += `onUserChange(${this.getChangeContextString(
      changeContext
    )})\n`;
  }

  onUserChangeEnd(changeContext: ChangeContext): void {
    this.logText += `onUserChangeEnd(${this.getChangeContextString(
      changeContext
    )})\n`;
  }

  getChangeContextString(changeContext: ChangeContext): string {
    this.min = changeContext.value;
    this.max = changeContext.highValue;
    this.priceFilters.emit(changeContext);
    return (
      `{pointerType: ${
        changeContext.pointerType === PointerType.Min ? "Min" : "Max"
      }, ` +
      `value: ${changeContext.value}, ` +
      `highValue: ${changeContext.highValue}}`
    );
  }

  constructor() {}

  ngOnInit() {}
}
