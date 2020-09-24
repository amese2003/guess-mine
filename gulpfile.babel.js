import gulp from "gulp"
import sass from "gulp-sass"
import autoprefixer from "gulp-autoprefixer"
import minifyCSS from "gulp-csso"
import del from "del";
import bro from "gulp-browserify"

sass.compiler = require("node-sass");

const paths = {
    styles:{
        src: "src/assets/scss/styles.scss",
        dest: "src/static/styles",
        watch: "src/assets/scss/**/*.scss"
    },
    js:{
        src: "src/assets/js/main.js",
        dest: "src/static/js",
        watch: "src/assets/js/**/*.js"
    }
}

const clean = () => {
    return del(["src/static"]);
}

const styles = () => {
    return gulp
    .src(paths.styles.src)
    .pipe(sass())
    .pipe(
        autoprefixer({
            cascade: false
        })
    )
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.styles.dest));
}

const js = () => gulp.src(paths.js.src).pipe(bro()).pipe(gulp.dest(paths.js.dest));


const watchFiles = () => {
    gulp.watch(paths.styles.watch, styles);
    gulp.watch(paths.js.watch, js);
}

const dev = gulp.series(clean, styles, js, watchFiles);

export default dev;