# apinatomy-core

This is the core component (widget) of the ApiNATOMY circuit-board system. It offers a jQuery plugin to create
visual *treemaps* that can be manipulated and made dynamic through a flexible plugin system.

## Installation

This library depends on
[jQuery](https://github.com/jquery/jquery),
[jQuery UI](https://github.com/jquery/jquery-ui),
[bluebird](https://github.com/petkaantonov/bluebird) and
[js-graph](https://github.com/mhelvens/js-graph).

### Install using Bower

`apinatomy-core` is available as a Bower package, installed as follows:

    bower install apinatomy-core

*Warning: At this very moment, the package is not yet available on Bower or NPM.
 If you happen to read this message, check back tomorrow.*

### Install using NPM

`apinatomy-core` is available as an NPM package, installed as follows:

    npm install apinatomy-core

*Warning: At this very moment, the package is not yet available on Bower or NPM.
 If you happen to read this message, check back tomorrow.*

## Usage

The `apinatomy-core` packages use the [UMD](https://github.com/umdjs/umd) API, so they support
AMD ([RequireJS](http://requirejs.org/)), CommonJS and script-tags.

There are currently three files that may be loaded (with more to follow):

| File                       | Purpose                                                              |
|:-------------------------- |:-------------------------------------------------------------------- |
| `dist/amy-circuitboard.js` | the main package, installing the `.circuitboard` jQuery plugin       |
| `dist/amy-skin.js`         | an ApiNATOMY plugin, which gives individual tiles color and layout   |
| `dist/amy-tilespacing`     | an ApiNATOMY plugin, which offers customizable spacing between tiles |

Check out the files in the `example` folder to see these files in use.

More extensive documentation will follow in the near future.
