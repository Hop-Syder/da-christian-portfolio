/**
 * Gulpfile.js - Version corrigée avec gestion du contexte
 * @hopsyder - Fix JSON5 error by defining context variables
 */

const { src, dest, watch, series, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const fileinclude = require("gulp-file-include");
const autoprefixer = require("gulp-autoprefixer");
const bs = require("browser-sync").create();
const del = require("del");
const uglify = require("gulp-uglify");
const uglifycss = require("gulp-uglifycss");

// Environment detection
const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL || process.env.CI;

// Paths
const path = {
  src: {
    html: "src/*.html",
    others: "src/*.+(php|ico|png)",
    htminc: "src/partials/**/*.htm",
    incdir: "src/partials/",
    vendor: "src/vendor/**/*.*",
    fonts: "src/fonts/**/*.*",
    js: "src/js/*.js",
    scss: "src/scss/**/*.scss",
    images: "src/images/**/*.+(png|jpg|gif|svg|pdf)",
    blur: "src/images/**/*.jpg",
  },
  build: {
    dir: "dist/",
  },
};

// Clean Distribution folder
const clean = () => del(["./dist/**/*"]);

// Error Message - Disable notifications in production
const customPlumber = (errTitle) => {
  if (isProduction) {
    return plumber({
      errorHandler: (error) => {
        console.error(`[${errTitle}] ${error.message}`);
        process.exit(1);
      }
    });
  }

  return plumber({
    errorHandler: notify.onError({
      title: errTitle || "Error running Gulp",
      message: "Error: <%= error.message %>",
      sound: "Glass",
    }),
  });
};

// HTML Task with proper context configuration
const html = () =>
  src(path.src.html)
    .pipe(customPlumber("Error Running html-include"))
    .pipe(
      fileinclude({
        basepath: path.src.incdir,
        context: {
          // @hopsyder - Define default context to prevent JSON5 errors
          title: "Page Title",
          breadcrumb: "Current Page",
          // Add more context variables as needed
          author: "Hop-Syder",
          year: new Date().getFullYear()
        }
      })
    )
    .pipe(dest(path.build.dir))
    .pipe(
      bs.reload({
        stream: true,
      })
    );

// SCSS Task: Generate Css files from .scss files
const scss = () =>
  src(path.src.scss)
    .pipe(customPlumber("Error Running Sass"))
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: "expanded",
      includePaths: ['node_modules']
    }).on("error", sass.logError))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write("/maps"))
    .pipe(dest(path.build.dir + "css/"))
    .pipe(
      bs.reload({
        stream: true,
      })
    );

const scssDev = () =>
  src(path.src.scss)
    .pipe(customPlumber("Error Running Sass"))
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: "expanded",
      includePaths: ['node_modules']
    }).on("error", sass.logError))
    .pipe(uglifycss({
      maxLineLen: 80,
      uglyComments: true
    }))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write("/maps"))
    .pipe(dest(path.build.dir + "css/"))
    .pipe(
      bs.reload({
        stream: true,
      })
    );

// Javascript task: generate theme script files
const js = () =>
  src(path.src.js)
    .pipe(customPlumber("Error Running JS"))
    .pipe(uglify({
      compress: {
        drop_console: isProduction
      }
    }))
    .pipe(dest(path.build.dir + "js/"))
    .pipe(
      bs.reload({
        stream: true,
      })
    );

// Assets Tasks
const images = () =>
  src(path.src.images)
    .pipe(dest(path.build.dir + "images/"))
    .pipe(bs.reload({ stream: true }));

const vendor = () =>
  src(path.src.vendor)
    .pipe(dest(path.build.dir + "vendor/"))
    .pipe(bs.reload({ stream: true }));

const fonts = () =>
  src(path.src.fonts)
    .pipe(dest(path.build.dir + "fonts/"))
    .pipe(bs.reload({ stream: true }));

const others = () =>
  src(path.src.others)
    .pipe(dest(path.build.dir))
    .pipe(bs.reload({ stream: true }));

// Watch task - Only for development
const watchTask = () => {
  watch([path.src.html, path.src.htminc], series(html));
  watch(path.src.scss, series(scss));
  watch(path.src.js, series(js));
  watch(path.src.images, series(images));
  watch(path.src.vendor, series(vendor));
  watch(path.src.fonts, series(fonts));
  watch(path.src.others, series(others));
};

// Production build task
exports.default = series(
  clean,
  html,
  parallel(scssDev, js),
  parallel(images, vendor, fonts, others)
);

// Development task
exports.dev = series(
  clean,
  html,
  parallel(scss, js),
  parallel(images, vendor, fonts, others),
  parallel(watchTask, function () {
    bs.init({
      server: {
        baseDir: path.build.dir,
      },
      port: 3050,
      open: false,
    });
  })
);

// Individual tasks exports
exports.clean = clean;
exports.html = html;
exports.scss = scss;
exports.js = js;
exports.images = images;