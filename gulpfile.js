// load gulp plugins
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var exgitig = require('gulp-exclude-gitignore');
var jshint = require('gulp-jshint');
var jsonminify = require('gulp-jsonminify');
var uglify = require('gulp-uglify');
var sqwish = require('gulp-sqwish');
var htmlmin = require('gulp-html-minifier2');
var rename = require('gulp-rename');
var shell = require('gulp-shell');
var copy = require('gulp-copy');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var del = require('del');
var gulpSequence = require('gulp-sequence');
var merge = require('merge-stream');

// copy icons from src to dist
gulp.task('copys', function(){
    return gulp.src('src/img/*.png')
    .pipe(copy('dist',{prefix:1}))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('copyfav', function(){
    return gulp.src('./favicon.ico')
    .pipe(copy('dist', {prefix:1}))
    .pipe(gulp.dest('./'));
});


//Styles Tasks
gulp.task('styles', function(){
    var myCss = gulp.src('src/style/style.css')
    .pipe(sqwish('style.css'))
    .pipe(rename('style.min.css'))    
    .pipe(gulp.dest('dist/style'));    
    var bootstrap = gulp.src('src/style/bootstrap.min.css')
    .pipe(gulp.dest('dist/style'));
    return merge(myCss, bootstrap);
});

// Script tasks(js)
gulp.task('scripts', function(){
    return gulp.src('src/scripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
//    .pipe(concat('*.js'))
//    .pipe(rename('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// Minify html
gulp.task('htmlmins', function(){
    return gulp.src('./index.html')
    .pipe(htmlmin({removeComments: true}))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(rename('index.min.html'))
    .pipe(gulp.dest('./dist'));
});

// Copy necessary node modules for map app from global node_modules folder e.g leaflet stuff
gulp.task('runnmp', shell.task('node nmget'));

// Delete all but necessary leaflet files/folders in dist folder
gulp.task('cleanout', function(){
    return del(['dist/node_modules/leaflet/src','dist/node_modules/leaflet/*.*','dist/node_modules/leaflet-buffer/.*','dist/node_modules/leaflet-buffer/*.*','dist/node_modules/leaflet-buffer/src','dist/node_modules/leaflet-draw/docs','dist/node_modules/leaflet-draw/*.*','dist/node_modules/jsts/java','dist/node_modules/jsts/org','dist/node_modules/jsts/*.*'])
});


// watch for file changes to do anything
gulp.task('watch', function(){
    gulp.watch('./*.html',['htmlmins']);
    gulp.watch('src/style/*.css',['styles']);
    gulp.watch('src/scripts/*.js',['scripts']);
    gulp.watch('./package.json',['runnmp']);
    });


// Default Gulp tasks run on 'gulp' command
gulp.task('sequence_1', gulpSequence(['copys','copyfav','styles','scripts','htmlmins','runnmp'], 'cleanout'))

//gulp.task('default',['copys','copyfav','styles','scripts','htmlmins','runnmp','sequence_1']);