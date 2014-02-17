# gulp-spritesmith
[![NPM version][npm-image]][npm-url] [![Dependency Status][depstat-image]][depstat-url]

> [Gulp](https://github.com/wearefractal/gulp) plugin for sprite generation, based on spritesmith.

## Usage

First, install `gulp-spritesmith` as a development dependency:

```shell
npm i -D gulp-spritesmith
```

Then, add it to your `gulpfile.js`:

```javascript
var spritesmith = require("gulp-spritesmith");
var gulpif = require("gulp-if");

gulp.task('sprites', function () {
    return  gulp.src('./src/**/png/*.png')
                .pipe(tasks.spritesmith({
                    imgName: 'sprite.png',
                    styleName: 'sprite.css',
                    imgPath: '../img/sprite.png'
                }))
                .pipe(gulpif('*.png', gulp.dest('./dist/img/')))
                .pipe(gulpif('*.css', gulp.dest('./dist/css/')));
});
```

If you need few grouped sprites, you should specify folder name to group by. Lets say you have following app structure, with several skins:

* **/Module1**
    * **...**
    * **/skin**
        * **/basic**
            * **/png**
        * **/green**
             * **/png**
        * **/dark**
             * **/png**
        * **/light**
            * **/png**
* **...**
* **/ModuleN**
    * **...**
    * **/skin**
        * **/basic**
            * **/png**
        * **/green**
        * **/dark**
            * **/png**
        * **/light**

Then just set `skin` for groupBy param:
```javascript
gulp.task('sprites', function () {
    return  gulp.src('./src/**/png/*.png')
                .pipe(tasks.spritesmith({
                    imgName: 'sprite.png',
                    styleName: 'sprite.css',
                    imgPath: '../img/sprite.png',
                    groupBy: 'skin'
                }))
                .pipe(gulpif('*.png', gulp.dest('./dist/img/')))
                .pipe(gulpif('*.css', gulp.dest('./dist/css/')));
});
```
and you`ll get 4 sprites: sprite.basic.png, sprite.green.png, sprite.dark.png, sprite.light.png. And the same for css.


## API

### spritesmith(options)

#### options.imgName
Type: `String`
Default: ``

Set name for sprite img file.

#### options.styleName
Type: `String`
Default: ``

Set name for sprite styles file.

#### options.imgPath
Type: `String`
Default: ``

Set relative path to sprite img, which will be used in styles file.

#### options.styleTemplate
Type: `String`
Default: ``

Path to mustache tmpl file, to format output styles file.

Set relative path to sprite img, which will be used in styles file.

#### options.groupBy
Type: `String`
Default: ``

Set if you want to get grouped sprites.

#### options.algorithm
Type: `String`
Default: `binary-tree`

Set packing algorithm, top-down/left-right/diagonal/alt-diagonal/binary-tree are available.

#### options.algorithm
Type: `Number`
Default: `1`

Set padding in pixels to use between images

## Changelog
0.0.2 - Dont save sprite files inside task anymore.

0.0.1 - initial version

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/gulp-spritesmith
[npm-image]: https://badge.fury.io/js/gulp-spritesmith.png

[depstat-url]: https://david-dm.org/otouto/gulp-spritesmith
[depstat-image]: https://david-dm.org/otouto/gulp-spritesmith.png
