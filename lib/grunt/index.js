var bower = require('bower'),
    path = require('path');
module.exports = function(grunt) {
  var _ = grunt.util._, root = grunt.config('root');
  var allFiles = grunt.file.expand(path.join(root, 'src', '*.js'));
  var allModules = _.map(allFiles, function(file) {
    file = file.replace(path.join(root, 'src'), '');
    file = file.replace(/\.js$/, '');
    return file.replace(/\//g, '.');
  });
  _.forEach(['combinator', 'build'], function(task) {
    grunt.registerTask(task, 'Combine components into a single wrapped file', function() {
      var files;
      var mod = 'ink';
      var all = false;
      if (this.args.length > 0 && this.args.indexOf('all') < 0) {
        var args = this.args;
        if (this.args.indexOf('common') < 0) {
          this.args.push('common');
        }
        files = _.sortBy(_.compact(_.map(this.args, function(val) {
          val = val.toLowerCase();
          var file = val + '.js';

          var name = path.join(root, 'src', file);
          if (grunt.file.exists(name)) {
            if (mod === 'ink' && args.length < 3) {
              mod = val;
            }
            return name;
          }
          return false;
        })));
        if (_.isEqual(files, allFiles)) {
          mod = 'ink';
          all = true;
        }
      } else {
        files = allFiles;
        all = true;
      }
      if (!files || files.length < 1) {
        return grunt.fatal('Cannot combinate 0 files');
      }
      var exports = {
        directive: [],
        controller: [],
        provider: [],
        service: [],
        factory: [],
        constant: [],
        value: []
      };
      var processed = _.map(files, function(file) {
        var text = grunt.file.read(file);
        _.forEach(exports, function(val, key) {
          var str = "//@" + key, i = 0;
          while ((i = text.indexOf(str, i)) >= 0) {
            var from = text.slice(i + str.length), start = text.substr(0, i), match =
            /^\s+([a-zA-Z0-9_$]+)(?![\r\n])*(\r\n|[\r\n])+/.exec(from);
            if (match) {
              val.push(match[1]);
              from = from.slice(match[0].length);
            }
            text = start + from;
          }
        });
        text = text.replace(/\/\/@exports([\s\S]*?)\/\/@end/g, "");
        return unwrap(text);
      });
      var ngMod = mod;
      if (ngMod !== 'ink') {
        ngMod = 'ink.' + ngMod;
      }
      processed.push('\nangular.module(\''+ngMod+'\', [])\n' + _.compact(_.map(exports,
      function(val, key) {
        var items = _.compact(_.map(val, function(name) {
          return '  \'' + name + '\': ' + name;
        }));
        if (items.length > 0)
          return '.' + key + '({\n' + items.join(",\n") + '\n})';
      })).join(grunt.util.normalizelf('\n')) + ';\n\n');
      if (mod !== 'ink') {
        mod = 'ink-' + mod;
      } else if (!all) {
        mod = 'ink-custom';
      }
      grunt.file.write(path.join(root, 'build', 'ng-' + mod + '.js'),
        wrap(processed.join(grunt.util.normalizelf('\n'))));
    });
  });

  function unwrap(text) {
    var begin = "\\(function\\(window,\\s* document,\\s* undefined\\) \\{'use\\s+strict';",
        end = "\\}\\)\\(window,\\s*document\\);";
        text = text.replace(new RegExp('^\\s*' + begin + '\\s*', 'm'), '');
        text = text.replace(new RegExp('\\s*' + end + '\\s*$', 'm'), '');
    return text;
  }
  function wrap(text) {
    return "(function(window, document, undefined) {'use strict';\n\n" +
           text + "})(window, document);";
  }

  grunt.registerTask('bower', 'Install bower packages', function() {
    var done = this.async();

    bower.commands.install()
      .on('log', function (result) {
        grunt.log.ok('bower: ' + result.id + ' ' + result.data.endpoint.name);
      })
      .on('error', grunt.fail.warn.bind(grunt.fail))
      .on('end', done);
  });

  grunt.renameTask('copy', 'bower_copy');
  grunt.registerTask('copy', 'Copy assets to build directory', ['bower', 'bower_copy']);
}