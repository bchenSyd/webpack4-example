var ModuleFilenameHelpers = require('webpack/lib/ModuleFilenameHelpers');
var ExternalModule = require('webpack/lib/ExternalModule');

function ExternalsPlugin(opts) {
  this.opts = opts;
}

ExternalsPlugin.prototype.apply = function (compiler) {
  var opts = this.opts;
  compiler.hooks.normalModuleFactory.tap('my NMF plugin', __builtIn_nmf => {
    // /opt/git/webpack-tapble/webpack/lib/NormalModuleFactory.js, line 379
    // this.hooks.beforeResolve.callAsync({contextInfo, request...}, (err, result)=>{    this.hooks.factory.call(null);     })
    __builtIn_nmf.hooks.factory.tap('my NMF factory plugin', _buildin_factory_function /* default factory_functin provided by webpack*/ => {
      // triggered by Tabpable.hooks.factory.call(null);
      debugger;
      console.info("=========================================================================");
      console.info(" my previous plugin's output is now my input ");
      console.info("=========================================================================");

      // the customerizedFactoryFunction, or finalFactoryFunction, is all the outsides world can see;
      const customerizedFactoryFunction = (__preResolve_result, callback) => {
        debugger;
        // as you can see
        _buildin_factory_function(__preResolve_result, function (err, module /* the normal module that native nmf resolved */) {
          if (err) {
            return callback(err);
          }
          if (ModuleFilenameHelpers.matchObject(opts, module.resource)) {
            return callback(null, new ExternalModule(
              __preResolve_result.request,
              opts.type || compiler.options.output.libraryTarget
            ));
          }
          callback(null, module);
        });
      };
      return customerizedFactoryFunction;// must return something;  last ring in the chain;
    });
    // we should return something; return __builtIn_nmf maybe; but it's not neccessary as 
    //  /opt/git/webpack-tapble/webpack/lib/Compiler.js line:449 alway use the default nmf;
    return null;  //  shouldn't I return a new nmf as result?? as the last ring in the chain;  search: #NMFNULL
  });
}

module.exports = ExternalsPlugin;