import { subclass, property } from "esri/core/accessorSupport/decorators";
import Widget from "esri/widgets/Widget";
import { init } from "esri/core/watchUtils";
import { tsx } from "esri/widgets/support/widget";
import Point from "esri/geometry/Point";
import MapView from "esri/views/MapView";
import TestSubWidget from "./TestSubwidget";

type Coordinates = Point | number[] | any;

interface Center {
  x: number;
  y: number;
}

interface State extends Center {
  interacting: boolean;
  scale: number;
}

interface Style {
  textShadow: string;
}

const CSS = {
  base: "recenter-tool"
};

interface RecenterParams extends __esri.WidgetProperties {
  view: MapView;
  initialCenter: number[];
}

@subclass("esri.widgets.Recenter")
class Recenter extends Widget {
  constructor(params?: RecenterParams) {
    super(params);
  }

  override postInitialize() {
    init(this, "view.center, view.interacting, view.scale", () => this._onViewChange());
  }

  @property()
  view: MapView;

  initialCenter: Coordinates;

  @property()
  state: State;

  override render() {
    const { x, y, scale } = this.state;
    const styles: Style = {
      textShadow: this.state.interacting ? "-1px 0 red, 0 1px red, 1px 0 red, 0 -1px red" : ""
    };
    return (
      <div bind={this} class={CSS.base} styles={styles} onclick={this._defaultCenter}>
        <p>x: {Number(x).toFixed(3)}</p>
        <p>y: {Number(y).toFixed(3)}</p>
        <p>scale: {Number(scale).toFixed(5)}</p>

        {["hello", "world"].map((label) => (
          <TestSubWidget label={label} />
        ))}
      </div>
    );
  }

  private _onViewChange() {
    let { interacting, center, scale } = this.view;
    this.state = {
      x: center.x,
      y: center.y,
      interacting,
      scale
    };
  }

  private _defaultCenter() {
    this.view.goTo(this.initialCenter);
  }
}

export = Recenter;
