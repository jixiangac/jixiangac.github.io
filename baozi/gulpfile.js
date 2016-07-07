require('colors');
var del = require('del');
var gulp = require('gulp');
var code = require('gulp-code');
var gulpif = require('gulp-if');
var less = require('gulp-less');
var xtpl = require('@ali/gulp-xtpl');
var plumber = require('gulp-plumber');
var path = require('path');
var pkg = require(path.join(process.cwd(), 'package.json'));

var isBuild = true;

function err(error) {
    console.error('[ERROR]'.red + error.message);
    this.emit('end');
}

gulp.task('clean', function (cb) {
    isBuild ? del(['build'], cb) : cb();
});

var ifless = function (file) {
    var extname = path.extname(file.path);
    return extname === '.less' ? true : false;
};

gulp.task('css', ['clean'], function () {
    return gulp.src(['src/**/*.css', 'src/**/*.less'])
        .pipe(gulpif(!isBuild, plumber(err)))
        .pipe(gulpif(ifless, less()))
        .pipe(gulpif(isBuild, code.lint()))
        .pipe(gulpif(isBuild, code.minify()))
        .pipe(gulp.dest('build'));
});

var ifxtpl = function (file) {
    var extname = path.extname(file.path);
    return extname === '.xtpl' ? true : false;
};

gulp.task('js', ['clean'], function () {
    return gulp.src(['src/**/*.js', 'src/**/*.xtpl'])
        .pipe(gulpif(!isBuild, plumber(err)))
        .pipe(gulpif(ifxtpl, xtpl()))
        .pipe(gulpif(isBuild, code.lint()))
        .pipe(code.dep({
            name: pkg.name,
            version: pkg.version,
            path: '//g.alicdn.com/tm/' + pkg.name + '/' + pkg.version + '/',
            group: 'tm',
            feDependencies: pkg.feDependencies,
            kissyConfig: {
                combine: true,
                group: "tm",
                packages: {
                    kissy :{
                        base: '//g.alicdn.com/kissy/k/'+pkg.kissyVersion+'/',
                        version: pkg.kissyVersion
                    }
                }
            }
        }))
        .pipe(gulpif(isBuild, code.minify()))
        .pipe(gulp.dest('build'));
});

gulp.task("copy", ["clean"], function () {
    return gulp.src(["src/**/*.swf","src/**/*.png", "src/**/*.jpg", "src/**/*.jpeg", "src/**/*.gif", "src/**/*.html", "src/**/*.htm", "src/**/*.ttf", "src/**/*.eot", "src/**/*.svg", "src/**/*.woff"])
        .pipe(gulp.dest("build"));
});

gulp.task('default', ['clean', 'css', 'js', 'copy']);

gulp.task("watch", ["default"], function () {
    isBuild = false;
    gulp.watch(['src/**/*.js', '!src/seed.js', 'src/**/*.xtpl'], ["js"]);
    gulp.watch(['src/**/*.css', 'src/**/*.less'], ["css"]);
});