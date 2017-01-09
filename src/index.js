import _ from 'underscore';
import bb from 'backbone';
import mn from 'backbone.marionette';

const StateView = mn.View.extend({
    initialize() {
        const initalState = _.result(this, 'defaultState');
        const stateEvents = _.result(this, 'stateEvents');

        // Create a model to hold the state
        const state = new bb.Model(initalState);

        // Bind stateEvents result to the state model
        mn.bindEvents(this, state, stateEvents);

        // Make the state model accessible to the view
        this.state = state;
    },

    defaultState: {},
    stateEvents: {},

    // Mix-in the state data
    serializeData(...args) {
        return {
            ...mn.View.prototype.serializeData.apply(this, args),
            _state: { ...this.state.attributes },
        };
    },
});

// Expose as Marionette.StateView
mn.StateView = StateView;

export default StateView;
