var gulp     = require("gulp"),
    concat   = require("gulp-concat"),
    sass     = require("gulp-sass"),
    hash     = require("gulp-hash"),
    prefixer = require("gulp-autoprefixer"),
    del      = require("del");

var SRCS = {
  sass: ["source/sass/style.sass"],
  sassWatch: ["source/sass/**/*.sass"]
}

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

gulp.task('build', gulp.series('sass-dev'));

gulp.task('dev', gulp.series('sass-dev', gulp.parallel('sass:watch')));

gulp.task('default', gulp.series('dev'));
