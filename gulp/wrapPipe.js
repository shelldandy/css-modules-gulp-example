/**
 * Wrap gulp streams into fail-safe function for better error reporting
 * Usage:
 * gulp.task('less', wrapPipe(function(success, error) {
 *   return gulp.src('less/*.less')
 *      .pipe(less().on('error', error))
 *      .pipe(gulp.dest('app/css'))
 * }))
 */
function wrapPipe (taskFn) {
  return function (done) {
    var onSuccess = function () {
      done()
    }
    var onError = function (err) {
      done(err)
    }
    var outStream = taskFn(onSuccess, onError)
    if (outStream && typeof outStream.on === 'function') {
      outStream.on('end', onSuccess)
    }
  }
}

module.exports = wrapPipe
