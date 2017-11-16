# Marionette.StateView

[![Build Status](https://travis-ci.org/Globobeet/marionette.stateview.svg?branch=master)](https://travis-ci.org/Globobeet/marionette.stateview)
[![Coverage Status](https://coveralls.io/repos/github/Globobeet/marionette.stateview/badge.svg?branch=master)](https://coveralls.io/github/Globobeet/marionette.stateview?branch=master)
[![Dependencies](https://david-dm.org/Globobeet/marionette.stateview.svg)](https://david-dm.org/Globobeet/marionette.stateview)
[![Dev-Dependencies](https://david-dm.org/Globobeet/marionette.stateview/dev-status.svg)](https://david-dm.org/Globobeet/marionette.stateview?type=dev)
[![Peer-Dependencies](https://david-dm.org/Globobeet/marionette.stateview/peer-status.svg)](https://david-dm.org/Globobeet/marionette.stateview?type=peer)

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

	// You can interact with the state model just as you would
	// any other entity
	initialize() {
		this.state.set('loading', true);
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

## Passing-in State

State passed into a new instance of a view will be applied to the instance's state model on construction, mixing-in any defaultState the view class defined:

```js
import mn from 'backbone.marionette';

const TestView = mn.StateView.extend({
	template: false,
	defaultState: {
		foo: 'foo-initial',
		bar: 'bar-initial',
	},
});

const view = new TestView({
	state: {
		foo: 'foo-custom',
		other: 'other-value',
	},
});

console.log(view.state.toJSON());
// {
//		foo: 'foo-custom',
//		bar: 'bar-initial',
//		other: 'other-value',
// }
```

## Sharing state

State can be shared across multiple views by passing an existing state model in the view instance options. Any default state provided by the new view will be mixed into the state model that's passed:

```js
import mn from 'backbone.marionette';

const TestViewA = mn.StateView.extend({
	template: false,
	defaultState: {
		foo: 'foo-initial',
	},
});

const TestViewB = mn.StateView.extend({
	template: false,
	defaultState: {
		bar: 'bar-initial',
	},
});

const viewA = new TestViewA();
const viewB = new TestViewB({ state: viewA.state });

console.log(viewA.state === viewB.state); // true
console.log(viewA.state.toJSON());
// {
// 		foo: 'foo-initial',
// 		bar: 'bar-initial',
// }

```

## Caveats

Marionette.StateView performs some custom actions in the View `serializeData()` method, so if your view overwrites this function, be sure to invoke the default as well.

## Contributing

Pull requests are always welcome! Please be sure to include any tests for new code & follow the current coding style as best you can.

You can run the test suite with the following command:

```
$ npm test
```


## License

Any contributions made to this project are covered under the MIT License, [found here](https://github.com/Globobeet/marionette.stateview/blob/master/license.md).
