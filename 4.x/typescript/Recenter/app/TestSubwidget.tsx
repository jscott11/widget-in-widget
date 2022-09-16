import { subclass } from "esri/core/accessorSupport/decorators";
import Widget from "esri/widgets/Widget";
import { tsx } from "esri/widgets/support/widget";

interface TestSubWidgetParams extends __esri.WidgetProperties {
  label: string;
}

@subclass("esri.widgets.TestSubWidget")
class TestSubWidget extends Widget {
  constructor(params?: TestSubWidgetParams) {
    super(params);
  }

  override render() {
    return <div>{this.label}</div>;
  }
}

export = TestSubWidget;
