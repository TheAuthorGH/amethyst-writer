import { DefineComponent } from 'vue';

import openConfigurationEditor from './open-configuration-editor-widget.vue';
import documentNavigator from './document-navigator-widget.vue';
import toolbar from './toolbar-widget.vue';
import writer from './writer-widget.vue';
import preview from './preview-widget.vue';
import sectionManager from './section-manager-widget.vue';
import documentMetaEdit from './document-meta-edit-widget.vue';
import documentStats from './document-stats-widget.vue';
import documentExport from './document-export-widget.vue';
import themeSelector from './theme-selector-widget.vue';

export const widgets: Record<string, DefineComponent> = {
  openConfigurationEditor,
  documentNavigator,
  toolbar,
  writer,
  preview,
  sectionManager,
  documentMetaEdit,
  documentStats,
  documentExport,
  themeSelector
};
