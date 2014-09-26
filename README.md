# apinatomy-core

This is the core component (widget) of the ApiNATOMY circuit-board system. It offers a jQuery plugin to
create visual [*treemaps*](http://en.wikipedia.org/wiki/Treemapping) that can be manipulated and made
dynamic through a flexible plugin system.

We will generally call the resulting visualization a *circuitboard*, because the plugin system allows for
various content to appear on top of the treemap, floating over the treemap, or interconnecting the tiles
inside the treemap. We will use the term *treemap* when we consider only the (nested) tile-structure.


## Installation

This library depends on
[jQuery](https://github.com/jquery/jquery),
[jQuery UI](https://github.com/jquery/jquery-ui),
[bluebird](https://github.com/petkaantonov/bluebird) and
[js-graph](https://github.com/mhelvens/js-graph).

### Install using Bower

`apinatomy-core` is available as a [Bower](http://bower.io/) package, installed as follows:

    bower install apinatomy-core

*Warning: At this very moment, the package is not yet available on Bower or NPM.
 If you happen to read this message, check back tomorrow.*

### Install using NPM

`apinatomy-core` is available as an [NPM](https://www.npmjs.org) package, installed as follows:

    npm install apinatomy-core

*Warning: At this very moment, the package is not yet available on Bower or NPM.
 If you happen to read this message, check back tomorrow.*


## Usage

The `apinatomy-core` packages use the [UMD](https://github.com/umdjs/umd) API, so they support
AMD ([RequireJS](http://requirejs.org/)), CommonJS and script-tags.

There are currently two types of files that may be loaded:

| File                          | Purpose                                                  |
|:----------------------------- |:-------------------------------------------------------- |
| `dist/amy-circuitboard.js`    | the main package, with the `.circuitboard` jQuery method |
| `dist/amy-p-<name>.js`        | one of many *plugins*, which enables new features        |

Check out the files in the `example` folder to see these files in use.

### Importing the Library

This is how to use the HTML `<script>` tag to import the library:

    <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
    <script src="https://code.jquery.com/ui/1.11.1/jquery-ui.min.js"></script>
    <script src="lib/apinatomy-core/dist/amy-circuitboard.min.js"></script>

### Instantiating a circuit-board

Then, an existing element can be turned into a circuit-board as follows:

    <div id="my-circuitboard"></div>

    <script>
        $('#my-circuitboard').circuitboard({
            // options
        });
    </script>

**However, before you get something useful from this, two extra ingredients are needed:
  a *model* and a set of *plugins*.**


## Models

The structure of the treemap is determined by a *model*. ApiNATOMY expects such a model
to offer a certain API in order to traverse its structure. At the very least, a model is
a JavaScript object with the following members:

*  A field `id` which contains a string; a unique identifier.
*  A method `getChildIds()` which returns
   (a [promise](https://github.com/petkaantonov/bluebird#what-are-promises-and-why-should-i-use-them) of)
   an array of identifiers, representing the direct children of this model.
*  A method `getChildren(ids)` which takes an array of identifiers, and returns
   (a promise of) an array filled with (promises of) the corresponding child models.
   Each child model again needs to satisfy these three properties.

ApiNATOMY allows these methods to return promises (rather than immediate data) because
the process of retrieving such data is likely to be asynchronous. For example, it may
send a server request, or attempt to load the data from disk.

A model is loaded into the circuit-board by use of an option:

    $('#my-circuitboard').circuitboard({
        model: myModel
    });

Each model may be represented by zero or more tiles in the treemap. I'll repeat that:
*zero or more tiles*. A model may never end up being displayed—by plugging in a filter
that rejects it—, or it may be displayed more than once—by being an ancestor of the
root tile through multiple paths. Note, however, that *no two distinct models may have
the same `id`*. In other words, it is expected that the model implementation takes care
of merging identical models into a single JavaScript object. (In the future, a caching
layer will be made available which can take care of this for you.)

Certain plugins may require other properties of a model. For example, the `tileskin` plugin
looks for a `name` property to display in the tile, and a `css` property to apply
customizable styling. But… what are plugins?

## Using Plugins

The bare `amy-circuitboard.js` widget creates some HTML to represent the top level
tiles, but otherwise does very little—not even load internal tiles. It is a minimal
core, meant to be extended by plugins before it will do any cool stuff. A number of
fundamental plugins are supplied with the core, `tile-skin` and `tile-click-to-open`
being basic examples.

Plugins should be selected before any circuit-board is instantiated. For example:

    $.circuitboard.plugin('tile-skin', 'tile-click-to-open');
    $('$my-circuitboard').circuitboard({
        model: myModel
    });

At this point, it is assumed that those plugins are already registered by loading their
respective JavaScript files. This is explained in the next section.

The `tile-skin` plugin gives the tiles a more comfortable look and feel, and differentiates
between the style of an open tile and a closed tile. `tile-click-to-open` actually allows
you to open tiles by clicking on them.

The plugin system allows ApiNATOMY to be only as big and complicated as you need, and
avoids mixing up concerns inside the code-base. As a result, it will be a lot easier
to extend ApiNATOMY to support new features.

There will be many more plugins for basic functionality, as it has become the main way
of implementing new features. Future versions will see a way to simplify and/or
automate loading the basic stuff.

## Developing Plugins

A plugin is a JavaScript object registered through the `$.circuitboard.plugin` method
(overloading the method that *selects* a plugin):

    $.circuitboard.plugin({
        name:  'my-plugin',
        if:    autoLoadingCondition,
        after: ['other-plugin-1', 'other-plugin-2'],

        /* operations */
    });

We'll look at each part of the object in a separate subsection.

`name`  | a unique identifier (a string) by which to refer to the plugin
`if`    | *(optional)* a condition under which the plugin will be loaded automatically (without explicitly selecting it).
          Use the value `true` to load the plugin unconditionally. Use an array of plugin names `['p-1', 'p-2']` to
          auto-load when each of those plugins is loaded too.
          Use a predicate function `function (others) { /*...*/ }` for full flexibility. It receives an object which
          maps names of plugins that are being loaded to `true`, and should return `true` to auto-load or `false` not to.
`after` | *(optional)* an array of plugin names. Each of them is guaranteed to be loaded before this plugin, if they are
          loaded at all. That way, this new plugin can expand upon their functionality.

The *operations*, which actually implement the plugin, deserve a separate subsection.

### Plugin Operations

Plugins modify the main ApiNATOMY components on a code level, by what is called *invasive composition*.
At the top level, a plugin specifies one or more main components to modify. There are currently three
components: `circuitboard`, `tilemap` and `tile`. To modify both tiles and tilemaps, the top level
will look something like this:

    $.circuitboard.plugin({
        /* mata information (see above) */

        'modify tile':    { /* details */ },
        'modify tilemap': { /* details */ }
    });

On the second level, a plugin can then `add`, `remove` and `replace` the properties of the component.
For example:

    $.circuitboard.plugin({
        /* mata information (see above) */

        'modify tile': {
            'add     newField':  "value of newField",
            'replace oldField1': "new value of oldField",
            'remove  oldField2': true /* value unimportant */
        }
    });

If a property happens to be a function, the `insert` and `after` operations are also available.

`insert` adds additional code to be run by an existing function property, or creates that
function property with the given code. This operation offers no guarantees as to the order
in which such blocks of code are run.

`after` actually runs the given code *after* the code already in the function is finished.
It is aware of asynchronous operations by use of *promises*. If the old function returns a
promise, the 'after' code actually waits to run until that promise is fulfilled. But you
can safely use `after` without having to know about promises.

    $.circuitboard.plugin({
        /* mata information (see above) */

        'modify tilemap': {
            'insert constructor': function () {
                /* run some code in the constructor */
            },
            'add refreshTileSpacing': function () {
                /* see 'amy-p-tile-spacing.js' for a full implementation */
            },
            'after refreshTiles': function () {
                this.refreshTileSpacing();
            }
        }
    });

The 'constructor' method is always present in a component, and is guaranteed to run for each
component instance immediately after all plugins have been loaded.

To get a better intuition behind plugins, you are encouraged to look at the files in `src/`.
All the ones that start with `amy-p-` are plugins.

Plugins continue to be refined (see, for example, #7 and #8). As plugins change, I hope to
keep this documentation somewhat up to date. But things are still moving rather quickly.
Be aware that the plugin API may still change in incompatible ways.
