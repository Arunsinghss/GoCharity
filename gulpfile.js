////////////////////////////////
        //Setup//
////////////////////////////////
// Plugins
var gulp = require("gulp"),
        pjson = require("./package.json"),
        gutil = require("gulp-util"),
        sass = require("gulp-sass"),
        autoprefixer = require("gulp-autoprefixer"),
        cssnano = require("gulp-cssnano"),
        rename = require("gulp-rename"),
        del = require("del"),
        plumber = require("gulp-plumber"),
        pixrem = require("gulp-pixrem"),
        uglify = require("gulp-uglify"),
        imagemin = require("gulp-imagemin"),
        exec = require("child_process").exec,
        runSequence = require("run-sequence"),
        changed = require("gulp-changed"),
        debug = require("gulp-debug");


// Relative paths function
var pathsConfig = function (appName) {
    //this.app = "./" + (appName || pjson.name);
    return {
        app: '',
        templates: "templates",
        css: "static/css",
        sass: "static/scss",
        themes: "static/scss/base/themes",
        fonts: "static/fonts",
        images: "static/images",
        js: "static/js",
    }
};


var paths = pathsConfig();
////////////////////////////////
        //Tasks//
////////////////////////////////
// Styles autoprefixing and minification

gulp.task("styles", function() {

    return gulp.src([paths.sass + "/**/*.scss"])
        .pipe(debug())
        .pipe(sass().on("error", sass.logError))
        .pipe(plumber()) // Checks for errors
        .pipe(autoprefixer({browsers: ["last 2 version"]})) // Adds vendor prefixes
        .pipe(pixrem())  // add fallbacks for rem units
        .pipe(gulp.dest(paths.css))
        .pipe(rename({ suffix: ".min" }))
        .pipe(cssnano()) // Minifies the result
        .pipe(gulp.dest(paths.css));
});


gulp.task("themes", function() {
    return gulp.src(paths.themes + "/*.scss")
        .pipe(debug())
        .pipe(sass().on("error", sass.logError))
        .pipe(plumber())
        .pipe(autoprefixer({browsers: ["last 2 version"]}))
        .pipe(pixrem())  // add fallbacks for rem units
        .pipe(gulp.dest(paths.css + "/themes/"))
        .pipe(rename({ suffix: ".min" }))
        .pipe(cssnano()) // Minifies the result
        .pipe(gulp.dest(paths.css + "/themes/"));
});


// Javascript minification
gulp.task("scripts", function() {
    return gulp.src(paths.js + "/src/**/*.js")
        .pipe(changed(paths.js + "/src/**/*.js"))
        .pipe(plumber()) // Checks for errors
        .pipe(uglify()) // Minifies the js
        .pipe(rename({ suffix: ".min" }))
        .pipe(debug())
        .pipe(gulp.dest(paths.js + "/production/"));
});


// Image compression
gulp.task("imgCompression", function(){
    return gulp.src(paths.images + "/*")
        .pipe(imagemin()) // Compresses PNG, JPEG, GIF and SVG images
        .pipe(gulp.dest(paths.images));
});


// Watch
gulp.task("watch", function() {
	console.log('dddddd')
	console.log(paths.sass + "/**/*.scss", ["styles"])
    gulp.watch(paths.sass + "/**/*.scss", ["styles"]);
    gulp.watch(paths.themes + "/**/*.scss", ["themes"]);
    gulp.watch(paths.js + "/src/**/*.js", ["scripts"]);
    gulp.watch(paths.images + "/**/*", ["imgCompression"]);
});


// Default task
gulp.task("default", function() {
        runSequence(["styles", "scripts", "imgCompression"], "watch");
});