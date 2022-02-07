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

<script lang="ts" setup>
import { DefineComponent } from 'vue';

import { widgets } from './index';

// TODO: Move this to general configuration package
interface WidgetConfiguration {
  type: string;
  layout: {
    row: number;
    greedyWidth: boolean;
    fullWidth: boolean;
  };
  props: object;
}

interface WidgetRowConfiguration {
  greedyHeight: number;
}

const props = withDefaults(defineProps<{
  widgets: WidgetConfiguration[];
  rows?: WidgetRowConfiguration[];
}>(), {
  rows: () => [ { height: 1 } ]
});

const getWidgetComponent = (widget: WidgetConfiguration): DefineComponent => widgets[widget.type];

const getRowWidgets = (rowIndex: number) => props.widgets.filter((widget: any) => widget.layout.row === rowIndex);

const getRowClasses = (row: WidgetRowConfiguration) => ({
  'row--greedy-height': row.greedyHeight
});

const getWidgetClasses = (widget: WidgetConfiguration) => {
  const layoutOptions = widget.layout || {};

  return {
    'widget--greedy-width': layoutOptions.greedyWidth,
    'widget--full-width': layoutOptions.fullWidth
  };
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
