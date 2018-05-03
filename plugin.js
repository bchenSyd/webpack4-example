var ModuleFilenameHelpers = require('webpack/lib/ModuleFilenameHelpers');
var ExternalModule = require('webpack/lib/ExternalModule');

function ExternalsPlugin(opts) {
  this.opts = opts;
}

ExternalsPlugin.prototype.apply = function (compiler) {
  var opts = this.opts;
  compiler.hooks.normalModuleFactory.tap('external plugin', nmf => {
    nmf.hooks.factory.tap('external factory', factory => {
      debugger;
      console.info("=========================================================================");
      console.info(" my previous plugin's output is now my input ");
      console.info("=========================================================================");

      return function (data, callback) {
        debugger;
        factory(data, function (err, module /* the normal module that native nmf resolved */) {
          if (err) {
            return callback(err);
          }
          if (ModuleFilenameHelpers.matchObject(opts, module.resource)) {
            return callback(null, new ExternalModule(
              data.request,
              opts.type || compiler.options.output.libraryTarget
            ));
          }
          callback(null, module);
        });
      };


    });
  });
};

module.exports = ExternalsPlugin;