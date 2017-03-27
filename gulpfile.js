/**
 * Created by tonghema on 27/03/2017.
 */
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({
    lazy: true
});
var apidoc = plugins.apidoc;
var ghPages = plugins.ghPages;

gulp.task('doc:build', function(done){
    apidoc({
        src: 'routes/',
        dest: 'publish/',
        debug: true
    }, done);
});
gulp.task('doc:push', function(){
    return gulp.src('./publish/**/*').pipe(ghPages({ remoteUrl: 'git@github.com:yusishuma/fluorescence.git' }));
});

gulp.task('apidoc', [ 'doc:build', 'doc:push']);