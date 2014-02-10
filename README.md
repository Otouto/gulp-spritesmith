# gulp-spritesmith
[![NPM version][npm-image]][npm-url] [![Dependency Status][depstat-image]][depstat-url]

> [Gulp](https://github.com/wearefractal/gulp) plugin for sprite generation, based on spritesmith.

## Usage

First, install `gulp-spritesmith` as a development dependency:

```shell
npm install --save-dev gulp-spritesmith
```

Then, add it to your `gulpfile.js`:

```javascript
var spritesmith = require("gulp-spritesmith");

gulp.task('sprites', function () {
    return gulp.src('./src/img/*.png')
        .pipe(spritesmith({
            destImg: 'dist/img/sprite.png',
            destCSS: 'dist/css/sprite.css'
        }));
});
```

## API

### spritesmith(options)

#### options.destImg
Type: `String`
Default: ``

Path where you want to get your image sprite.

#### options.destCSS
Type: `String`
Default: ``

Path where you want to get your css sprite.

#### options.cssTemplate
Type: `String`
Default: ``

Path to mustache tmpl file, to format output css.


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/gulp-spritesmith
[npm-image]: https://badge.fury.io/js/gulp-spritesmith.png

[depstat-url]: https://david-dm.org/otouto/gulp-spritesmith
[depstat-image]: https://david-dm.org/otouto/gulp-spritesmith.png
