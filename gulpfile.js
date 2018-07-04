var gulp = require('gulp');
var ts = require('gulp-typescript');
var less = require('gulp-less');

var tsProject = ts.createProject("tsconfig.json");

gulp.task("ts", function () {
	return tsProject.src()
		.pipe(tsProject())
		.js.pipe(gulp.dest(""));
});
gulp.watch('ngx.layer.ts', ['ts']);

gulp.task('less', function() {
	return gulp.src('css/*.less') // only compile the entry file
		.pipe(less()).on('error', function(err) {
			this.emit('end');
			console.log(err);
		})
		.pipe(gulp.dest('./css'))
});
gulp.watch('css/*.less', ['less']);


/**
 * demo file
 */
var demoProject = ts.createProject("demo/tsconfig.json");
gulp.task('demo', function () {
	return demoProject.src()
		.pipe(demoProject())
		.js.pipe(gulp.dest("demo/app"));
});
gulp.watch('demo/app/**/*.ts', ["demo"]);

gulp.task('default', ['ts', 'less', 'demo']);