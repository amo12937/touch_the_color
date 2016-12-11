var gulp = require("gulp");

var dir = (root) => {
  var self = (path) => `${root}/${path}`;
  self.scripts = (path) => self(`scripts/${path}`)
  self.styles = (path) => self(`styles/${path}`)

  return self;
};

var src = dir("src");
var dest = dir("dest");

gulp.task("html", () =>
  gulp.src(src("index.html"))
  .pipe(gulp.dest(dest("")))
);


/***************************
 * scripts                 *
 ***************************/
((
  babelify = require("babelify"),
  browserify = require("browserify"),
  buffer = require("vinyl-buffer"),
  source = require("vinyl-source-stream")
) => {
  gulp.task("scripts", () =>
    browserify({
      entries: [src.scripts("index.jsx")],
      extensions: [".js", ".jsx"],
      paths: ["src/scripts/"]
    })
    .transform(babelify)
    .bundle()
    .on("error", (err) => console.log("Error : " + err.message))
    .pipe(source("bundle.js"))
    .pipe(buffer())
    .pipe(gulp.dest(dest.scripts("")))
  );
})();

/***************************
 * styles                  *
 ***************************/
((
  sass = require("gulp-sass"),
  autoprefixer = require("gulp-autoprefixer")
) => {
  gulp.task("styles", () =>
    gulp.src(src.styles("main.scss"))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest(dest.styles("")))
  )
})();

/***************************
 * watch                   *
 ***************************/
((browserSync = require("browser-sync")) => {
  gulp.task("browser-sync", () => browserSync({server: dest("")}));

  gulp.task("reload", browserSync.reload);

  gulp.task("watch", () => {
    gulp.watch(src("index.html"))
      .on("change", gulp.series("html", "reload"));

    gulp.watch([src.scripts("**/*.js"), src.scripts("**/*.jsx")])
      .on("change", gulp.series("scripts", "reload"));

    gulp.watch(src.styles("**/*.scss"))
      .on("change", gulp.series("styles", "reload"));
  });
})();

gulp.task("dev", gulp.series(gulp.parallel(
  "html", "scripts", "styles"
), gulp.parallel("browser-sync", "watch")));

