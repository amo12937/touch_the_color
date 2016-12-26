var gulp = require("gulp");

var dir = (root) => {
  var self = (path) => `${root}/${path}`;
  ["scripts", "styles", "images"].map((subdir) => {
    self[subdir] = (path) => self(`${subdir}/${path}`)
  });

  return self;
};

var src = dir("src");
var dest = dir("dev");

((del = require("del")) =>
  gulp.task("clean", () => del([dest("*")]))
)();

/***************************
 * README                  *
 ***************************/
gulp.task("README", () =>
  gulp.src(src("README.md"))
  .pipe(gulp.dest(dest("")))
);

/***************************
 * html                    *
 ***************************/
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
 * images                  *
 ***************************/
(() => {
  gulp.task("images", () =>
    gulp.src(src.images("**/*.svg"))
    .pipe(gulp.dest(dest.images("")))
  )
})();

/***************************
 * watch                   *
 ***************************/
((browserSync = require("browser-sync")) => {
  gulp.task("browser-sync", () => browserSync({server: dest("")}));

  gulp.task("reload", browserSync.reload);

  gulp.task("watch", () => {
    gulp.watch(src("README.md"))
      .on("change", gulp.series("README"));

    gulp.watch(src("index.html"))
      .on("change", gulp.series("html", "reload"));

    gulp.watch([src.scripts("**/*.js"), src.scripts("**/*.jsx")])
      .on("change", gulp.series("scripts", "reload"));

    gulp.watch(src.styles("**/*.scss"))
      .on("change", gulp.series("styles", "reload"));
  });
})();

gulp.task("build", gulp.series("clean", gulp.parallel(
  "README", "html", "scripts", "styles", "images"
)));

gulp.task("dev", gulp.series("build", gulp.parallel("browser-sync", "watch")));

