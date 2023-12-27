// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }
  return bundleURL;
}
function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }
  return '/';
}
function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/main.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/ts/handlePassword.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shufflePassword = exports.passwordCheck = exports.passwordEdit = exports.copyPassword = exports.printPassword = void 0;
var printPassword = function printPassword(element, password) {
  element.value = password;
  element.classList.add("generated");
};
exports.printPassword = printPassword;
var copyPassword = function copyPassword(element) {
  element.select();
  document.execCommand("copy");
};
exports.copyPassword = copyPassword;
var passwordEdit = function passwordEdit(element) {
  element.removeAttribute("readonly");
  element.focus();
  if (!element.nextElementSibling) return;
  element.nextElementSibling.innerHTML = "\n    <button class=\"generated-result__icon\" data-password-check>\n      <i class=\"fa-solid fa-check\"></i>\n    </button>\n    ";
};
exports.passwordEdit = passwordEdit;
var passwordCheck = function passwordCheck(element) {
  element.setAttribute("readonly", "readonly");
  if (!element.nextElementSibling) return;
  element.nextElementSibling.innerHTML = "\n    <button class=\"generated-result__icon\" data-password-copy>\n      <i class=\"fa-solid fa-copy\"></i>\n    </button>\n    <button class=\"generated-result__icon\" data-password-edit>\n      <i class=\"fa-regular fa-pen-to-square\"></i>\n    </button>\n    ";
};
exports.passwordCheck = passwordCheck;
var shufflePassword = function shufflePassword(array) {
  var _a;
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    _a = [array[j], array[i]], array[i] = _a[0], array[j] = _a[1];
  }
};
exports.shufflePassword = shufflePassword;
},{}],"src/ts/getPasswordParams.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPasswordParams = void 0;
exports.getPasswordParams = {
  lowercase: document.getElementById("lowercase-letters"),
  uppercase: document.getElementById("uppercase-letters"),
  numbers: document.getElementById("numbers"),
  symbols: document.getElementById("symbols")
};
},{}],"src/ts/calculatePasswordStrength.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculatePasswordStrength = void 0;
var passwordStrengthLevels = {
  weak: "Weak",
  medium: "Medium",
  strong: "Strong",
  veryStrong: "Very Strong"
};
var calculatePasswordStrength = function calculatePasswordStrength(element, pointElements, password, passwordParams) {
  var passwordLength = password.length;
  var passwordParamsLength = passwordParams.length;
  var passwordScore = 0;
  for (var i = 0; i <= passwordParamsLength; i++) {
    passwordScore += 3;
  }
  for (var j = 0; j <= passwordLength; j++) {
    passwordScore += 5;
  }
  passwordScore = Math.ceil(passwordScore);
  pointElements.forEach(function (element) {
    return element.style.backgroundColor = "transparent";
  });
  if (passwordScore <= 50) {
    element.textContent = passwordStrengthLevels.weak;
    pointElements.forEach(function (element, index) {
      return index < 1 && (element.style.backgroundColor = "gold");
    });
  } else if (passwordScore < 65) {
    element.textContent = passwordStrengthLevels.medium;
    pointElements.forEach(function (element, index) {
      return index < 2 && (element.style.backgroundColor = "gold");
    });
  } else if (passwordScore <= 80) {
    element.textContent = passwordStrengthLevels.strong;
    pointElements.forEach(function (element, index) {
      return index < 3 && (element.style.backgroundColor = "gold");
    });
  } else if (passwordScore > 80) {
    element.textContent = passwordStrengthLevels.veryStrong;
    pointElements.forEach(function (element, index) {
      return index < 4 && (element.style.backgroundColor = "gold");
    });
  }
};
exports.calculatePasswordStrength = calculatePasswordStrength;
},{}],"src/ts/generatePassword.ts":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});
var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGeneratedPassword = void 0;
var handlePassword = __importStar(require("./handlePassword"));
var calculatePasswordStrength_1 = require("./calculatePasswordStrength");
var passwordResultElem = document.getElementById("generated-result");
var strengthPointsElems = document.querySelectorAll("[data-strength-point]");
var getGeneratedPassword = function getGeneratedPassword(passwordParams, passwordRange) {
  var passwordStrengthValueElem = strengthPointsElems[0].previousElementSibling;
  var storedPassword = [];
  var generatedPassword = "";
  var passwordLength = Math.ceil(parseInt(passwordRange.value) / passwordParams.length);
  var generatePassword = function generatePassword() {
    return passwordParams.map(function (param) {
      switch (param.id) {
        case "uppercase-letters":
          storedPassword.push(getUpperCaseLetter());
          break;
        case "lowercase-letters":
          storedPassword.push(getLowerCaseLetter());
          break;
        case "numbers":
          storedPassword.push(getNumber());
          break;
        case "symbols":
          storedPassword.push(getSymbol());
          break;
      }
    });
  };
  for (var i = 1; i <= passwordLength; i++) {
    generatePassword();
  }
  handlePassword.shufflePassword(storedPassword);
  generatedPassword = storedPassword.join("").slice(0, parseInt(passwordRange.value));
  (0, calculatePasswordStrength_1.calculatePasswordStrength)(passwordStrengthValueElem, strengthPointsElems, generatedPassword, passwordParams);
  handlePassword.printPassword(passwordResultElem, generatedPassword);
};
exports.getGeneratedPassword = getGeneratedPassword;
var getUpperCaseLetter = function getUpperCaseLetter() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};
var getLowerCaseLetter = function getLowerCaseLetter() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};
var getNumber = function getNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
};
var getSymbol = function getSymbol() {
  return String.fromCharCode(Math.floor(Math.random() * 15) + 33);
};
},{"./handlePassword":"src/ts/handlePassword.ts","./calculatePasswordStrength":"src/ts/calculatePasswordStrength.ts"}],"src/ts/events.ts":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});
var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var handlePassword = __importStar(require("./handlePassword"));
var getPasswordParams_1 = require("./getPasswordParams");
var generatePassword_1 = require("./generatePassword");
var resultWrapperElem = document.getElementById("result-wrapper");
var passwordResultElem = document.getElementById("generated-result");
var formElem = document.getElementById("password-form");
var passwordLenghtElem = document.getElementById("password-length");
passwordLenghtElem.addEventListener("input", function (e) {
  var target = e.target;
  if (passwordLenghtElem.previousElementSibling == null) return;
  passwordLenghtElem.previousElementSibling.textContent = target.value;
});
formElem.addEventListener("submit", function (e) {
  e.preventDefault();
  var checkedParams = Object.values(getPasswordParams_1.getPasswordParams).filter(function (param) {
    return param.checked;
  });
  if (!checkedParams.length) {
    return alert("You need to include at least 1 parametr in your generated password");
  } else {
    return (0, generatePassword_1.getGeneratedPassword)(checkedParams, passwordLenghtElem);
  }
});
resultWrapperElem.addEventListener("click", function (e) {
  var element = e.target;
  element.closest("[data-password-edit]") ? handlePassword.passwordEdit(passwordResultElem) : null;
  element.closest("[data-password-copy]") ? handlePassword.copyPassword(passwordResultElem) : null;
  element.closest("[data-password-check]") ? handlePassword.passwordCheck(passwordResultElem) : null;
});
},{"./handlePassword":"src/ts/handlePassword.ts","./getPasswordParams":"src/ts/getPasswordParams.ts","./generatePassword":"src/ts/generatePassword.ts"}],"src/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
require("./main.scss");
require("./ts/events");
//https://net-comber.com/charset.html
},{"./main.scss":"src/main.scss","./ts/events":"src/ts/events.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "43615" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.js.map