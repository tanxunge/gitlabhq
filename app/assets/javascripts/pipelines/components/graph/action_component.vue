<script>
import $ from 'jquery';
import tooltip from '../../../vue_shared/directives/tooltip';
import Icon from '../../../vue_shared/components/icon.vue';
import { dasherize } from '../../../lib/utils/text_utility';
import eventHub from '../../event_hub';
/**
 * Renders either a cancel, retry or play icon pointing to the given path.
 */
export default {
  components: {
    Icon,
  },

  directives: {
    tooltip,
  },

  props: {
    tooltipText: {
      type: String,
      required: true,
    },

    link: {
      type: String,
      required: true,
    },

    actionIcon: {
      type: String,
      required: true,
    },

    requestFinishedFor: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      isDisabled: false,
      linkRequested: '',
    };
  },

  computed: {
    cssClass() {
      const actionIconDash = dasherize(this.actionIcon);
      return `${actionIconDash} js-icon-${actionIconDash}`;
    },
  },
  watch: {
    requestFinishedFor() {
      if (this.requestFinishedFor === this.linkRequested) {
        this.isDisabled = false;
      }
    },
  },
  methods: {
    onClickAction() {
      $(this.$el).tooltip('hide');
      eventHub.$emit('graphAction', this.link);
      this.linkRequested = this.link;
      this.isDisabled = true;
    },
  },
};
</script>
<template>
  <button
    type="button"
    @click="onClickAction"
    v-tooltip
    :title="tooltipText"
    class="js-ci-action btn btn-blank
btn-transparent ci-action-icon-container ci-action-icon-wrapper"
    :class="cssClass"
    data-container="body"
    :disabled="isDisabled"
  >
    <icon :name="actionIcon" />
  </button>
</template>
