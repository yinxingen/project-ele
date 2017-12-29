const gulp = require("gulp")
const concat = require('gulp-concat') //合并
const cleanCSS = require('gulp-clean-css'); //压缩css
const autoprefixer = require('gulp-autoprefixer'); //css兼容
const webserver = require("gulp-webserver") //热更新模块
    //热更新服务的任务
gulp.task('server', function() {
    gulp.src('./').
    pipe(webserver({
        // host:"192.168.23.1",
        port: 9000,
        livereload: true, //是否热更新
        directoryListing: false,
        proxies: [{
                source: '/shopping/v3/hot_search_words',
                target: 'https://restapi.ele.me/shopping/v3/hot_search_words',
                options: { headers: { 'ABC_HEADER': 'abc' } }
            },
            {
                source: '/shopping/v2/entries',
                target: 'https://restapi.ele.me/shopping/v2/entries',
                options: { headers: { 'ABC_HEADER': 'abc' } }
            },
            {
                source: '/shopping/restaurants',
                target: 'https://restapi.ele.me/shopping/restaurants',
                options: { headers: { 'ABC_HEADER': 'abc' } }
            }
        ]
    }))
})

const sass = require('gulp-sass') //处理sass的模块
gulp.task('sass', function() { //编译sass的任务
    setTimeout(function() {
        gulp.src('./src/sass/**/*.scss').
        pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
            .pipe(concat('index.css'))
            // .pipe(cleanCSS({compatibility: 'ie8'}))
            // .pipe(autoprefixer({
            //     browsers: ['last 2 versions'],
            //     cascade: false
            // }))
            .pipe(gulp.dest("./build/css"))
    }, 200)

})


//js处理

const webpack = require('gulp-webpack')
const uglify = require('gulp-uglify');
const rename = require('gulp-rename')
gulp.task("packjs", function() {
    gulp.src("./src/js/index.js")
        .pipe(webpack({
            output: {
                filename: 'index.js'
            },
            module: {
                loaders: [{
                    test: /\.js$/,
                    loader: "babel-loader",
                    query: {
                        presets: ['es2015']
                    }
                }]
            }
        }))
        // .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest('./build/js'))
})

//监听sass任务
gulp.task('watch:sass', function() {
        gulp.watch('./src/sass/**/*.scss', ['sass'])
    })
    //监听js任务
gulp.task('watch:js', function() {
    gulp.watch('./src/js/**/*.js', ['packjs'])
})


//默认任务
gulp.task('default', ['sass', 'watch:sass', 'packjs', 'watch:js', 'server'])