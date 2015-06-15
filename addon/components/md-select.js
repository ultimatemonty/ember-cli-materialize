import Ember from 'ember';
import MaterializeInputField from './md-input-field';
import layout from '../templates/components/md-select';

export default MaterializeInputField.extend({
  layout: layout,

  optionLabelPath: 'content',
  optionValuePath: 'content',

  _registeredInputEvents: ['blur','click','close','focus','keydown','open'],
  _registeredListEvents: ['click'],

  didInsertElement() {
    this._super(...arguments);
    this._setupSelect();
  },

  willDestroyElement() {
    console.log('willDestroyElement triggered');
    this._super(...arguments);
    this._teardownSelect();
  },

  _setupSelect() {
    this.$('select').material_select();
  },

  // TODO: clean up any listeners that $.select() puts in place
  _teardownSelect() {
    this._registeredInputEvents.map(function(evt) {
      this.$('input').off(evt);
    });

    this._registeredListEvents.map(function(evt) {
      this.$('.dropdown-content').off(evt);
    });
  },

  //TODO: this could be converted to a computed property, returning a string
  //  that is bound to the class attribute of the inputSelector
  errorsDidChange: Ember.observer('errors', function() {
    var inputSelector = this.$('input');
    // monitor the select's validity and copy the appropriate validation class to the materialize input element.
    Ember.run.later(this, function() {
      var isValid = this.$('select').hasClass('valid');
      if (isValid) {
        inputSelector.removeClass('invalid');
        inputSelector.addClass('valid');
      } else {
        inputSelector.removeClass('valid');
        inputSelector.addClass('invalid');
      }
    }, 150);
  })
});
