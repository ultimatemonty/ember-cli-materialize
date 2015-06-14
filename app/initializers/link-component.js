import Ember from 'ember';

export function initialize(/* container, application */) {
  Ember.LinkComponent.reopen({
    attributeBindings: ['data-activates']
  });
}

export default {
  name: 'link-component',
  initialize: initialize
};
