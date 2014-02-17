var through = require('through'),
    async = require('async'),
    path = require('path'),
    File = require('vinyl'),
    spritesmith = require('spritesmith'),
    generateCss = require('./lib/generateCss'),
    _ = require('lodash'),
    gutil = require('gulp-util');

var PluginError = gutil.PluginError;

module.exports = function (opt) {
    'use strict';
    opt = opt || {};
    var buffer = opt.groupBy ? {} : [],
        defaults = {
            'engine': 'auto',
            'algorithm': 'binary-tree',
            'padding': 1
        },
        params = _.extend({}, defaults, opt);

    function rename(file, group) {
        return file.replace(/\.(?=[^.]*$)/g, '.' + group + '.');
    }

    function processFiles(group, data, end) {
        var self = this;

        params.src = group ? buffer[group] : buffer;
        spritesmith(params, function (err, result) {
            if (err) {
                return self.emit('error', new PluginError('gulp-spritesmith', 'Error occurred during spritesmith processing'));
            }

            var imgPath = group ? rename(opt.imgPath, group) : opt.imgPath,
                cssStr = generateCss(result, imgPath, opt.styleTemplate);
            data({css: cssStr, img: result.image, group: group});
            end();
        });
    }

    function processByGroup(data, end) {
        function makeSprite(group, cb) {
            processFiles(group, data, cb);
        }

        async.each(Object.keys(buffer), makeSprite, end);
    }

    function bufferContents(file) {
        if (file.isNull()) { return; }// ignore
        if (file.isStream()) { return this.emit('error', new PluginError('gulp-spritesmith', 'Streaming not supported')); }

        var group = opt.groupBy,
            groupValue = '',
            parsedPath = file.relative.split(path.sep);

        //TODO refactor ugly code
        if (group) {
            parsedPath.filter(function (pth, i) {
                if (pth === group) { groupValue = parsedPath[i + 1]; }
            });
            if (!buffer[groupValue]) { buffer[groupValue] = []; }
            buffer[groupValue].push(file.path);
        } else {
            buffer.push(file.path);
        }
    }

    function endStream() {
        if (Object.keys(buffer).length === 0 || buffer.length === 0) { return this.emit('end'); }

        var self = this;

        function data(result) {
            self.emit('data', new File({
                cwd: './',
                base: './',
                path: result.group ? rename(opt.styleName, result.group) : opt.styleName,
                contents: new Buffer(result.css)
            }));

            self.emit('data', new File({
                cwd: './',
                base: './',
                path: result.group ? rename(opt.imgName, result.group) : opt.imgName,
                contents: new Buffer(result.img, 'binary')
            }));
        }
        function end() {
            self.emit('end');
        }

        ({}.toString.call(buffer) === '[object Array]') ? processFiles(null, data, end) : processByGroup(data, end);
    }

    return through(bufferContents, endStream);
};
