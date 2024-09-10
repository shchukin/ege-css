var del = require('del');
var run = require('run-sequence');

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var cleanCSS = require('gulp-clean-css');
var size = require('gulp-size');
var postcss = require('gulp-postcss');
var sprites = require('postcss-sprites').default;
var cssnext = require('postcss-cssnext');
var base64 = require('gulp-base64');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var change = require('gulp-change');



function releaseFromGlobal(content) {
    var source = content.split('\n');
    var outputLine = '';
    var result = '';

    source.forEach(function (line) {

        if (line.indexOf('global') !== -1) {
            outputLine = line;
            outputLine = outputLine.replace('../global/', '');
            result += outputLine + '\n';
        }
        else {
            result += line + '\n';
        }

    });

    return result;
}

function addSourcesTimestamp(content) {
    var source = content.split('\n');
    var outputLine = '';
    var result = '';

    var timestamp = Math.round(new Date().getTime() / 1000);


    source.forEach(function (line) {

        if (line.indexOf('rel="stylesheet"') !== -1) {
            outputLine = line.replace('.css"', '.css?' + timestamp + '"');
            result += outputLine + '\n';
        }
        else if (line.indexOf('<script') !== -1 && line.indexOf('src="') !== -1 && line.indexOf('vendors/') === -1) {
            outputLine = line.replace('.js"', '.js?' + timestamp + '"');
            result += outputLine + '\n';
        }
        else {
            result += line + '\n';
        }

    });

    return result;
}

function uncommentGoogleFonts(content) {
    var source = content.split('\n');
    var outputLine = '';
    var result = '';

    source.forEach(function (line) {

        if (line.indexOf('google') !== -1 && line.indexOf('fonts') !== -1) {
            outputLine = line;
            outputLine = outputLine.replace('<!--', '');
            outputLine = outputLine.replace('-->', '');
            result += outputLine + '\n';
        }
        else {
            result += line + '\n';
        }

    });

    return result;
}






function globalSymbolsImgToSpriteSvg(content) {
    return symbolsImgToSpriteSvg(content, 'global');
}

function freeSymbolsImgToSpriteSvg(content) {
    return symbolsImgToSpriteSvg(content, 'free');
}

function onlineSymbolsImgToSpriteSvg(content) {
    return symbolsImgToSpriteSvg(content, 'online');
}

function rusSymbolsImgToSpriteSvg(content) {
    return symbolsImgToSpriteSvg(content, 'rus');
}

function storeSymbolsImgToSpriteSvg(content) {
    return symbolsImgToSpriteSvg(content, 'store');
}

function storeEgenatorSymbolsImgToSpriteSvg(content) {
    return symbolsImgToSpriteSvg(content, 'storeEgenator');
}

function mainSymbolsImgToSpriteSvg(content) {
    return symbolsImgToSpriteSvg(content, 'main');
}


function symbolsImgToSpriteSvg(content, project) {

    var source = content.split('\n');
    var outputLine = [];
    var result = '';

    var i;
    var indentString;
    var classString;
    var idString;
    var widthString;
    var heightString;
    var titleString;
    var srcString;
    var pathString;
    var nameString;
    var timestamp = Math.round(new Date().getTime() / 1000);

    source.forEach(function (line) {

        if (line.indexOf('symbols/') !== -1) {

            /* get indent */

            for (indentString = '', i = 0; i < line.indexOf('<img'); i++) {
                indentString += ' ';
            }


            /* get attributes */

            classString = line.match('class[ \t]*=[ \t]*"[^"]+"');
            idString = line.match('id[ \t]*=[ \t]*"[^"]+"');
            widthString = line.match('width[ \t]*=[ \t]*"[^"]+"');
            heightString = line.match('height[ \t]*=[ \t]*"[^"]+"');
            titleString = line.match('title[ \t]*=[ \t]*"[^"]+"');

            classString = classString ? classString[0] : null;
            idString = idString ? idString[0] : null;
            widthString = widthString ? widthString[0] : null;
            heightString = heightString ? heightString[0] : null;
            titleString = titleString ? titleString[0] : null;


            /* get path and name */

            srcString = line.match('src[ \t]*=[ \t]*"[^"]+"');
            srcString = srcString[0];
            srcString = srcString.replace('src="', '');
            srcString = srcString.replace('"', '');

            nameString = srcString.replace(/^.*[\\\/]/, '');
            nameString = nameString.replace('.svg', '');

            pathString = srcString.replace(nameString + '.svg', '');

            if( project === 'free' ) {
                pathString = pathString.replace('global', 'free');
            }

            if( project === 'online' ) {
                pathString = pathString.replace('global', 'online');
            }

            if( project === 'rus' ) {
                pathString = pathString.replace('global', 'rus');
            }

            if( project === 'store' ) {
                pathString = pathString.replace('global', 'store');
            }
            if( project === 'storeEgenator' ) {
                pathString = pathString.replace('global', 'storeEgenator');
            }

            if( project === 'main' ) {
                pathString = pathString.replace('global', 'main');
            }


            /* write down results */

            outputLine[0] = indentString + '<svg' + ( classString ? ' ' + classString : '') + ( idString ? ' ' + idString : '') + ( widthString ? ' ' + widthString : '') + ( heightString ? ' ' + heightString : '') + '>';
            outputLine[1] = indentString + '    ' + '<use xlink:href="' + pathString + 'symbols.svg?' + timestamp + '#' + nameString + '"></use>';
            outputLine[2] = indentString + '</svg>';

            result += outputLine[0] + '\n' + outputLine[1] + '\n' + outputLine[2] + '\n';
        }
        else {
            result += line + '\n';
        }

    });

    return result;
}


// Clean up production folder

gulp.task('clean', function () {
    return del('production/*');
});


// Index: copy

gulp.task('index', function () {
    return gulp.src('development/index.html')
        .pipe(plumber())
        .pipe(gulp.dest('production/'))
        ;
});




// Manifest: copy

gulp.task('storeEgenatorManifest', function () {
    return gulp.src([
            'development/storeEgenator/browserconfig.xml',
            'development/storeEgenator/manifest.json',
            'development/storeEgenator/humans.txt',
            'development/storeEgenator/favicon.ico'])
        .pipe(plumber())
        .pipe(gulp.dest('production/storeEgenator/'))
        ;
});

// Favicon: copy

gulp.task('storeEgenatorFavicon', function () {
    return gulp.src('development/storeEgenator/favicon/**/*')
        .pipe(plumber())
        .pipe(gulp.dest('production/storeEgenator/favicon/'))
        ;
});


// Temp: copy

gulp.task('globalTemp', function () {
    return gulp.src('development/global/temp/**/*')
        .pipe(plumber())
        .pipe(gulp.dest('production/global/temp/'))
        ;
});

gulp.task('freeTemp', function () {
    return gulp.src([
        'development/global/temp/**/*',
        'development/free/temp/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('production/free/temp/'))
        ;
});

gulp.task('onlineTemp', function () {
    return gulp.src([
        'development/global/temp/**/*',
        'development/online/temp/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('production/online/temp/'))
        ;
});

gulp.task('rusTemp', function () {
    return gulp.src([
        'development/global/temp/**/*',
        'development/rus/temp/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('production/rus/temp/'))
        ;
});

gulp.task('storeTemp', function () {
    return gulp.src([
        'development/global/temp/**/*',
        'development/store/temp/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('production/store/temp/'))
        ;
});

gulp.task('storeEgenatorTemp', function () {
    return gulp.src([
        'development/global/temp/**/*',
        'development/store/temp/**/*',
        'development/storeEgenator/temp/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('production/storeEgenator/temp/'))
        ;
});

gulp.task('mainTemp', function () {
    return gulp.src([
        'development/global/temp/**/*',
        'development/main/temp/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('production/main/temp/'))
        ;
});


// Adobe: copy

gulp.task('globalAdobe', function () {
    return gulp.src('development/global/adobe/**/*')
        .pipe(plumber())
        .pipe(gulp.dest('production/global/adobe/'))
        ;
});

gulp.task('freeAdobe', function () {
    return gulp.src([
        'development/global/adobe/**/*',
        'development/free/adobe/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('production/free/adobe/'))
        ;
});

gulp.task('onlineAdobe', function () {
    return gulp.src([
        'development/global/adobe/**/*',
        'development/online/adobe/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('production/online/adobe/'))
        ;
});

gulp.task('rusAdobe', function () {
    return gulp.src([
        'development/global/adobe/**/*',
        'development/rus/adobe/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('production/rus/adobe/'))
        ;
});

gulp.task('storeAdobe', function () {
    return gulp.src([
        'development/global/adobe/**/*',
        'development/store/adobe/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('production/store/adobe/'))
        ;
});

gulp.task('storeEgenatorAdobe', function () {
    return gulp.src([
        'development/global/adobe/**/*',
        'development/store/adobe/**/*',
        'development/storeEgenator/adobe/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('production/storeEgenator/adobe/'))
        ;
});

gulp.task('mainAdobe', function () {
    return gulp.src([
        'development/global/adobe/**/*',
        'development/main/adobe/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('production/main/adobe/'))
        ;
});


// Fonts: copy

gulp.task('globalFonts', function () {
    return gulp.src('development/global/fonts/**/*')
        .pipe(plumber())
        .pipe(gulp.dest('production/global/fonts/'))
        ;
});

gulp.task('freeFonts', function () {
    return gulp.src([
        'development/global/fonts/**/*',
        'development/free/fonts/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('production/free/fonts/'))
        ;
});

gulp.task('onlineFonts', function () {
    return gulp.src([
        'development/global/fonts/**/*',
        'development/online/fonts/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('production/online/fonts/'))
        ;
});

gulp.task('rusFonts', function () {
    return gulp.src([
        'development/global/fonts/**/*',
        'development/rus/fonts/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('production/rus/fonts/'))
        ;
});

gulp.task('storeFonts', function () {
    return gulp.src([
        'development/global/fonts/**/*',
        'development/store/fonts/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('production/store/fonts/'))
        ;
});

gulp.task('storeEgenatorFonts', function () {
    return gulp.src([
        'development/global/fonts/**/*',
        'development/store/fonts/**/*',
        'development/storeEgenator/fonts/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('production/storeEgenator/fonts/'))
        ;
});

gulp.task('mainFonts', function () {
    return gulp.src([
        'development/global/fonts/**/*',
        'development/main/fonts/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('production/main/fonts/'))
        ;
});


// Content: copy

gulp.task('globalContent', function () {
    return gulp.src('development/global/content/**/*')
        .pipe(plumber())
        .pipe(gulp.dest('production/global/content/'))
        ;
});

gulp.task('freeContent', function () {
    return gulp.src([
        'development/global/content/**/*',
        'development/free/content/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('production/free/content/'))
        ;
});

gulp.task('onlineContent', function () {
    return gulp.src([
        'development/global/content/**/*',
        'development/online/content/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('production/online/content/'))
        ;
});

gulp.task('rusContent', function () {
    return gulp.src([
        'development/global/content/**/*',
        'development/rus/content/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('production/rus/content/'))
        ;
});

gulp.task('storeContent', function () {
    return gulp.src([
        'development/global/content/**/*',
        'development/store/content/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('production/store/content/'))
        ;
});

gulp.task('storeEgenatorContent', function () {
    return gulp.src([
        'development/global/content/**/*',
        'development/store/content/**/*',
        'development/storeEgenator/content/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('production/storeEgenator/content/'))
        ;
});

gulp.task('mainContent', function () {
    return gulp.src([
        'development/global/content/**/*',
        'development/main/content/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('production/main/content/'))
        ;
});


// Images: copy

gulp.task('globalImages', function () {
    return gulp.src('development/global/images/**/*')
        .pipe(plumber())
        .pipe(gulp.dest('production/global/images/'))
        ;
});

gulp.task('freeImages', function () {
    return gulp.src([
        'development/global/images/**/*',
        'development/free/images/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('production/free/images/'))
        ;
});

gulp.task('onlineImages', function () {
    return gulp.src([
        'development/global/images/**/*',
        'development/online/images/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('production/online/images/'))
        ;
});

gulp.task('rusImages', function () {
    return gulp.src([
        'development/global/images/**/*',
        'development/rus/images/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('production/rus/images/'))
        ;
});

gulp.task('storeImages', function () {
    return gulp.src([
        'development/global/images/**/*',
        'development/store/images/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('production/store/images/'))
        ;
});

gulp.task('storeEgenatorImages', function () {
    return gulp.src([
        'development/global/images/**/*',
        'development/store/images/**/*',
        'development/storeEgenator/images/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('production/storeEgenator/images/'))
        ;
});

gulp.task('mainImages', function () {
    return gulp.src([
        'development/global/images/**/*',
        'development/main/images/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('production/main/images/'))
        ;
});


// Vendors: copy

gulp.task('globalVendors', function () {
    return gulp.src('development/global/vendors/**/*')
        .pipe(plumber())
        .pipe(gulp.dest('production/global/vendors/'))
        ;
});

gulp.task('freeVendors', function () {
    return gulp.src([
        'development/global/vendors/**/*',
        'development/free/vendors/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('production/free/vendors/'))
        ;
});

gulp.task('onlineVendors', function () {
    return gulp.src([
        'development/global/vendors/**/*',
        'development/online/vendors/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('production/online/vendors/'))
        ;
});

gulp.task('rusVendors', function () {
    return gulp.src([
        'development/global/vendors/**/*',
        'development/rus/vendors/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('production/rus/vendors/'))
        ;
});

gulp.task('storeVendors', function () {
    return gulp.src([
        'development/global/vendors/**/*',
        'development/store/vendors/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('production/store/vendors/'))
        ;
});

gulp.task('storeEgenatorVendors', function () {
    return gulp.src([
        'development/global/vendors/**/*',
        'development/store/vendors/**/*',
        'development/storeEgenator/vendors/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('production/storeEgenator/vendors/'))
        ;
});

gulp.task('mainVendors', function () {
    return gulp.src([
        'development/global/vendors/**/*',
        'development/main/vendors/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('production/main/vendors/'))
        ;
});


// Scripts: copy

gulp.task('globalScripts', function () {
    return gulp.src('development/global/scripts/**/*')
        .pipe(plumber())
        .pipe(gulp.dest('production/global/scripts/'))
        ;
});

gulp.task('freeScripts', function () {
    return gulp.src([
        'development/global/scripts/**/*',
        'development/free/scripts/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('production/free/scripts/'))
        ;
});

gulp.task('onlineScripts', function () {
    return gulp.src([
        'development/global/scripts/**/*',
        'development/online/scripts/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('production/online/scripts/'))
        ;
});

gulp.task('rusScripts', function () {
    return gulp.src([
        'development/global/scripts/**/*',
        'development/rus/scripts/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('production/rus/scripts/'))
        ;
});

gulp.task('storeScripts', function () {
    return gulp.src([
        'development/global/scripts/**/*',
        'development/store/scripts/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('production/store/scripts/'))
        ;
});

gulp.task('storeEgenatorScripts', function () {
    return gulp.src([
        'development/global/scripts/**/*',
        'development/store/scripts/**/*',
        'development/storeEgenator/scripts/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('production/storeEgenator/scripts/'))
        ;
});

gulp.task('mainScripts', function () {
    return gulp.src([
        'development/global/scripts/**/*',
        'development/main/scripts/**/*'
    ])
        .pipe(plumber())
        .pipe(gulp.dest('production/main/scripts/'))
        ;
});


// Markups: copy and change symbols <img> to sprite <svg>

gulp.task('globalMarkups', function () {
    return gulp.src('development/global/markups/**/*')
        .pipe(plumber())
        .pipe(change(globalSymbolsImgToSpriteSvg))
        .pipe(change(uncommentGoogleFonts))
        .pipe(change(addSourcesTimestamp))
        .pipe(gulp.dest('production/global/markups/'))
        ;
});

gulp.task('freeMarkups', function () {
    return gulp.src('development/free/markups/**/*')
        .pipe(plumber())
        .pipe(change(freeSymbolsImgToSpriteSvg))
        .pipe(change(uncommentGoogleFonts))
        .pipe(change(releaseFromGlobal))
        .pipe(change(addSourcesTimestamp))
        .pipe(gulp.dest('production/free/markups/'))
        ;
});

gulp.task('onlineMarkups', function () {
    return gulp.src('development/online/markups/**/*')
        .pipe(plumber())
        .pipe(change(onlineSymbolsImgToSpriteSvg))
        .pipe(change(uncommentGoogleFonts))
        .pipe(change(releaseFromGlobal))
        .pipe(change(addSourcesTimestamp))
        .pipe(gulp.dest('production/online/markups/'))
        ;
});

gulp.task('rusMarkups', function () {
    return gulp.src('development/rus/markups/**/*')
        .pipe(plumber())
        .pipe(change(rusSymbolsImgToSpriteSvg))
        .pipe(change(uncommentGoogleFonts))
        .pipe(change(releaseFromGlobal))
        .pipe(change(addSourcesTimestamp))
        .pipe(gulp.dest('production/rus/markups/'))
        ;
});

gulp.task('storeMarkups', function () {
    return gulp.src('development/store/markups/**/*')
        .pipe(plumber())
        .pipe(change(storeSymbolsImgToSpriteSvg))
        .pipe(change(uncommentGoogleFonts))
        .pipe(change(releaseFromGlobal))
        .pipe(change(addSourcesTimestamp))
        .pipe(gulp.dest('production/store/markups/'))
        ;
});

gulp.task('storeEgenatorMarkups', function () {
    return gulp.src('development/storeEgenator/markups/**/*')
        .pipe(plumber())
        .pipe(change(storeEgenatorSymbolsImgToSpriteSvg))
        .pipe(change(uncommentGoogleFonts))
        .pipe(change(releaseFromGlobal))
        .pipe(change(addSourcesTimestamp))
        .pipe(gulp.dest('production/storeEgenator/markups/'))
        ;
});

gulp.task('mainMarkups', function () {
    return gulp.src('development/main/markups/**/*')
        .pipe(plumber())
        .pipe(change(mainSymbolsImgToSpriteSvg))
        .pipe(change(uncommentGoogleFonts))
        .pipe(change(releaseFromGlobal))
        .pipe(change(addSourcesTimestamp))
        .pipe(gulp.dest('production/main/markups/'))
        ;
});


// Layouts: copy and change symbols <img> to sprite <svg>

gulp.task('globalLayouts', function () {
    return gulp.src('development/global/*.html')
        .pipe(plumber())
        .pipe(change(globalSymbolsImgToSpriteSvg))
        .pipe(change(uncommentGoogleFonts))
        .pipe(change(addSourcesTimestamp))
        .pipe(gulp.dest('production/global/'))
        ;
});

gulp.task('freeLayouts', function () {
    return gulp.src('development/free/*.html')
        .pipe(plumber())
        .pipe(change(freeSymbolsImgToSpriteSvg))
        .pipe(change(uncommentGoogleFonts))
        .pipe(change(releaseFromGlobal))
        .pipe(change(addSourcesTimestamp))
        .pipe(gulp.dest('production/free/'))
        ;
});

gulp.task('onlineLayouts', function () {
    return gulp.src('development/online/*.html')
        .pipe(plumber())
        .pipe(change(onlineSymbolsImgToSpriteSvg))
        .pipe(change(uncommentGoogleFonts))
        .pipe(change(releaseFromGlobal))
        .pipe(change(addSourcesTimestamp))
        .pipe(gulp.dest('production/online/'))
        ;
});

gulp.task('rusLayouts', function () {
    return gulp.src('development/rus/*.html')
        .pipe(plumber())
        .pipe(change(rusSymbolsImgToSpriteSvg))
        .pipe(change(uncommentGoogleFonts))
        .pipe(change(releaseFromGlobal))
        .pipe(change(addSourcesTimestamp))
        .pipe(gulp.dest('production/rus/'))
        ;
});

gulp.task('storeLayouts', function () {
    return gulp.src('development/store/*.html')
        .pipe(plumber())
        .pipe(change(storeSymbolsImgToSpriteSvg))
        .pipe(change(uncommentGoogleFonts))
        .pipe(change(releaseFromGlobal))
        .pipe(change(addSourcesTimestamp))
        .pipe(gulp.dest('production/store/'))
        ;
});

gulp.task('storeEgenatorLayouts', function () {
    return gulp.src('development/storeEgenator/*.html')
        .pipe(plumber())
        .pipe(change(storeEgenatorSymbolsImgToSpriteSvg))
        .pipe(change(uncommentGoogleFonts))
        .pipe(change(releaseFromGlobal))
        .pipe(change(addSourcesTimestamp))
        .pipe(gulp.dest('production/storeEgenator/'))
        ;
});

gulp.task('mainLayouts', function () {
    return gulp.src('development/main/*.html')
        .pipe(plumber())
        .pipe(change(mainSymbolsImgToSpriteSvg))
        .pipe(change(uncommentGoogleFonts))
        .pipe(change(releaseFromGlobal))
        .pipe(change(addSourcesTimestamp))
        .pipe(gulp.dest('production/main/'))
        ;
});


// Symbols

gulp.task('globalSymbols', function () {
    return gulp.src('development/global/symbols/*.svg')
        .pipe(plumber())
        .pipe(svgmin())
        .pipe(svgstore())
        .pipe(gulp.dest('production/global/symbols/'));
});

gulp.task('freeSymbols', function () {
    return gulp.src(['development/free/symbols/*.svg',
        'development/global/symbols/*.svg'
    ])
        .pipe(plumber())
        .pipe(svgmin())
        .pipe(svgstore())
        .pipe(gulp.dest('production/free/symbols/'));
});

gulp.task('onlineSymbols', function () {
    return gulp.src(['development/online/symbols/*.svg',
        'development/global/symbols/*.svg'
    ])
        .pipe(plumber())
        .pipe(svgmin())
        .pipe(svgstore())
        .pipe(gulp.dest('production/online/symbols/'));
});

gulp.task('rusSymbols', function () {
    return gulp.src(['development/rus/symbols/*.svg',
        'development/global/symbols/*.svg'
    ])
        .pipe(plumber())
        .pipe(svgmin())
        .pipe(svgstore())
        .pipe(gulp.dest('production/rus/symbols/'));
});

gulp.task('storeSymbols', function () {
    return gulp.src(['development/store/symbols/*.svg',
        'development/global/symbols/*.svg'
    ])
        .pipe(plumber())
        .pipe(svgmin())
        .pipe(svgstore())
        .pipe(gulp.dest('production/store/symbols/'));
});

gulp.task('storeEgenatorSymbols', function () {
    return gulp.src(['development/storeEgenator/symbols/*.svg',
        'development/global/symbols/*.svg'
    ])
        .pipe(plumber())
        .pipe(svgmin())
        .pipe(svgstore())
        .pipe(gulp.dest('production/storeEgenator/symbols/'));
});

gulp.task('mainSymbols', function () {
    return gulp.src(['development/main/symbols/*.svg',
        'development/global/symbols/*.svg'
    ])
        .pipe(plumber())
        .pipe(svgmin())
        .pipe(svgstore())
        .pipe(gulp.dest('production/main/symbols/'));
});


// Styles: concat, add prefixes, compress, copy

gulp.task('globalStyles', function () {

    var spritesOptions = {
        stylesheetPath: 'production/global/styles',
        spritePath: 'production/global/sprites',
        retina: 'true',
        filterBy: function (image) {
            // Allow files from /sprites/ only
            if (!/\/sprites\//.test(image.url)) {
                return Promise.reject();
            }
            return Promise.resolve();
        }
    };

    var processors = [
        sprites(spritesOptions),
        cssnext({
            'browsers': 'last 2 versions' // for autoprefixer and features list
        })
    ];

    return gulp.src([
        'development/global/styles/style.css'
    ])
        .pipe(plumber())
        .pipe(cleanCSS({
            advanced: false,
            keepSpecialComments: 0,
            format: 'beautify' // Не сжимаем в одну строку
        }))
        .pipe(postcss(processors))
        .pipe(base64({
            // Allow files from /vectors/ only
            exclude: ['/sprite/', '/images/', '/symbols/']
        }))
        .pipe(gulp.dest('production/global/styles/'))
        .pipe(size())
        ;
});


gulp.task('freeStyles', function () {

    var spritesOptions = {
        stylesheetPath: 'production/free/styles',
        spritePath: 'production/free/sprites',
        retina: 'true',
        filterBy: function (image) {
            // Allow files from /sprites/ only
            if (!/\/sprites\//.test(image.url)) {
                return Promise.reject();
            }
            return Promise.resolve();
        }
    };

    var processors = [
        sprites(spritesOptions),
        cssnext({
            'browsers': 'last 2 versions' // for autoprefixer and features list
        })
    ];

    return gulp.src([
        'development/free/styles/style.css'
    ])
        .pipe(plumber())
        .pipe(cleanCSS({
            advanced: false,
            keepSpecialComments: 0,
            format: 'beautify' // Не сжимаем в одну строку
        }))
        .pipe(postcss(processors))
        .pipe(base64({
            // Allow files from /vectors/ only
            exclude: ['/sprite/', '/images/', '/symbols/']
        }))
        .pipe(change(releaseFromGlobal))
        .pipe(gulp.dest('production/free/styles/'))
        .pipe(size())
        ;
});


gulp.task('onlineStyles', function () {

    var spritesOptions = {
        stylesheetPath: 'production/online/styles',
        spritePath: 'production/online/sprites',
        retina: 'true',
        filterBy: function (image) {
            // Allow files from /sprites/ only
            if (!/\/sprites\//.test(image.url)) {
                return Promise.reject();
            }
            return Promise.resolve();
        }
    };

    var processors = [
        sprites(spritesOptions),
        cssnext({
            'browsers': 'last 2 versions' // for autoprefixer and features list
        })
    ];

    return gulp.src([
        'development/online/styles/style.css'
    ])
        .pipe(plumber())
        .pipe(cleanCSS({
            advanced: false,
            keepSpecialComments: 0,
            format: 'beautify' // Не сжимаем в одну строку
        }))
        .pipe(postcss(processors))
        .pipe(base64({
            // Allow files from /vectors/ only
            exclude: ['/sprite/', '/images/', '/symbols/']
        }))
        .pipe(change(releaseFromGlobal))
        .pipe(gulp.dest('production/online/styles/'))
        .pipe(size())
        ;
});


gulp.task('rusStyles', function () {

    var spritesOptions = {
        stylesheetPath: 'production/rus/styles',
        spritePath: 'production/rus/sprites',
        retina: 'true',
        filterBy: function (image) {
            // Allow files from /sprites/ only
            if (!/\/sprites\//.test(image.url)) {
                return Promise.reject();
            }
            return Promise.resolve();
        }
    };

    var processors = [
        sprites(spritesOptions),
        cssnext({
            'browsers': 'last 2 versions' // for autoprefixer and features list
        })
    ];

    return gulp.src([
        'development/rus/styles/style.css'
    ])
        .pipe(plumber())
        .pipe(cleanCSS({
            advanced: false,
            keepSpecialComments: 0,
            format: 'beautify' // Не сжимаем в одну строку
        }))
        .pipe(postcss(processors))
        .pipe(base64({
            // Allow files from /vectors/ only
            exclude: ['/sprite/', '/images/', '/symbols/']
        }))
        .pipe(change(releaseFromGlobal))
        .pipe(gulp.dest('production/rus/styles/'))
        .pipe(size())
        ;
});


gulp.task('storeStyles', function () {

    var spritesOptions = {
        stylesheetPath: 'production/store/styles',
        spritePath: 'production/store/sprites',
        retina: 'true',
        filterBy: function (image) {
            // Allow files from /sprites/ only
            if (!/\/sprites\//.test(image.url)) {
                return Promise.reject();
            }
            return Promise.resolve();
        }
    };

    var processors = [
        sprites(spritesOptions),
        cssnext({
            'browsers': 'last 2 versions' // for autoprefixer and features list
        })
    ];

    return gulp.src([
        'development/store/styles/style.css'
    ])
        .pipe(plumber())
        .pipe(cleanCSS({
            advanced: false,
            keepSpecialComments: 0,
            format: 'beautify' // Не сжимаем в одну строку

        }))
        .pipe(postcss(processors))
        .pipe(base64({
            // Allow files from /vectors/ only
            exclude: ['/sprite/', '/images/', '/symbols/']
        }))
        .pipe(change(releaseFromGlobal))
        .pipe(gulp.dest('production/store/styles/'))
        .pipe(size())
        ;
});


gulp.task('storeEgenatorStyles', function () {

    var spritesOptions = {
        stylesheetPath: 'production/storeEgenator/styles',
        spritePath: 'production/storeEgenator/sprites',
        retina: 'true',
        filterBy: function (image) {
            // Allow files from /sprites/ only
            if (!/\/sprites\//.test(image.url)) {
                return Promise.reject();
            }
            return Promise.resolve();
        }
    };

    var processors = [
        sprites(spritesOptions),
        cssnext({
            'browsers': 'last 2 versions' // for autoprefixer and features list
        })
    ];

    return gulp.src([
        'development/storeEgenator/styles/style.css'
    ])
        .pipe(plumber())
        .pipe(cleanCSS({
            advanced: false,
            keepSpecialComments: 0,
            format: 'beautify' // Не сжимаем в одну строку
        }))
        .pipe(postcss(processors))
        .pipe(base64({
            // Allow files from /vectors/ only
            exclude: ['/sprite/', '/images/', '/symbols/']
        }))
        .pipe(change(releaseFromGlobal))
        .pipe(gulp.dest('production/storeEgenator/styles/'))
        .pipe(size())
        ;
});


gulp.task('mainStyles', function () {

    var spritesOptions = {
        stylesheetPath: 'production/main/styles',
        spritePath: 'production/main/sprites',
        retina: 'true',
        filterBy: function (image) {
            // Allow files from /sprites/ only
            if (!/\/sprites\//.test(image.url)) {
                return Promise.reject();
            }
            return Promise.resolve();
        }
    };

    var processors = [
        sprites(spritesOptions),
        cssnext({
            'browsers': 'last 2 versions' // for autoprefixer and features list
        })
    ];

    return gulp.src([
        'development/main/styles/style.css'
    ])
        .pipe(plumber())
        .pipe(cleanCSS({
            advanced: false,
            keepSpecialComments: 0,
            format: 'beautify' // Не сжимаем в одну строку
        }))
        .pipe(postcss(processors))
        .pipe(base64({
            // Allow files from /vectors/ only
            exclude: ['/sprite/', '/images/', '/symbols/']
        }))
        .pipe(change(releaseFromGlobal))
        .pipe(gulp.dest('production/main/styles/'))
        .pipe(size())
        ;
});


gulp.task('default', function (fn) {
    run('clean',
        'index',
        'globalTemp',    'freeTemp',    'onlineTemp',    'rusTemp',    'storeTemp',    'storeEgenatorTemp',    'mainTemp',
        'globalAdobe',   'freeAdobe',   'onlineAdobe',   'rusAdobe',   'storeAdobe',   'storeEgenatorAdobe',   'mainAdobe',
        'globalFonts',   'freeFonts',   'onlineFonts',   'rusFonts',   'storeFonts',   'storeEgenatorFonts',   'mainFonts',
        'globalContent', 'freeContent', 'onlineContent', 'rusContent', 'storeContent', 'storeEgenatorContent', 'mainContent',
        'globalImages',  'freeImages',  'onlineImages',  'rusImages',  'storeImages',  'storeEgenatorImages',  'mainImages',
        'globalVendors', 'freeVendors', 'onlineVendors', 'rusVendors', 'storeVendors', 'storeEgenatorVendors', 'mainVendors',
        'globalScripts', 'freeScripts', 'onlineScripts', 'rusScripts', 'storeScripts', 'storeEgenatorScripts', 'mainScripts',
        'globalMarkups', 'freeMarkups', 'onlineMarkups', 'rusMarkups', 'storeMarkups', 'storeEgenatorMarkups', 'mainMarkups',
        'globalLayouts', 'freeLayouts', 'onlineLayouts', 'rusLayouts', 'storeLayouts', 'storeEgenatorLayouts', 'mainLayouts',
        'globalSymbols', 'freeSymbols', 'onlineSymbols', 'rusSymbols', 'storeSymbols', 'storeEgenatorSymbols', 'mainSymbols',
        'globalStyles',  'freeStyles',  'onlineStyles',  'rusStyles',  'storeStyles',  'storeEgenatorStyles',  'mainStyles',
                                                                                       'storeEgenatorManifest',
                                                                                       'storeEgenatorFavicon',
        fn);
});



