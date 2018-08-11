const gulp          = require('gulp');
const browserSync   = require('browser-sync');
const sass          = require('gulp-sass');
const sourcemaps    = require('gulp-sourcemaps');
const autoprefixer  = require('gulp-autoprefixer');
const cleanCSS      = require('gulp-clean-css');
const uglify        = require('gulp-uglify');
const babel         = require('gulp-babel');
const uglifyes      = require('gulp-uglifyes');



gulp.task('default', ['serve']);

gulp.task('serve',['html', 'sass', 'js'], ()=> {

    browserSync({
        server: 'public'
    });

    gulp.watch('src/html/**/*.html', ['html']);
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/js/**/*.js', ['js']);

});

gulp.task('html', ()=> {
    return gulp.src('src/html/**/*.html')
        .pipe(gulp.dest('public'))
        .pipe(browserSync.reload({
            stream: true
        }));
})

gulp.task('sass', ()=> {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 20 versions']
        }))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
})

gulp.task('js', ()=> {
    return gulp.src('src/js/**/*.js')
        .pipe(uglify())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('public/js'))
        .pipe(browserSync.reload({
            stream: true
        }))
})



