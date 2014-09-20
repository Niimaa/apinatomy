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

There are currently three files that may be loaded (with more to follow):

| File                        | Purpose                                                        |
|:--------------------------- |:-------------------------------------------------------------- |
| `dist/amy-circuitboard.js`  | the main package, installing the `.circuitboard` jQuery plugin |
| `dist/amy-skin.js`          | an plugin, which gives individual tiles color and layout       |
| `dist/amy-click-to-open.js` | an plugin, which reacts to clicks by opening a tile            |
| `dist/amy-tilespacing`      | an plugin, which offers customizable tile-spacing              |

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
        $('$my-circuitboard').circuitboard({
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

    $('$my-circuitboard').circuitboard({
        model: myModel
    });

Each model may be represented by zero or more tiles in the treemap. I'll repeat that:
*zero or more tiles*. A model may never end up being displayed—by plugging in a filter
that rejects it—, or it may be displayed more than once—by being an ancestor of the
root tile through multiple paths. Note, however, that *no two distinct models may have
the same `id`*. In other words, it is expected that the model implementation takes care
of merging identical models into a single JavaScript object. (In the future, a caching
layer will be made available which can take care of this for you.)

Certain plugins may require other properties of a model. For example, the `skin` plugin
looks for a `name` property to display in the tile, and a `css` property to apply
customizable styling. But… what are plugins?

## Plugins

The bare `amy-circuitboard.js` widget creates some HTML to represent the top level
tiles, but otherwise does very little—not even load internal tiles. It is a minimal
core, meant to be extended by plugins before it will do any cool stuff. A number of
fundamental plugins are supplied with the core, `skin` and `click-to-open` being
particularly useful.

Plugins should be loaded into the circuit-board system before any circuit-board is
instantiated. For example:

    $.circuitboard.plugin( $.circuitboard.p.skin()                             );
    $.circuitboard.plugin( $.circuitboard.p.clickToOpen({ weightWhenOpen: 3 }) );
    $('$my-circuitboard').circuitboard({
        model: myModel
    });

The former plugin gives the tiles a more comfortable look and feel, and differentiates
between the style of an open tile and a closed tile. The latter actually allows you to
open tiles by clicking on them.

The plugin system allows ApiNATOMY to be only as big and complicated as you need, and
avoids mixing up concerns inside the code-base. As a result, it will be a lot easier
to extend ApiNATOMY to support new features.

### Developing Plugins

The process of developing plugins will be documented in the near future, when the API
has stabilized. Until then, you are invited to look at the existing plugins to get a
general idea of how it works.
