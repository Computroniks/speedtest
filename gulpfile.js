// SPDX-FileCopyrightText: 2022 Matthew Nickson <mnickson@sidingsmedia.com>
// SPDX-License-Identifier: MIT

const gulp = require("gulp");
const del = require("del");
const ts = require("gulp-typescript");
const fs = require("fs")
const path = require("path");
const { exec } = require("child_process");
const log = require("fancy-log");
const eslint = require("gulp-eslint");

/**
 * Clean the build directory
 * @returns {Promise<string[]>}
 */
function clean() {
    return del(["build"]);
}

/**
 * Copy the static server files
 * @param {function(Error)} cb 
 */
function copyServerFiles(cb) {
    let staticFiles = [
        "server/package.json",
        "server/yarn.lock"
    ]

    staticFiles.forEach((file) => {
        fs.copyFile(
            path.join(__dirname, file),
            path.join(__dirname, "build", file),
            (err) => {
                if (err) cb(new Error(err));
            }
        );
    });

    cb()
}

/**
 * Transpile the TypeScript code to JavaScript
 * @returns {NodeJs.ReadWriteStream}
 */
function transpileTypeScript() {
    let tsProject = ts.createProject("server/tsconfig.json");
    let tsResult = tsProject.src().pipe(tsProject());
    return tsResult.js.pipe(gulp.dest("build"));
}

/**
 * Run type checking on the frontend code
 * @param {function(Error)} cb 
 */
function vueTypeCheck(cb) {
    exec("yarn --cwd client vue-tsc --noEmit -p tsconfig.vitest.json --composite false", (err, stdout, stderr) => {
        log.error(stderr);
        cb(err);
    })
}

/**
 * Build the frontend
 * @param {function(Error)} cb 
 */
function buildVue(cb) {
    exec("yarn --cwd client vite build", (err, stdout, stderr) => {
        log.error(stderr);
        cb(err);
    });
}

/**
 * Build the OpenAPI docs
 * @param {function(Error)} cb 
 */
function buildOpenAPI(cb) {
    exec("yarn openapi bundle -o build/server/static/generated/openapi.json", (err, stdout, stderr) => {
        log.error(stderr);
        cb(err); 
    });
}

/**
 * Install the server dependancies in build
 * @param {function(Error)} cb 
 */
function install(cb) {
    exec("yarn --cwd build/server install", (err, stdout, stderr) => {
        log(stdout);
        log.error(stderr);
        cb(err);
    })
}

/**
 * Lint the OpenAPI files
 * @param {function(Error)} cb 
 */
function lintOpenAPI(cb) {
    exec("yarn openapi lint", (err, stdout, stderr) => {
        log.error(stderr);
        cb(err);
    })
}

/**
 * Use ESLint to lint code
 * @returns {any}
 */
function lintCode() {
    return gulp.src(
        [
            "**/*.ts",
            "**/*.vue",
            "**/*.css",
            "!node_modules/**",
            "!client/node_modules/**",
            "!server/node_modules/**",
            "!build/**"
        ])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
}

/**
 * Run reuse lint
 * Will not stop build on failiure, only output results to stdout
 * @param {function(Error)} cb 
 */
function lintReuse(cb) {
    exec("reuse lint", (err, stdout, stderr) => {
        if (err) {
            log.error(stdout);
        }
        // We don't want to stop build for this, just output and
        // continue.
        cb()
    })
}

exports.clean = clean;
exports.install = install;
exports.buildclient = gulp.series(
    vueTypeCheck,
    buildVue
)
exports.buildserver = gulp.series(
    transpileTypeScript,
    copyServerFiles
)
exports.builddocs = gulp.parallel(
    buildOpenAPI
)
exports.reuse = lintReuse
exports.lint = gulp.parallel(
    lintOpenAPI,
    lintCode,
    lintReuse
)
exports.build = gulp.parallel(
    exports.buildserver,
    exports.buildclient,
    exports.builddocs
);
exports.buildclean = gulp.series(
    clean,
    exports.build
)
exports.default = gulp.series(
    exports.lint,
    exports.buildclean
)
