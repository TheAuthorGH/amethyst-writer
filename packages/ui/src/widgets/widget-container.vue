<template>
  <div class="widget-container">
    <div
      v-for="(row, rowIndex) in rows"
      :key="rowIndex"
      class="row"
      :class="getRowClasses(row)"
    >
      <component
        :is="getWidgetComponent(widget)"
        v-for="(widget, widgetIndex) in getRowWidgets(rowIndex)"
        :key="widgetIndex"
        :class="getWidgetClasses(widget)"
        v-bind="widget.props || {}"
      />
    </div>
  </div>
</template>

<script>
import { widgets } from './index';

export default {
  props: {
    widgets: { type: Array, required: true },
    rows: { type: Array, default: () => [ { height: 1 } ] }
  },
  setup(props) {
    const getWidgetComponent = (widget) => widgets[widget.type];

    const getRowWidgets = (rowIndex) => props.widgets.filter((widget) => widget.layout.row === rowIndex);

    const getRowClasses = (row) => ({
      'row--greedy-height': row.greedyHeight
    });

    const getWidgetClasses = (widget) => {
      const layoutOptions = widget.layout || {};

      return {
        'widget--greedy-width': layoutOptions.greedyWidth,
        'widget--full-width': layoutOptions.fullWidth
      };
    };

    return {
      getWidgetComponent,
      getWidgetClasses,
      getRowWidgets,
      getRowClasses
    };
  }
};
</script>

<style lang="scss">
.widget-container {
  display: flex;
  flex-direction: column;

  .row {
    display: flex;
    overflow: auto;

    &--greedy-height {
      flex: 1;
    }
  }

  .widget {
    &--greedy-width {
      flex: 1;
    }

    &--full-width {
      width: 100%;
    }
  }
}
</style>
