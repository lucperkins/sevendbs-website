var gulp     = require("gulp"),
    concat   = require("gulp-concat"),
    sass     = require("gulp-sass"),
    hash     = require("gulp-hash"),
    prefixer = require("gulp-autoprefixer"),
    uglify   = require("gulp-uglify"),
    del      = require("del");

var SRCS = {
  sass: ["source/sass/style.sass"],
  sassWatch: ["source/sass/**/*.sass"]
}

gulp.task('sass', (done) => {
  gulp.src(SRCS.sass)
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(prefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('static/css'));

  done();
});

gulp.task('sass-dev', (done) => {
  del(['static/css/style-*.css']);

  gulp.src(SRCS.sass)
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(hash())
    .pipe(prefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
    .pipe(gulp.dest('static/css'))
    .pipe(hash.manifest('assetHashes.json'))
    .pipe(gulp.dest('data'));
  done();
});

gulp.task('sass:watch', () => {
  gulp.watch(SRCS.sassWatch, gulp.series('sass-dev'));
});

/*
gulp.task('js', (done) => {
  del(['static/js/app-*.js']);

  gulp.src(SRCS.js)
    .pipe(concat("app.js"))
    .pipe(uglify())
    .pipe(hash())
    .pipe(gulp.dest('static/js'))
    .pipe(hash.manifest('assetHashes.json'))
    .pipe(gulp.dest('data'));

  done();
});

gulp.task('js:watch', () => {
  gulp.watch(SRCS.js, gulp.series('js'));
});
*/

gulp.task('build', gulp.series('sass'));

gulp.task('dev', gulp.series('sass-dev', gulp.parallel('sass:watch')));

gulp.task('default', gulp.series('dev'));
