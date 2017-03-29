/**
 * Created by tonghema on 27/03/2017.
 */
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({
    lazy: true
}),
    apidoc = require('gapidoc');

gulp.task('apidoc',function(){
    apidoc.exec({
        src: "routes/apidoc/",
        dest: "public/",
        debug: true,
        includeFilters: [ ".*\\.js$" ]
    });
});
