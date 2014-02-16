var path = require('path'),
    fs = require('fs'),
    json2css = require('json2css');

module.exports = function generateCss(result, imgPath, cssTemplate) {
    'use strict';

    var coordinates = result.coordinates,
        properties = result.properties,
        cleanCoords = [],
        cssFormat = 'custom';

    // Clean up the file name of the file
    Object.getOwnPropertyNames(coordinates).sort().forEach(function (file) {
        var fullname = path.basename(file),
        nameParts = fullname.split('.');

        if (nameParts.length >= 2) {
            nameParts.pop();
        }

        var name = nameParts.join('.'),
        coords = coordinates[file];
        coords.name = name;
        coords.source_image = file;
        coords.image = imgPath;
        coords.total_width = properties.width;
        coords.total_height = properties.height;
        cleanCoords.push(coords);
    });

    if (cssTemplate) {
        var mustache = fs.readFileSync(cssTemplate, 'utf8');
        json2css.addMustacheTemplate(cssFormat, mustache);
    } else {
        cssFormat = 'css';
    }

    return json2css(cleanCoords, {format: cssFormat, formatOpts: {}});
};
