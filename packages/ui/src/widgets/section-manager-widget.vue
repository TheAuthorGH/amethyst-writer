<template>
  <div class="widget widget--section-manager">
    <h3>Sections</h3>

    <ul>
      <li
        v-for="section in sections"
      >
        <button
          class="section-button"
          :class="getSectionButtonClasses(section)"
          @click="setCurrentSectionUuid(section.uuid)"
        >
          {{ section.title }}
        </button>

        <button
          title="Delete this section"
          :disabled="sections.length < 2"
          @click="deleteSection(section.uuid)"
        >
          -
        </button>
      </li>
    </ul>

    <!-- TODO: I think this is better off being opened by an edit button -->
    <input
      :value="currentSection.title"
      placeholder="Name the current section"
      title="Name the current section"
      @input="setCurrentSectionTitle($event.target.value)"
    />

    <button
      @click="createNewSection(`Chapter ${currentDocument.sections.length + 1}`)"
    >
      + Create new section
    </button>
  </div>
</template>

<script>
import { computed } from 'vue';

import { getOrderedSections } from '@amethyst-writer/document/dist/index';

import { useDocuments } from '@src/plugins';

export default {
  setup() {
    const {
      currentDocument,
      updateCurrentDocument,
      createNewSection,
      currentSectionUuid,
      currentSection,
      setCurrentSectionUuid
    } = useDocuments();

    const sections = computed(() => getOrderedSections(currentDocument.value.sections));

    const getSectionButtonClasses = (section) => {
      return {
        'selected': currentSectionUuid.value === section.uuid
      };
    };

    const deleteSection = (sectionUuid) => {
      // TODO: Improve warning prompt
      if (!confirm('Really delete section? All content in section will be lost!')) {
        return;
      }

      // TODO: I'm doing this TWICE!!!
      const remainingSections = currentDocument.value.sections.filter((section) => section.uuid !== sectionUuid);

      setCurrentSectionUuid(remainingSections[0].uuid);

      updateCurrentDocument({
        nodes: currentDocument.value.nodes.filter((node) => node.sectionUuid !== sectionUuid),
        sections: remainingSections
      });
    };

    const setCurrentSectionTitle = (title) => {
      // TODO: I'm doing this twice!
      const remainingSections = currentDocument.value.sections.filter((section) => section.uuid !== currentSectionUuid.value);

      updateCurrentDocument({
        sections: [
          ...remainingSections,
          { ...currentSection.value, title }
        ]
      });
    };

    return {
      // TODO: Make the sorting of these things consistent.
      currentSectionUuid,
      setCurrentSectionUuid,
      currentDocument,
      currentSection,
      createNewSection,

      sections,
      getSectionButtonClasses,
      deleteSection,
      setCurrentSectionTitle
    }
  }
};
</script>

<style lang="scss">
.widget--section-manager {
  display: flex;
  flex-direction: column;

  // TODO: General style???
  button {
    margin-top: 0.8rem;
  }

  ul {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.6rem;
  }

  li {
    display: flex;
  }

  .section-button {
    margin-right: 0.8rem;
    flex: 1;

    // TODO: Should this be general?
    max-width: 19rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  input {
    margin-top: 0.8rem;
  }
}
</style>
