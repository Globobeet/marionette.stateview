# Marionette.StateView

[![Build Status](https://travis-ci.org/Globobeet/marionette.stateview.svg?branch=master)](https://travis-ci.org/Globobeet/marionette.stateview)
[![Coverage Status](https://coveralls.io/repos/github/Globobeet/marionette.stateview/badge.svg?branch=master)](https://coveralls.io/github/Globobeet/marionette.stateview?branch=master)
[![Dependencies](https://david-dm.org/Globobeet/marionette.stateview.svg)](https://david-dm.org/Globobeet/marionette.stateview)
[![Dev-Dependencies](https://david-dm.org/Globobeet/marionette.stateview/dev-status.svg)](https://david-dm.org/Globobeet/marionette.stateview?type=dev)

Marionette.StateView is a simple extension of the default Marionette.View adding an additional bound model for maintaining view state.

## Installation

Install this package via [npm](https://npmjs.org).

```sh
$ npm install marionette.stateview
```

## Dependencies

- [Backbone](https://npmjs.com/package/backbone)
- [Underscore](https://npmjs.com/package/underscore) / [Lodash](https://npmjs.com/package/lodash)
- [jQuery](https://npmjs.com/package/jquery)
- [Backbone.Marionette](https://npmjs.com/package/backbone.marionette)

All dependencies are listed in the `package.json` as `peerDependencies`, as this package wouldn't make any sense for any other environment.

## Example

```js
import mn from 'backbone.marionette';

const TestView = mn.StateView.extend({

	// Any values provided to defaultState will be
	// set on the state model when it is initialized.
	// Can also be defined as a function that returns
	// data object.
	defaultState: {
		foo: 'bar',
		buz: ['baz', 'zed'],
	},

	intialize(...args) {

		// StateView events are bound when the view is initialized, so
		// if your view is overwriting the initilize function, be sure
		// to call the original first.
		mn.StateView.prototype.initialize.apply(this, args);

		// You can interact with the state model just as you would
		// any other entity
		this.state.set('anything', 'anything-else');
	},

	// State data is mixed into the template context as "_state"
	template: _.template('Tell me <%= _state.anything %>'),

	// Bind methods to events on the state model just like you
	// do with the view model & collection!
	stateEvents: {
		'change:anything': 'render',
	},
});
```

## Caveats

Marionette.StateView performs some custom actions in the View `initialize()` and `serializeData()` methods, so if your view overwrites those functions, besure to invoke the default as well.

## Contributing

Pull requests are always welcome! Please be sure to include any tests for new code & follow the current coding style as best you can.

You can run the test suite with the following command:

```
$ npm test
```


## License

Any contributions made to this project are covered under the MIT License, [found here](https://github.com/Globobeet/marionette.stateview/blob/master/license.md).
