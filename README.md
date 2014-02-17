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

#### options.algorithm
Type: `String`
Default: `binary-tree`

Set packing algorithm, top-down/left-right/diagonal/alt-diagonal/binary-tree are available.

#### options.algorithm
Type: `Number`
Default: `1`

Set padding in pixels to use between images

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/gulp-spritesmith
[npm-image]: https://badge.fury.io/js/gulp-spritesmith.png

[depstat-url]: https://david-dm.org/otouto/gulp-spritesmith
[depstat-image]: https://david-dm.org/otouto/gulp-spritesmith.png
