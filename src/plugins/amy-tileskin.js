define(['jquery', '../util.js'], function ($) {

    $.CSS('.skinned-tile')
        .addRule('display', 'flex')
        .addRule('flex-direction', 'column');
    $.CSS('.skinned-tile > header')
        .addRule('display', 'flex')
        .addRule('align-items', 'center')
        .addRule('justify-content', 'center')
        .addRule('font-weight', 'bold')
        .addRule('border-width', '1px')
        .addRule('overflow', 'hidden');
    $.CSS('.skinned-tile.open > header')
        .addRule('height', '26px')
        .addRule('border-style', 'none none solid none')
        .addRule('line-height', '26px')
        .addRule('font-size', '19.5px')
        .addRule('white-space', 'nowrap');
    $.CSS('.skinned-tile:not(.open) > header')
        .addRule('flex-grow', 1);
    $.CSS('.skinned-tile.open > section')
        .addRule('flex-grow', 1);
    $.CSS('.skinned-tile:not(.open) > section')
        .addRule('display', 'none');

    return function skin(tile) {
        var origElement = tile.html;
        origElement.addClass('skinned-tile');
        origElement.append(`<header>${tile.model.id}</header><section/>`);
        tile.html = origElement.children('section');
        tile.html.css('padding', tile.options.tileSpacing)
    }
});
