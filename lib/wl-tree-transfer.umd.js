(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["wl-tree-transfer"] = factory();
	else
		root["wl-tree-transfer"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "01f9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("2d00");
var $export = __webpack_require__("5ca1");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var $iterCreate = __webpack_require__("41a0");
var setToStringTag = __webpack_require__("7f20");
var getPrototypeOf = __webpack_require__("38fd");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "02f4":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var defined = __webpack_require__("be13");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "0a49":
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__("9b43");
var IObject = __webpack_require__("626a");
var toObject = __webpack_require__("4bf8");
var toLength = __webpack_require__("9def");
var asc = __webpack_require__("cd1c");
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),

/***/ "0bfb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__("cb7c");
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "0d58":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("ce10");
var enumBugKeys = __webpack_require__("e11e");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "1169":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__("2d95");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "11e9":
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__("52a7");
var createDesc = __webpack_require__("4630");
var toIObject = __webpack_require__("6821");
var toPrimitive = __webpack_require__("6a99");
var has = __webpack_require__("69a8");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__("9e1e") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "1495":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var anObject = __webpack_require__("cb7c");
var getKeys = __webpack_require__("0d58");

module.exports = __webpack_require__("9e1e") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "1fa8":
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__("cb7c");
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),

/***/ "230e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var document = __webpack_require__("7726").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "23c6":
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__("2d95");
var TAG = __webpack_require__("2b4c")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "2621":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "27ee":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("23c6");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var Iterators = __webpack_require__("84f2");
module.exports = __webpack_require__("8378").getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "2aba":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var has = __webpack_require__("69a8");
var SRC = __webpack_require__("ca5a")('src');
var $toString = __webpack_require__("fa5b");
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__("8378").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "2aeb":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("cb7c");
var dPs = __webpack_require__("1495");
var enumBugKeys = __webpack_require__("e11e");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("230e")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("fab2").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "2b4c":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("5537")('wks');
var uid = __webpack_require__("ca5a");
var Symbol = __webpack_require__("7726").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "2d00":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "2d95":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "32e9":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");
module.exports = __webpack_require__("9e1e") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "33a4":
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__("84f2");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),

/***/ "38fd":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("69a8");
var toObject = __webpack_require__("4bf8");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "3b2b":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var inheritIfRequired = __webpack_require__("5dbc");
var dP = __webpack_require__("86cc").f;
var gOPN = __webpack_require__("9093").f;
var isRegExp = __webpack_require__("aae3");
var $flags = __webpack_require__("0bfb");
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (__webpack_require__("9e1e") && (!CORRECT_NEW || __webpack_require__("79e5")(function () {
  re2[__webpack_require__("2b4c")('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__("2aba")(global, 'RegExp', $RegExp);
}

__webpack_require__("7a56")('RegExp');


/***/ }),

/***/ "41a0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("2aeb");
var descriptor = __webpack_require__("4630");
var setToStringTag = __webpack_require__("7f20");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("32e9")(IteratorPrototype, __webpack_require__("2b4c")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "4588":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "4630":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "4a59":
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__("9b43");
var call = __webpack_require__("1fa8");
var isArrayIter = __webpack_require__("33a4");
var anObject = __webpack_require__("cb7c");
var toLength = __webpack_require__("9def");
var getIterFn = __webpack_require__("27ee");
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),

/***/ "4bf8":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "4db4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.vaPhone = vaPhone;
exports.regPhone = regPhone;
exports.isNum = isNum;
exports.isInteger = isInteger;
exports.validate = validate;

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * auth: weilan
 * time: 2020-03-11
 * des: el自定义表单验证及正则验证
 * rule：el校验以va开头 vaPhone；正则验证以reg开头 
 */
// el手机格式校验
function vaPhone(rule, value, callback) {
  if (!value || regPhone(value)) {
    callback();
  } else {
    callback(new Error('请输入正确的手机号!'));
  }
} // 正则手机格式校验


function regPhone(value) {
  return /^1[3-9][0-9]{9}/.test(value);
}
/**
 * 验证是数字类型或可转换为数字类型
 * @param {*} value 要验证的值
 */


function isNum(value) {
  return !Number.isNaN(Math.sign(value));
}
/**
 * @name 验证整数
 * @param {*} val 要验证的内容 
 */


function isInteger(val) {
  return /^[0-9]*$/.test(value);
}
/**
 * 需要校验的表格验证
 * @param {*} columns 表头
 * @param {*} length 长度
 */


function validate(columns, length, _vm) {
  var _va_columns = columns.filter(function (i) {
    return i.validate;
  });

  var _iterator = _createForOfIteratorHelper(_va_columns),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var i = _step.value;

      for (var t = 0; t < length; t++) {
        var _va_result = _vm.$refs[i.prop + t].validate();

        if (!_va_result) return false;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return true;
}

/***/ }),

/***/ "4f7f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__("c26b");
var validate = __webpack_require__("b39a");
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__("e0b8")(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),

/***/ "52a7":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "5537":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("8378");
var global = __webpack_require__("7726");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("2d00") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "598d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _time2 = _interopRequireDefault(__webpack_require__("93bf"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var VaJwt = /*#__PURE__*/function () {
  function VaJwt() {
    _classCallCheck(this, VaJwt);
  }

  _createClass(VaJwt, null, [{
    key: "extractJwtPayload",

    /**
     * 截取jwt中有效载荷部分
     * @param {*} jwt 
     */
    value: function extractJwtPayload(jwt) {
      if (!jwt) throw Error('缺少jwt！');
      var jwt_split = jwt.split('.');
      if (jwt_split.length !== 3) throw Error('jwt格式不正确！');
      return jwt_split[1];
    }
    /**
     * 简单解析未特殊加密的payload部分
     * @param {*} jwt 
     */

  }, {
    key: "payloadAtob",
    value: function payloadAtob(jwt) {
      var jwt_payload = this.extractJwtPayload(jwt);
      var decodedData = window.atob(jwt_payload);
      return JSON.parse(decodedData);
    }
    /**
     * 检验jwt是否过期
     * @param {String} jwt 
     * @param {Function} vaCb 自定义验证函数，返回Boolean true表示过期
     */

  }, {
    key: "vaJwtExpired",
    value: function vaJwtExpired(jwt, vaCb) {
      var exp = this.payloadAtob(jwt).exp * 1000;

      if (vaCb) {
        return vaCb(exp);
      }

      var _time = new _time2["default"](exp);

      return _time.isBefore(new Date());
    }
    /**
     * 监测浏览器tab页切换立即校验账号
     * @param {Function} cb 检测到切换后的回调函数  
     */

  }, {
    key: "vaVisibilityChange",
    value: function vaVisibilityChange(cb) {
      window.addEventListener("visibilitychange", cb);
    }
  }]);

  return VaJwt;
}();

exports["default"] = VaJwt;

/***/ }),

/***/ "5a0c":
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():undefined}(this,function(){"use strict";var t="millisecond",e="second",n="minute",r="hour",i="day",s="week",u="month",a="quarter",o="year",f="date",h=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d+)?$/,c=/\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,d={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},$=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},l={s:$,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+$(r,2,"0")+":"+$(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,u),s=n-i<0,a=e.clone().add(r+(s?-1:1),u);return+(-(r+(n-i)/(s?i-a:a-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(h){return{M:u,y:o,w:s,d:i,D:f,h:r,m:n,s:e,ms:t,Q:a}[h]||String(h||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},y="en",M={};M[y]=d;var m=function(t){return t instanceof S},D=function(t,e,n){var r;if(!t)return y;if("string"==typeof t)M[t]&&(r=t),e&&(M[t]=e,r=t);else{var i=t.name;M[i]=t,r=i}return!n&&r&&(y=r),r||!n&&y},v=function(t,e){if(m(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new S(n)},g=l;g.l=D,g.i=m,g.w=function(t,e){return v(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var S=function(){function d(t){this.$L=D(t.locale,null,!0),this.parse(t)}var $=d.prototype;return $.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(g.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(h);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},$.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},$.$utils=function(){return g},$.isValid=function(){return!("Invalid Date"===this.$d.toString())},$.isSame=function(t,e){var n=v(t);return this.startOf(e)<=n&&n<=this.endOf(e)},$.isAfter=function(t,e){return v(t)<this.startOf(e)},$.isBefore=function(t,e){return this.endOf(e)<v(t)},$.$g=function(t,e,n){return g.u(t)?this[e]:this.set(n,t)},$.unix=function(){return Math.floor(this.valueOf()/1e3)},$.valueOf=function(){return this.$d.getTime()},$.startOf=function(t,a){var h=this,c=!!g.u(a)||a,d=g.p(t),$=function(t,e){var n=g.w(h.$u?Date.UTC(h.$y,e,t):new Date(h.$y,e,t),h);return c?n:n.endOf(i)},l=function(t,e){return g.w(h.toDate()[t].apply(h.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(e)),h)},y=this.$W,M=this.$M,m=this.$D,D="set"+(this.$u?"UTC":"");switch(d){case o:return c?$(1,0):$(31,11);case u:return c?$(1,M):$(0,M+1);case s:var v=this.$locale().weekStart||0,S=(y<v?y+7:y)-v;return $(c?m-S:m+(6-S),M);case i:case f:return l(D+"Hours",0);case r:return l(D+"Minutes",1);case n:return l(D+"Seconds",2);case e:return l(D+"Milliseconds",3);default:return this.clone()}},$.endOf=function(t){return this.startOf(t,!1)},$.$set=function(s,a){var h,c=g.p(s),d="set"+(this.$u?"UTC":""),$=(h={},h[i]=d+"Date",h[f]=d+"Date",h[u]=d+"Month",h[o]=d+"FullYear",h[r]=d+"Hours",h[n]=d+"Minutes",h[e]=d+"Seconds",h[t]=d+"Milliseconds",h)[c],l=c===i?this.$D+(a-this.$W):a;if(c===u||c===o){var y=this.clone().set(f,1);y.$d[$](l),y.init(),this.$d=y.set(f,Math.min(this.$D,y.daysInMonth())).$d}else $&&this.$d[$](l);return this.init(),this},$.set=function(t,e){return this.clone().$set(t,e)},$.get=function(t){return this[g.p(t)]()},$.add=function(t,a){var f,h=this;t=Number(t);var c=g.p(a),d=function(e){var n=v(h);return g.w(n.date(n.date()+Math.round(e*t)),h)};if(c===u)return this.set(u,this.$M+t);if(c===o)return this.set(o,this.$y+t);if(c===i)return d(1);if(c===s)return d(7);var $=(f={},f[n]=6e4,f[r]=36e5,f[e]=1e3,f)[c]||1,l=this.$d.getTime()+t*$;return g.w(l,this)},$.subtract=function(t,e){return this.add(-1*t,e)},$.format=function(t){var e=this;if(!this.isValid())return"Invalid Date";var n=t||"YYYY-MM-DDTHH:mm:ssZ",r=g.z(this),i=this.$locale(),s=this.$H,u=this.$m,a=this.$M,o=i.weekdays,f=i.months,h=function(t,r,i,s){return t&&(t[r]||t(e,n))||i[r].substr(0,s)},d=function(t){return g.s(s%12||12,t,"0")},$=i.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:g.s(a+1,2,"0"),MMM:h(i.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:g.s(this.$D,2,"0"),d:String(this.$W),dd:h(i.weekdaysMin,this.$W,o,2),ddd:h(i.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:g.s(s,2,"0"),h:d(1),hh:d(2),a:$(s,u,!0),A:$(s,u,!1),m:String(u),mm:g.s(u,2,"0"),s:String(this.$s),ss:g.s(this.$s,2,"0"),SSS:g.s(this.$ms,3,"0"),Z:r};return n.replace(c,function(t,e){return e||l[t]||r.replace(":","")})},$.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},$.diff=function(t,f,h){var c,d=g.p(f),$=v(t),l=6e4*($.utcOffset()-this.utcOffset()),y=this-$,M=g.m(this,$);return M=(c={},c[o]=M/12,c[u]=M,c[a]=M/3,c[s]=(y-l)/6048e5,c[i]=(y-l)/864e5,c[r]=y/36e5,c[n]=y/6e4,c[e]=y/1e3,c)[d]||y,h?M:g.a(M)},$.daysInMonth=function(){return this.endOf(u).$D},$.$locale=function(){return M[this.$L]},$.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=D(t,e,!0);return r&&(n.$L=r),n},$.clone=function(){return g.w(this.$d,this)},$.toDate=function(){return new Date(this.valueOf())},$.toJSON=function(){return this.isValid()?this.toISOString():null},$.toISOString=function(){return this.$d.toISOString()},$.toString=function(){return this.$d.toUTCString()},d}(),p=S.prototype;return v.prototype=p,[["$ms",t],["$s",e],["$m",n],["$H",r],["$W",i],["$M",u],["$y",o],["$D",f]].forEach(function(t){p[t[1]]=function(e){return this.$g(e,t[0],t[1])}}),v.extend=function(t,e){return t(e,S,v),v},v.locale=D,v.isDayjs=m,v.unix=function(t){return v(1e3*t)},v.en=M[y],v.Ls=M,v.p={},v});


/***/ }),

/***/ "5ca1":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var core = __webpack_require__("8378");
var hide = __webpack_require__("32e9");
var redefine = __webpack_require__("2aba");
var ctx = __webpack_require__("9b43");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "5cc5":
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__("2b4c")('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),

/***/ "5dbc":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var setPrototypeOf = __webpack_require__("8b97").set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),

/***/ "5df3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__("02f4")(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__("01f9")(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "613b":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5537")('keys');
var uid = __webpack_require__("ca5a");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "626a":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("2d95");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "67ab":
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__("ca5a")('meta');
var isObject = __webpack_require__("d3f4");
var has = __webpack_require__("69a8");
var setDesc = __webpack_require__("86cc").f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__("79e5")(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),

/***/ "6821":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("626a");
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "68e1":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "69a8":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "6a99":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("d3f4");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "7333":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var DESCRIPTORS = __webpack_require__("9e1e");
var getKeys = __webpack_require__("0d58");
var gOPS = __webpack_require__("2621");
var pIE = __webpack_require__("52a7");
var toObject = __webpack_require__("4bf8");
var IObject = __webpack_require__("626a");
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__("79e5")(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;


/***/ }),

/***/ "7514":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__("5ca1");
var $find = __webpack_require__("0a49")(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__("9c6c")(KEY);


/***/ }),

/***/ "7726":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "77f1":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "79e5":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "7a56":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("7726");
var dP = __webpack_require__("86cc");
var DESCRIPTORS = __webpack_require__("9e1e");
var SPECIES = __webpack_require__("2b4c")('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),

/***/ "7f20":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("86cc").f;
var has = __webpack_require__("69a8");
var TAG = __webpack_require__("2b4c")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "7f7f":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc").f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__("9e1e") && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),

/***/ "8378":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.11' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "84f2":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "86cc":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("cb7c");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var toPrimitive = __webpack_require__("6a99");
var dP = Object.defineProperty;

exports.f = __webpack_require__("9e1e") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "8961":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _big = _interopRequireDefault(__webpack_require__("9dcd"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var WlNumber = /*#__PURE__*/function () {
  /**
   * @name 实例化bigjs
   * @param {Number|String} val 
   */
  function WlNumber(val) {
    _classCallCheck(this, WlNumber);

    this._val = new _big["default"](val);
  }
  /**
   * @name 加
   * @param {Number|String} val 要加的值
   */


  _createClass(WlNumber, [{
    key: "plus",
    value: function plus(val) {
      this._val = this._val.plus(val);
      return this._val;
    }
    /**
     * @name 减
     * @param {Number|String} val 要减的值
     */

  }, {
    key: "minus",
    value: function minus(val) {
      this._val = this._val.minus(val);
      return this._val;
    }
    /**
     * @name 乘
     * @param {Number|String} val 要乘的值
     */

  }, {
    key: "times",
    value: function times(val) {
      this._val = this._val.times(val);
      return this._val;
    }
    /**
     * @name 除以
     * @param {Number|String} val 要除以的值
     */

  }, {
    key: "div",
    value: function div(val) {
      this._val = this._val.div(val);
      return this._val;
    }
    /**
     * @name 取余
     * @param {Number|String} val 要除以的值
     */

  }, {
    key: "mod",
    value: function mod(val) {
      this._val = this._val.mod(val);
      return this._val;
    }
    /**
     * @name 取绝对值
     * @param {Number|String} val 取绝对值的值
     */

  }, {
    key: "abs",
    value: function abs() {
      this._val = this._val.abs();
      return this._val;
    }
    /**
     * @name 大于
     * @param {Number|String} val 取比较的值
     * @returns Boolean
     */

  }, {
    key: "gt",
    value: function gt(val) {
      return this._val.gt(val);
    }
    /**
     * @name 大于等于
     * @param {Number|String} val 取比较的值
     * @returns Boolean
     */

  }, {
    key: "gte",
    value: function gte(val) {
      return this._val.gte(val);
    }
    /**
     * @name 小于
     * @param {Number|String} val 取比较的值
     * @returns Boolean
     */

  }, {
    key: "lt",
    value: function lt(val) {
      return this._val.lt(val);
    }
    /**
     * @name 小于等于
     * @param {Number|String} val 取比较的值
     * @returns Boolean
     */

  }, {
    key: "lte",
    value: function lte(val) {
      return this._val.lte(val);
    }
    /**
     * @name 将数据转化为数字类型，如果不可转化则返回0
     * @param {*} val 
     */

  }], [{
    key: "toNumber",
    value: function toNumber(val) {
      return Number(val) || 0;
    }
  }]);

  return WlNumber;
}();

var _default = WlNumber;
exports["default"] = _default;

/***/ }),

/***/ "8b97":
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__("d3f4");
var anObject = __webpack_require__("cb7c");
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__("9b43")(Function.call, __webpack_require__("11e9").f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ "9093":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__("ce10");
var hiddenKeys = __webpack_require__("e11e").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "93bf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dayjs = _interopRequireDefault(__webpack_require__("5a0c"));

var _settings = __webpack_require__("fc2b");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Time = /*#__PURE__*/function () {
  /**
   * 时间类实例化
   * @param {*} date 时间
   * @param {*} format 格式
   */
  function Time() {
    var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    _classCallCheck(this, Time);

    this.__date__ = this.dayjs(date);
    this.__format__ = format;
  }
  /**
   * 将时间格式转化为dayjs格式
   * @param {*} date 时间
   */


  _createClass(Time, [{
    key: "dayjs",
    value: function dayjs(date) {
      this.__date__ = (0, _dayjs["default"])(date);
      return this.__date__;
    }
    /**
     * 格式化时间
     * @param {String} format 格式
     */

  }, {
    key: "format",
    value: function format(_format) {
      var _this$__date__, _this$__date__$format;

      return (_this$__date__ = this.__date__) === null || _this$__date__ === void 0 ? void 0 : (_this$__date__$format = _this$__date__.format) === null || _this$__date__$format === void 0 ? void 0 : _this$__date__$format.call(_this$__date__, _format);
    }
    /**
     * 时间相加
     * @param {*} num 要加的时间
     * @param {*} unit 要加的时间的单位
     */

  }, {
    key: "add",
    value: function add(num) {
      var _this$__date__2, _this$__date__2$add;

      var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _settings._timeUnit.Second;
      return (_this$__date__2 = this.__date__) === null || _this$__date__2 === void 0 ? void 0 : (_this$__date__2$add = _this$__date__2.add) === null || _this$__date__2$add === void 0 ? void 0 : _this$__date__2$add.call(_this$__date__2, num, unit);
    }
    /**
     * 时间相减
     * @param {*} num 要加的时间
     * @param {*} unit 要加的时间的单位
     */

  }, {
    key: "subtract",
    value: function subtract(num) {
      var _this$__date__3, _this$__date__3$subtr;

      var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _settings._timeUnit.Second;
      return (_this$__date__3 = this.__date__) === null || _this$__date__3 === void 0 ? void 0 : (_this$__date__3$subtr = _this$__date__3.subtract) === null || _this$__date__3$subtr === void 0 ? void 0 : _this$__date__3$subtr.call(_this$__date__3, num, unit);
    }
    /**
     * 时间比较，是否之前
     * @param {*} endDate 结束时间
     * @param {*} unit 时间单位默认秒
     */

  }, {
    key: "isBefore",
    value: function isBefore(endDate) {
      var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _settings._timeUnit.Second;
      return this.__date__.isBefore(endDate, unit);
    }
    /**
     * 计算时差
     * @param {*} endDate 结束时间
     * @param {*} unit 时间单位默认秒
     */

  }, {
    key: "diff",
    value: function diff(endDate) {
      var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _settings._timeUnit.Second;
      return this.__date__.diff(endDate, unit);
    }
    /**
     * @name 静态时间格式化
     * @param {Date} date 时间
     * @param {String} format 格式，默认YYYY-MM-DD
     */

  }], [{
    key: "quickFormat",
    value: function quickFormat(date) {
      var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "YYYY-MM-DD";
      return (0, _dayjs["default"])(date).format(format);
    }
    /**
     * @name 初始化时间为dayjs格式
     * @param {Date} date 时间
     */

  }, {
    key: "init",
    value: function init(date) {
      return (0, _dayjs["default"])(date);
    }
  }]);

  return Time;
}();

exports["default"] = Time;

/***/ }),

/***/ "9b43":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("d8e8");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "9c6c":
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__("2b4c")('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__("32e9")(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "9dcd":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*
 *  big.js v5.2.2
 *  A small, fast, easy-to-use library for arbitrary-precision decimal arithmetic.
 *  Copyright (c) 2018 Michael Mclaughlin <M8ch88l@gmail.com>
 *  https://github.com/MikeMcl/big.js/LICENCE
 */
;(function (GLOBAL) {
  'use strict';
  var Big,


/************************************** EDITABLE DEFAULTS *****************************************/


    // The default values below must be integers within the stated ranges.

    /*
     * The maximum number of decimal places (DP) of the results of operations involving division:
     * div and sqrt, and pow with negative exponents.
     */
    DP = 20,          // 0 to MAX_DP

    /*
     * The rounding mode (RM) used when rounding to the above decimal places.
     *
     *  0  Towards zero (i.e. truncate, no rounding).       (ROUND_DOWN)
     *  1  To nearest neighbour. If equidistant, round up.  (ROUND_HALF_UP)
     *  2  To nearest neighbour. If equidistant, to even.   (ROUND_HALF_EVEN)
     *  3  Away from zero.                                  (ROUND_UP)
     */
    RM = 1,             // 0, 1, 2 or 3

    // The maximum value of DP and Big.DP.
    MAX_DP = 1E6,       // 0 to 1000000

    // The maximum magnitude of the exponent argument to the pow method.
    MAX_POWER = 1E6,    // 1 to 1000000

    /*
     * The negative exponent (NE) at and beneath which toString returns exponential notation.
     * (JavaScript numbers: -7)
     * -1000000 is the minimum recommended exponent value of a Big.
     */
    NE = -7,            // 0 to -1000000

    /*
     * The positive exponent (PE) at and above which toString returns exponential notation.
     * (JavaScript numbers: 21)
     * 1000000 is the maximum recommended exponent value of a Big.
     * (This limit is not enforced or checked.)
     */
    PE = 21,            // 0 to 1000000


/**************************************************************************************************/


    // Error messages.
    NAME = '[big.js] ',
    INVALID = NAME + 'Invalid ',
    INVALID_DP = INVALID + 'decimal places',
    INVALID_RM = INVALID + 'rounding mode',
    DIV_BY_ZERO = NAME + 'Division by zero',

    // The shared prototype object.
    P = {},
    UNDEFINED = void 0,
    NUMERIC = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;


  /*
   * Create and return a Big constructor.
   *
   */
  function _Big_() {

    /*
     * The Big constructor and exported function.
     * Create and return a new instance of a Big number object.
     *
     * n {number|string|Big} A numeric value.
     */
    function Big(n) {
      var x = this;

      // Enable constructor usage without new.
      if (!(x instanceof Big)) return n === UNDEFINED ? _Big_() : new Big(n);

      // Duplicate.
      if (n instanceof Big) {
        x.s = n.s;
        x.e = n.e;
        x.c = n.c.slice();
      } else {
        parse(x, n);
      }

      /*
       * Retain a reference to this Big constructor, and shadow Big.prototype.constructor which
       * points to Object.
       */
      x.constructor = Big;
    }

    Big.prototype = P;
    Big.DP = DP;
    Big.RM = RM;
    Big.NE = NE;
    Big.PE = PE;
    Big.version = '5.2.2';

    return Big;
  }


  /*
   * Parse the number or string value passed to a Big constructor.
   *
   * x {Big} A Big number instance.
   * n {number|string} A numeric value.
   */
  function parse(x, n) {
    var e, i, nl;

    // Minus zero?
    if (n === 0 && 1 / n < 0) n = '-0';
    else if (!NUMERIC.test(n += '')) throw Error(INVALID + 'number');

    // Determine sign.
    x.s = n.charAt(0) == '-' ? (n = n.slice(1), -1) : 1;

    // Decimal point?
    if ((e = n.indexOf('.')) > -1) n = n.replace('.', '');

    // Exponential form?
    if ((i = n.search(/e/i)) > 0) {

      // Determine exponent.
      if (e < 0) e = i;
      e += +n.slice(i + 1);
      n = n.substring(0, i);
    } else if (e < 0) {

      // Integer.
      e = n.length;
    }

    nl = n.length;

    // Determine leading zeros.
    for (i = 0; i < nl && n.charAt(i) == '0';) ++i;

    if (i == nl) {

      // Zero.
      x.c = [x.e = 0];
    } else {

      // Determine trailing zeros.
      for (; nl > 0 && n.charAt(--nl) == '0';);
      x.e = e - i - 1;
      x.c = [];

      // Convert string to array of digits without leading/trailing zeros.
      for (e = 0; i <= nl;) x.c[e++] = +n.charAt(i++);
    }

    return x;
  }


  /*
   * Round Big x to a maximum of dp decimal places using rounding mode rm.
   * Called by stringify, P.div, P.round and P.sqrt.
   *
   * x {Big} The Big to round.
   * dp {number} Integer, 0 to MAX_DP inclusive.
   * rm {number} 0, 1, 2 or 3 (DOWN, HALF_UP, HALF_EVEN, UP)
   * [more] {boolean} Whether the result of division was truncated.
   */
  function round(x, dp, rm, more) {
    var xc = x.c,
      i = x.e + dp + 1;

    if (i < xc.length) {
      if (rm === 1) {

        // xc[i] is the digit after the digit that may be rounded up.
        more = xc[i] >= 5;
      } else if (rm === 2) {
        more = xc[i] > 5 || xc[i] == 5 &&
          (more || i < 0 || xc[i + 1] !== UNDEFINED || xc[i - 1] & 1);
      } else if (rm === 3) {
        more = more || !!xc[0];
      } else {
        more = false;
        if (rm !== 0) throw Error(INVALID_RM);
      }

      if (i < 1) {
        xc.length = 1;

        if (more) {

          // 1, 0.1, 0.01, 0.001, 0.0001 etc.
          x.e = -dp;
          xc[0] = 1;
        } else {

          // Zero.
          xc[0] = x.e = 0;
        }
      } else {

        // Remove any digits after the required decimal places.
        xc.length = i--;

        // Round up?
        if (more) {

          // Rounding up may mean the previous digit has to be rounded up.
          for (; ++xc[i] > 9;) {
            xc[i] = 0;
            if (!i--) {
              ++x.e;
              xc.unshift(1);
            }
          }
        }

        // Remove trailing zeros.
        for (i = xc.length; !xc[--i];) xc.pop();
      }
    } else if (rm < 0 || rm > 3 || rm !== ~~rm) {
      throw Error(INVALID_RM);
    }

    return x;
  }


  /*
   * Return a string representing the value of Big x in normal or exponential notation.
   * Handles P.toExponential, P.toFixed, P.toJSON, P.toPrecision, P.toString and P.valueOf.
   *
   * x {Big}
   * id? {number} Caller id.
   *         1 toExponential
   *         2 toFixed
   *         3 toPrecision
   *         4 valueOf
   * n? {number|undefined} Caller's argument.
   * k? {number|undefined}
   */
  function stringify(x, id, n, k) {
    var e, s,
      Big = x.constructor,
      z = !x.c[0];

    if (n !== UNDEFINED) {
      if (n !== ~~n || n < (id == 3) || n > MAX_DP) {
        throw Error(id == 3 ? INVALID + 'precision' : INVALID_DP);
      }

      x = new Big(x);

      // The index of the digit that may be rounded up.
      n = k - x.e;

      // Round?
      if (x.c.length > ++k) round(x, n, Big.RM);

      // toFixed: recalculate k as x.e may have changed if value rounded up.
      if (id == 2) k = x.e + n + 1;

      // Append zeros?
      for (; x.c.length < k;) x.c.push(0);
    }

    e = x.e;
    s = x.c.join('');
    n = s.length;

    // Exponential notation?
    if (id != 2 && (id == 1 || id == 3 && k <= e || e <= Big.NE || e >= Big.PE)) {
      s = s.charAt(0) + (n > 1 ? '.' + s.slice(1) : '') + (e < 0 ? 'e' : 'e+') + e;

    // Normal notation.
    } else if (e < 0) {
      for (; ++e;) s = '0' + s;
      s = '0.' + s;
    } else if (e > 0) {
      if (++e > n) for (e -= n; e--;) s += '0';
      else if (e < n) s = s.slice(0, e) + '.' + s.slice(e);
    } else if (n > 1) {
      s = s.charAt(0) + '.' + s.slice(1);
    }

    return x.s < 0 && (!z || id == 4) ? '-' + s : s;
  }


  // Prototype/instance methods


  /*
   * Return a new Big whose value is the absolute value of this Big.
   */
  P.abs = function () {
    var x = new this.constructor(this);
    x.s = 1;
    return x;
  };


  /*
   * Return 1 if the value of this Big is greater than the value of Big y,
   *       -1 if the value of this Big is less than the value of Big y, or
   *        0 if they have the same value.
  */
  P.cmp = function (y) {
    var isneg,
      x = this,
      xc = x.c,
      yc = (y = new x.constructor(y)).c,
      i = x.s,
      j = y.s,
      k = x.e,
      l = y.e;

    // Either zero?
    if (!xc[0] || !yc[0]) return !xc[0] ? !yc[0] ? 0 : -j : i;

    // Signs differ?
    if (i != j) return i;

    isneg = i < 0;

    // Compare exponents.
    if (k != l) return k > l ^ isneg ? 1 : -1;

    j = (k = xc.length) < (l = yc.length) ? k : l;

    // Compare digit by digit.
    for (i = -1; ++i < j;) {
      if (xc[i] != yc[i]) return xc[i] > yc[i] ^ isneg ? 1 : -1;
    }

    // Compare lengths.
    return k == l ? 0 : k > l ^ isneg ? 1 : -1;
  };


  /*
   * Return a new Big whose value is the value of this Big divided by the value of Big y, rounded,
   * if necessary, to a maximum of Big.DP decimal places using rounding mode Big.RM.
   */
  P.div = function (y) {
    var x = this,
      Big = x.constructor,
      a = x.c,                  // dividend
      b = (y = new Big(y)).c,   // divisor
      k = x.s == y.s ? 1 : -1,
      dp = Big.DP;

    if (dp !== ~~dp || dp < 0 || dp > MAX_DP) throw Error(INVALID_DP);

    // Divisor is zero?
    if (!b[0]) throw Error(DIV_BY_ZERO);

    // Dividend is 0? Return +-0.
    if (!a[0]) return new Big(k * 0);

    var bl, bt, n, cmp, ri,
      bz = b.slice(),
      ai = bl = b.length,
      al = a.length,
      r = a.slice(0, bl),   // remainder
      rl = r.length,
      q = y,                // quotient
      qc = q.c = [],
      qi = 0,
      d = dp + (q.e = x.e - y.e) + 1;    // number of digits of the result

    q.s = k;
    k = d < 0 ? 0 : d;

    // Create version of divisor with leading zero.
    bz.unshift(0);

    // Add zeros to make remainder as long as divisor.
    for (; rl++ < bl;) r.push(0);

    do {

      // n is how many times the divisor goes into current remainder.
      for (n = 0; n < 10; n++) {

        // Compare divisor and remainder.
        if (bl != (rl = r.length)) {
          cmp = bl > rl ? 1 : -1;
        } else {
          for (ri = -1, cmp = 0; ++ri < bl;) {
            if (b[ri] != r[ri]) {
              cmp = b[ri] > r[ri] ? 1 : -1;
              break;
            }
          }
        }

        // If divisor < remainder, subtract divisor from remainder.
        if (cmp < 0) {

          // Remainder can't be more than 1 digit longer than divisor.
          // Equalise lengths using divisor with extra leading zero?
          for (bt = rl == bl ? b : bz; rl;) {
            if (r[--rl] < bt[rl]) {
              ri = rl;
              for (; ri && !r[--ri];) r[ri] = 9;
              --r[ri];
              r[rl] += 10;
            }
            r[rl] -= bt[rl];
          }

          for (; !r[0];) r.shift();
        } else {
          break;
        }
      }

      // Add the digit n to the result array.
      qc[qi++] = cmp ? n : ++n;

      // Update the remainder.
      if (r[0] && cmp) r[rl] = a[ai] || 0;
      else r = [a[ai]];

    } while ((ai++ < al || r[0] !== UNDEFINED) && k--);

    // Leading zero? Do not remove if result is simply zero (qi == 1).
    if (!qc[0] && qi != 1) {

      // There can't be more than one zero.
      qc.shift();
      q.e--;
    }

    // Round?
    if (qi > d) round(q, dp, Big.RM, r[0] !== UNDEFINED);

    return q;
  };


  /*
   * Return true if the value of this Big is equal to the value of Big y, otherwise return false.
   */
  P.eq = function (y) {
    return !this.cmp(y);
  };


  /*
   * Return true if the value of this Big is greater than the value of Big y, otherwise return
   * false.
   */
  P.gt = function (y) {
    return this.cmp(y) > 0;
  };


  /*
   * Return true if the value of this Big is greater than or equal to the value of Big y, otherwise
   * return false.
   */
  P.gte = function (y) {
    return this.cmp(y) > -1;
  };


  /*
   * Return true if the value of this Big is less than the value of Big y, otherwise return false.
   */
  P.lt = function (y) {
    return this.cmp(y) < 0;
  };


  /*
   * Return true if the value of this Big is less than or equal to the value of Big y, otherwise
   * return false.
   */
  P.lte = function (y) {
    return this.cmp(y) < 1;
  };


  /*
   * Return a new Big whose value is the value of this Big minus the value of Big y.
   */
  P.minus = P.sub = function (y) {
    var i, j, t, xlty,
      x = this,
      Big = x.constructor,
      a = x.s,
      b = (y = new Big(y)).s;

    // Signs differ?
    if (a != b) {
      y.s = -b;
      return x.plus(y);
    }

    var xc = x.c.slice(),
      xe = x.e,
      yc = y.c,
      ye = y.e;

    // Either zero?
    if (!xc[0] || !yc[0]) {

      // y is non-zero? x is non-zero? Or both are zero.
      return yc[0] ? (y.s = -b, y) : new Big(xc[0] ? x : 0);
    }

    // Determine which is the bigger number. Prepend zeros to equalise exponents.
    if (a = xe - ye) {

      if (xlty = a < 0) {
        a = -a;
        t = xc;
      } else {
        ye = xe;
        t = yc;
      }

      t.reverse();
      for (b = a; b--;) t.push(0);
      t.reverse();
    } else {

      // Exponents equal. Check digit by digit.
      j = ((xlty = xc.length < yc.length) ? xc : yc).length;

      for (a = b = 0; b < j; b++) {
        if (xc[b] != yc[b]) {
          xlty = xc[b] < yc[b];
          break;
        }
      }
    }

    // x < y? Point xc to the array of the bigger number.
    if (xlty) {
      t = xc;
      xc = yc;
      yc = t;
      y.s = -y.s;
    }

    /*
     * Append zeros to xc if shorter. No need to add zeros to yc if shorter as subtraction only
     * needs to start at yc.length.
     */
    if ((b = (j = yc.length) - (i = xc.length)) > 0) for (; b--;) xc[i++] = 0;

    // Subtract yc from xc.
    for (b = i; j > a;) {
      if (xc[--j] < yc[j]) {
        for (i = j; i && !xc[--i];) xc[i] = 9;
        --xc[i];
        xc[j] += 10;
      }

      xc[j] -= yc[j];
    }

    // Remove trailing zeros.
    for (; xc[--b] === 0;) xc.pop();

    // Remove leading zeros and adjust exponent accordingly.
    for (; xc[0] === 0;) {
      xc.shift();
      --ye;
    }

    if (!xc[0]) {

      // n - n = +0
      y.s = 1;

      // Result must be zero.
      xc = [ye = 0];
    }

    y.c = xc;
    y.e = ye;

    return y;
  };


  /*
   * Return a new Big whose value is the value of this Big modulo the value of Big y.
   */
  P.mod = function (y) {
    var ygtx,
      x = this,
      Big = x.constructor,
      a = x.s,
      b = (y = new Big(y)).s;

    if (!y.c[0]) throw Error(DIV_BY_ZERO);

    x.s = y.s = 1;
    ygtx = y.cmp(x) == 1;
    x.s = a;
    y.s = b;

    if (ygtx) return new Big(x);

    a = Big.DP;
    b = Big.RM;
    Big.DP = Big.RM = 0;
    x = x.div(y);
    Big.DP = a;
    Big.RM = b;

    return this.minus(x.times(y));
  };


  /*
   * Return a new Big whose value is the value of this Big plus the value of Big y.
   */
  P.plus = P.add = function (y) {
    var t,
      x = this,
      Big = x.constructor,
      a = x.s,
      b = (y = new Big(y)).s;

    // Signs differ?
    if (a != b) {
      y.s = -b;
      return x.minus(y);
    }

    var xe = x.e,
      xc = x.c,
      ye = y.e,
      yc = y.c;

    // Either zero? y is non-zero? x is non-zero? Or both are zero.
    if (!xc[0] || !yc[0]) return yc[0] ? y : new Big(xc[0] ? x : a * 0);

    xc = xc.slice();

    // Prepend zeros to equalise exponents.
    // Note: reverse faster than unshifts.
    if (a = xe - ye) {
      if (a > 0) {
        ye = xe;
        t = yc;
      } else {
        a = -a;
        t = xc;
      }

      t.reverse();
      for (; a--;) t.push(0);
      t.reverse();
    }

    // Point xc to the longer array.
    if (xc.length - yc.length < 0) {
      t = yc;
      yc = xc;
      xc = t;
    }

    a = yc.length;

    // Only start adding at yc.length - 1 as the further digits of xc can be left as they are.
    for (b = 0; a; xc[a] %= 10) b = (xc[--a] = xc[a] + yc[a] + b) / 10 | 0;

    // No need to check for zero, as +x + +y != 0 && -x + -y != 0

    if (b) {
      xc.unshift(b);
      ++ye;
    }

    // Remove trailing zeros.
    for (a = xc.length; xc[--a] === 0;) xc.pop();

    y.c = xc;
    y.e = ye;

    return y;
  };


  /*
   * Return a Big whose value is the value of this Big raised to the power n.
   * If n is negative, round to a maximum of Big.DP decimal places using rounding
   * mode Big.RM.
   *
   * n {number} Integer, -MAX_POWER to MAX_POWER inclusive.
   */
  P.pow = function (n) {
    var x = this,
      one = new x.constructor(1),
      y = one,
      isneg = n < 0;

    if (n !== ~~n || n < -MAX_POWER || n > MAX_POWER) throw Error(INVALID + 'exponent');
    if (isneg) n = -n;

    for (;;) {
      if (n & 1) y = y.times(x);
      n >>= 1;
      if (!n) break;
      x = x.times(x);
    }

    return isneg ? one.div(y) : y;
  };


  /*
   * Return a new Big whose value is the value of this Big rounded using rounding mode rm
   * to a maximum of dp decimal places, or, if dp is negative, to an integer which is a
   * multiple of 10**-dp.
   * If dp is not specified, round to 0 decimal places.
   * If rm is not specified, use Big.RM.
   *
   * dp? {number} Integer, -MAX_DP to MAX_DP inclusive.
   * rm? 0, 1, 2 or 3 (ROUND_DOWN, ROUND_HALF_UP, ROUND_HALF_EVEN, ROUND_UP)
   */
  P.round = function (dp, rm) {
    var Big = this.constructor;
    if (dp === UNDEFINED) dp = 0;
    else if (dp !== ~~dp || dp < -MAX_DP || dp > MAX_DP) throw Error(INVALID_DP);
    return round(new Big(this), dp, rm === UNDEFINED ? Big.RM : rm);
  };


  /*
   * Return a new Big whose value is the square root of the value of this Big, rounded, if
   * necessary, to a maximum of Big.DP decimal places using rounding mode Big.RM.
   */
  P.sqrt = function () {
    var r, c, t,
      x = this,
      Big = x.constructor,
      s = x.s,
      e = x.e,
      half = new Big(0.5);

    // Zero?
    if (!x.c[0]) return new Big(x);

    // Negative?
    if (s < 0) throw Error(NAME + 'No square root');

    // Estimate.
    s = Math.sqrt(x + '');

    // Math.sqrt underflow/overflow?
    // Re-estimate: pass x coefficient to Math.sqrt as integer, then adjust the result exponent.
    if (s === 0 || s === 1 / 0) {
      c = x.c.join('');
      if (!(c.length + e & 1)) c += '0';
      s = Math.sqrt(c);
      e = ((e + 1) / 2 | 0) - (e < 0 || e & 1);
      r = new Big((s == 1 / 0 ? '1e' : (s = s.toExponential()).slice(0, s.indexOf('e') + 1)) + e);
    } else {
      r = new Big(s);
    }

    e = r.e + (Big.DP += 4);

    // Newton-Raphson iteration.
    do {
      t = r;
      r = half.times(t.plus(x.div(t)));
    } while (t.c.slice(0, e).join('') !== r.c.slice(0, e).join(''));

    return round(r, Big.DP -= 4, Big.RM);
  };


  /*
   * Return a new Big whose value is the value of this Big times the value of Big y.
   */
  P.times = P.mul = function (y) {
    var c,
      x = this,
      Big = x.constructor,
      xc = x.c,
      yc = (y = new Big(y)).c,
      a = xc.length,
      b = yc.length,
      i = x.e,
      j = y.e;

    // Determine sign of result.
    y.s = x.s == y.s ? 1 : -1;

    // Return signed 0 if either 0.
    if (!xc[0] || !yc[0]) return new Big(y.s * 0);

    // Initialise exponent of result as x.e + y.e.
    y.e = i + j;

    // If array xc has fewer digits than yc, swap xc and yc, and lengths.
    if (a < b) {
      c = xc;
      xc = yc;
      yc = c;
      j = a;
      a = b;
      b = j;
    }

    // Initialise coefficient array of result with zeros.
    for (c = new Array(j = a + b); j--;) c[j] = 0;

    // Multiply.

    // i is initially xc.length.
    for (i = b; i--;) {
      b = 0;

      // a is yc.length.
      for (j = a + i; j > i;) {

        // Current sum of products at this digit position, plus carry.
        b = c[j] + yc[i] * xc[j - i - 1] + b;
        c[j--] = b % 10;

        // carry
        b = b / 10 | 0;
      }

      c[j] = (c[j] + b) % 10;
    }

    // Increment result exponent if there is a final carry, otherwise remove leading zero.
    if (b) ++y.e;
    else c.shift();

    // Remove trailing zeros.
    for (i = c.length; !c[--i];) c.pop();
    y.c = c;

    return y;
  };


  /*
   * Return a string representing the value of this Big in exponential notation to dp fixed decimal
   * places and rounded using Big.RM.
   *
   * dp? {number} Integer, 0 to MAX_DP inclusive.
   */
  P.toExponential = function (dp) {
    return stringify(this, 1, dp, dp);
  };


  /*
   * Return a string representing the value of this Big in normal notation to dp fixed decimal
   * places and rounded using Big.RM.
   *
   * dp? {number} Integer, 0 to MAX_DP inclusive.
   *
   * (-0).toFixed(0) is '0', but (-0.1).toFixed(0) is '-0'.
   * (-0).toFixed(1) is '0.0', but (-0.01).toFixed(1) is '-0.0'.
   */
  P.toFixed = function (dp) {
    return stringify(this, 2, dp, this.e + dp);
  };


  /*
   * Return a string representing the value of this Big rounded to sd significant digits using
   * Big.RM. Use exponential notation if sd is less than the number of digits necessary to represent
   * the integer part of the value in normal notation.
   *
   * sd {number} Integer, 1 to MAX_DP inclusive.
   */
  P.toPrecision = function (sd) {
    return stringify(this, 3, sd, sd - 1);
  };


  /*
   * Return a string representing the value of this Big.
   * Return exponential notation if this Big has a positive exponent equal to or greater than
   * Big.PE, or a negative exponent equal to or less than Big.NE.
   * Omit the sign for negative zero.
   */
  P.toString = function () {
    return stringify(this);
  };


  /*
   * Return a string representing the value of this Big.
   * Return exponential notation if this Big has a positive exponent equal to or greater than
   * Big.PE, or a negative exponent equal to or less than Big.NE.
   * Include the sign for negative zero.
   */
  P.valueOf = P.toJSON = function () {
    return stringify(this, 4);
  };


  // Export


  Big = _Big_();

  Big['default'] = Big.Big = Big;

  //AMD.
  if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () { return Big; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

  // Node and other CommonJS-like environments that support module.exports.
  } else {}
})(this);


/***/ }),

/***/ "9def":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("4588");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "9e1e":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("79e5")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "aa77":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("5ca1");
var defined = __webpack_require__("be13");
var fails = __webpack_require__("79e5");
var spaces = __webpack_require__("fdef");
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),

/***/ "aae3":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__("d3f4");
var cof = __webpack_require__("2d95");
var MATCH = __webpack_require__("2b4c")('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),

/***/ "ac6a":
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__("cadf");
var getKeys = __webpack_require__("0d58");
var redefine = __webpack_require__("2aba");
var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var wks = __webpack_require__("2b4c");
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),

/***/ "b27e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debounce = exports.throttle = void 0;

/**
 * @author weilan
 * @description event事件库
 * @time 2020.04.21
 */

/**
 * @method 节流函数(500ms内只能点击一次，点击后立即触发，重复点击无效，必须等3s之后才能点击第二次)
 * @param {Function} {handler} 事件处理函数
 * @param {Number} {delay} 恢复点击的毫秒数
 */
var throttle = function throttle(handler, delay) {
  var last, deferTimer;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var that = this;
    var now = +new Date();

    if (last && now < last + delay) {
      deferTimer && clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        handler.apply(that, args);
      }, delay);
    } else {
      last = now;
      handler.apply(that, args);
    }
  };
};
/**
 * @method 防抖函数(500ms之后出结果，重复点击无效，如果重复点击了，重新计算3s时间，从点击的时刻算起，必须等待3s时间触发事件)
 * @param {Function} {handler} 事件处理函数
 * @param {Number} {delay} 恢复点击的毫秒数
 */


exports.throttle = throttle;

var debounce = function debounce(handler) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  var timeout;
  return function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    // 获取函数的作用域和变量
    var that = this; // 每次事件被触发，都会清除当前的timer，然后重写设置超时调用

    timeout && clearTimeout(timeout);
    timeout = setTimeout(function () {
      handler.apply(that, args);
    }, delay);
  };
};

exports.debounce = debounce;

/***/ }),

/***/ "b39a":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),

/***/ "b39b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.valInDeep = valInDeep;
exports.flattenDeep = flattenDeep;
exports.flattenDeepParents = flattenDeepParents;
exports.regDeepParents = regDeepParents;
exports.arrayToTree = arrayToTree;
exports.patchTreeChain = patchTreeChain;
exports.locationAfterDelete = locationAfterDelete;
exports.splicParentsUntil = splicParentsUntil;
exports.intersectionBy = intersectionBy;
exports.deepClone = deepClone;
exports.getMax = getMax;
exports.getMin = getMin;
exports.autoPositionAfterDelete = exports.depData = exports.unique = void 0;

var _time = _interopRequireDefault(__webpack_require__("93bf"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * 从树形数据中递归筛选目标值
 * arr 数据源 
 * val 目标值
 * id 需要判断相等的字段
 * childs 子集
 */
function valInDeep() {
  var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var val = arguments.length > 1 ? arguments[1] : undefined;
  var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "Id";
  var childs = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "Children";
  return arr.reduce(function (flat, item) {
    return flat.concat(item[id] == val ? item : valInDeep(item[childs] || [], val, id, childs));
  }, []);
}
/**
 * 将树形数据向下递归为一维数组
 * @param {*} arr 数据源
 * @param {*} childs  子集key
 */


function flattenDeep() {
  var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var childs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Children";
  return arr.reduce(function (flat, item) {
    return flat.concat(item, item[childs] ? flattenDeep(item[childs], childs) : []);
  }, []);
}
/**
 * 将树形数据向上将此支线递归为一维数组
 * @param {*} arr 数据源
 * @param {*} parent 父级
 */


function flattenDeepParents(arr, parent) {
  return arr.reduce(function (flat, item) {
    return flat.concat(item[parent] || [], item[parent] ? flattenDeepParents([item[parent]], parent) : []);
  }, []);
}
/**
 * 根据条件递归祖先元素
 * @param {*} row 数据源
 * @param {*} parent 父级数据
 * @param {*} reg 回调
 */


function regDeepParents(row, parent, reg) {
  if (row[parent]) {
    reg && reg(row[parent]);
    regDeepParents(row[parent], parent, reg);
  }
}
/**
 * 将数组转化成树结构 array to tree
 * @param {*} array 数据源
 * @param {*} options 字段名配置项
 */


function arrayToTree() {
  var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    id: "id",
    pid: "pid",
    children: "children"
  };
  var array_ = []; // 创建储存剔除叶子节点后的骨架节点数组

  var unique = {}; // 创建盒子辅助本轮children合并去重

  var root_pid = [0, "0", undefined, "undefined", null, "null", "00000000-0000-0000-0000-000000000000", ""]; // 可能存在的根节点pid形式

  array.forEach(function (item) {
    // 筛选可以插入当前节点的所有子节点
    var children_array = array.filter(function (it) {
      return it[options.pid] === item[options.id];
    });

    if (Array.isArray(item[options.children]) && item[options.children].length) {
      var _item$options$childre;

      // 去重合并数组
      item[options.children].map(function (i) {
        return unique[i[options.id]] = 1;
      });

      (_item$options$childre = item[options.children]).push.apply(_item$options$childre, _toConsumableArray(children_array.filter(function (i) {
        return unique[i[options.id]] !== 1;
      })));
    } else {
      item[options.children] = children_array;
    } // 当children_array有数据时插入下一轮array_，当无数据时将最后留下来的根节点树形插入数组


    var has_children = children_array.length > 0;

    if (has_children || !has_children && root_pid.includes(item[options.pid])) {
      array_.push(item);
    }
  }); // 当数组内仅有根节点时退出，否组继续处理 最终递归深度次

  if (!array_.every(function (item) {
    return root_pid.includes(item[options.pid]);
  })) {
    return arrayToTree(array_, options);
  } else {
    return array_;
  }
}
/**
 * 如果数据里缺少树枝节点，则根据parents和自增长id补全整条树链，输出数据调用上部arrToTree函数组装成完整的树
 * @param {Array} data 当前选中的某些数据 [一维数组]
 * @param {Array} sourceData 拥有完整数据的源数据 [一维数组]
 * @param {Object} options 配置参数，包括id，pid，树链parents，组成树链的自增长IdentityId, 根节点的默认pid为空的guid
 */


function patchTreeChain(data, sourceData) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    Id: "Id",
    ParentId: "ParentId",
    Parents: "Parents",
    IdentityId: "IdentityId",
    root: "00000000-0000-0000-0000-000000000000"
  };
  var _out_put_data = [],
      // 声明一个导出数据盒子
  _all_lack_data = []; // 声明一个全部需要补全的节点盒子

  data.forEach(function (i) {
    // 当一个节点在整个已选节点里找不到父节点时，并且此节点不是根节点时，从源数据中补全
    if (!data.find(function (t) {
      return t[options.Id] === i[options.ParentId];
    }) && i[options.ParentId] !== options.root) {
      // 首先将记录在节点身上的父级树链拆分
      var _parents = i[options.Parents].substring(1, i[options.Parents].length - 1).split(",").filter(function (item) {
        return !!item;
      }); // 然后查找父级树链中某一链条是否已在数据中存在，已存在的不需要补全，从树链中剔除


      var _lack_parents = _parents.filter(function (e) {
        return data.findIndex(function (m) {
          return m[options.IdentityId] == e;
        }) === -1;
      }); // 合并全部需要补全的数据


      _all_lack_data = _all_lack_data.concat(_lack_parents);
    }
  }); // 去重后根据IdentityId在源数据中找到完整的节点数据并组装

  _toConsumableArray(new Set(_all_lack_data)).forEach(function (item) {
    _out_put_data.push(sourceData.find(function (it) {
      return it[options.IdentityId] == item;
    }));
  }); // 最后返回当前数据和需要补全父级树链的数据


  return _out_put_data.concat(data);
}
/**
 * 数组删除后重新定位
 * @param {Object} data 数组数据
 * @param {String|Number} delId 要删除的数据id
 * @param {string|number} actId 当前id
 * @param {Boolean} useTree 是否使用树形算法
 */


function locationAfterDelete(data, delId, actId) {
  var useTree = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  if (data.length === 1) {
    var _item = data.Parent ? data.Parent : {
      Id: useTree ? data[0].ParentId : ''
    };

    return {
      item: _item,
      after_data: []
    };
  }

  var after_data = data.filter(function (item) {
    return item.Id !== delId;
  });

  if (actId && delId !== actId) {
    return {
      item: null,
      after_data: after_data
    };
  }

  var cur_i = data.findIndex(function (item) {
    return item.Id === delId;
  });
  var prv_item = cur_i > 0 ? data[cur_i - 1] : null;
  var next_item = cur_i !== data.length - 1 ? data[cur_i + 1] : null;
  return {
    item: next_item || prv_item,
    after_data: after_data
  };
}
/**
 * 从坐标值拼接指定字段到祖先元素
 * @param {*} data 一维数据源
 * @param {*} coordinate 坐标值数据 
 * @param {*} options 配置项
 */


function splicParentsUntil(data, coordinate) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    pathName: 'name',
    // 所要拼接字段
    pathConnector: '\\',
    // 连接符 
    pathId: "id",
    // 数据源匹配字段 
    pathParents: "parents",
    pathIdentityId: "identityId"
  };
  var coordinate_item = data.find(function (i) {
    return i[options.pathId] === coordinate[options.pathId];
  });
  if (!coordinate_item) return '';
  if (!coordinate_item[options.pathParents]) return coordinate_item[options.pathName];

  var _parents = coordinate_item[options.pathParents].substring(1, coordinate_item[options.pathParents].length - 1).split(",").filter(function (i) {
    return !!i;
  });

  var splic_parents = '';

  _parents.forEach(function (i) {
    var _parent = data.find(function (t) {
      return t[options.pathIdentityId] == i;
    });

    splic_parents += "".concat(_parent[options.pathName]).concat(options.pathConnector);
  });

  return splic_parents + coordinate_item[options.pathName];
}
/**
 * 根据数组2内的元素，通过match字段匹配数组1内的完整内容组成的数据
 * @param {*} array1 带有完整item对象的源数组列表
 * @param {*} array2 只带有match字段组成的简单数组
 * @param {*} match 用于匹配数组1和数组2的字段
 */


function intersectionBy() {
  var array1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var array2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var match = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "Id";
  if ([null, "null", undefined, "undefined"].includes(array2)) return;
  var data = [];
  array2.forEach(function (item) {
    var match_success = array1.find(function (it) {
      return it[match] === item;
    });
    match_success && data.push(match_success);
  });
  return data;
}
/**
 * 深拷贝
 * @param {*} source 要拷贝的数据
 */


function deepClone(source) {
  if (!source && _typeof(source) !== "object") {
    throw new Error("error arguments", "shallowClone");
  }

  var targetObj = source.constructor === Array ? [] : {};
  Object.keys(source).forEach(function (keys) {
    if (source[keys] && _typeof(source[keys]) === "object") {
      targetObj[keys] = source[keys].constructor === Array ? [] : {};
      targetObj[keys] = deepClone(source[keys]);
    } else {
      targetObj[keys] = source[keys];
    }
  });
  return targetObj;
}
/**
 * 筛选出数组中最大值
 * @param {*} arr 数据
 * @param {*} key 如果是复杂型数组，请指定字段key
 * @param {*} stamp 如果是时间格式，请设置以转化时间戳
 */


function getMax() {
  var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var stamp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var _o = !key ? arr : arr.map(function (i) {
    return i[key];
  });

  var _t = !stamp ? _o : _o.map(function (i) {
    return _time["default"].init(i).valueOf();
  });

  return Math.max.apply(Math, _toConsumableArray(_t));
}
/**
 * 筛选出数组中最小值
 * @param {*} arr 数据
 * @param {*} key 如果是复杂型数组，请指定字段key
 * @param {*} stamp 如果是时间格式，请设置以转化时间戳
 */


function getMin() {
  var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var stamp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var _o = !key ? arr : arr.map(function (i) {
    return i[key];
  });

  var _t = !stamp ? _o : _o.map(function (i) {
    return _time["default"].init(i).valueOf();
  });

  return Math.min.apply(Math, _toConsumableArray(_t));
}
/**
 * @name 数组去重
 * @param {Array} arr 原数组
 * @param {String} key 要比对的key，不传则认为是简单数组
 */


var unique = function unique(arr, key) {
  var hashList = [];
  key ? arr.forEach(function (i) {
    if (hashList.find(function (t) {
      return t[key] == i[key];
    })) return;
    hashList.push(i);
  }) : arr.forEach(function (i) {
    if (hashList.includes(i)) return;
    hashList.push(i);
  });
  return hashList;
};
/**
 * @name 数组查重
 * @param {Array} arr 原数组
 * @param {String} key 要比对的key，不传则认为是简单数组
 */


exports.unique = unique;

var depData = function depData(arr, key) {
  var hashList = [];
  var depData = arr.filter(function (i) {
    var _item = key ? i[key] : i;

    if (hashList.includes(_item)) return i;
    hashList.push(_item);
  });
  return depData;
};
/**
 * @name 删除数据后自动定位
 * @param {Array} data 未删除前数据
 * @param {String} key 作为判断依据的数据key
 * @param {String|Number} delId 要删除数据的id
 * @param {String|Number} actId 当前选中的数据id
 * @param {Boolean} isTree 
 * @param {String} keyParent 
 */


exports.depData = depData;

var autoPositionAfterDelete = function autoPositionAfterDelete(data, key, delId, actId, isTree, keyParent) {
  // 源数据校验
  if (!Array.isArray(data)) throw Error('data必须是一个数组'); // 找到当前选中数据索引

  var activeIndex = data.findIndex(function (i) {
    return i[key] === actId;
  }); // 删后数据

  var nextData = data.filter(function (i) {
    return i[key] !== delId;
  }); // 删除的是非当前选中数据，或删后数组为空，无需重新定位

  if (delId !== actId || !nextData.length) return {
    nextItem: null,
    nextData: nextData
  }; // 删除的是当前选中数据，自动定位前一个数据，第0时自动定位后一个数据

  var nextIndex = activeIndex !== 0 ? activeIndex - 1 : 0;
  return {
    nextItem: nextData[nextIndex],
    nextData: nextData
  };
};

exports.autoPositionAfterDelete = autoPositionAfterDelete;

/***/ }),

/***/ "b452":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Storage: true,
  DataType: true,
  Time: true,
  WlNumber: true,
  VaJwt: true
};
Object.defineProperty(exports, "Storage", {
  enumerable: true,
  get: function get() {
    return _storage["default"];
  }
});
Object.defineProperty(exports, "DataType", {
  enumerable: true,
  get: function get() {
    return _type["default"];
  }
});
Object.defineProperty(exports, "Time", {
  enumerable: true,
  get: function get() {
    return _time["default"];
  }
});
Object.defineProperty(exports, "WlNumber", {
  enumerable: true,
  get: function get() {
    return _number["default"];
  }
});
Object.defineProperty(exports, "VaJwt", {
  enumerable: true,
  get: function get() {
    return _jwt["default"];
  }
});

var _storage = _interopRequireDefault(__webpack_require__("e31b"));

var _type = _interopRequireDefault(__webpack_require__("de2d"));

var _time = _interopRequireDefault(__webpack_require__("93bf"));

var _number = _interopRequireDefault(__webpack_require__("8961"));

var _jwt = _interopRequireDefault(__webpack_require__("598d"));

var _array = __webpack_require__("b39b");

Object.keys(_array).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _array[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _array[key];
    }
  });
});

var _validate = __webpack_require__("4db4");

Object.keys(_validate).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _validate[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _validate[key];
    }
  });
});

var _event = __webpack_require__("b27e");

Object.keys(_event).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _event[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _event[key];
    }
  });
});

var _utils = __webpack_require__("c5f3");

Object.keys(_utils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _utils[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _utils[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/***/ }),

/***/ "be13":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "c26b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__("86cc").f;
var create = __webpack_require__("2aeb");
var redefineAll = __webpack_require__("dcbc");
var ctx = __webpack_require__("9b43");
var anInstance = __webpack_require__("f605");
var forOf = __webpack_require__("4a59");
var $iterDefine = __webpack_require__("01f9");
var step = __webpack_require__("d53b");
var setSpecies = __webpack_require__("7a56");
var DESCRIPTORS = __webpack_require__("9e1e");
var fastKey = __webpack_require__("67ab").fastKey;
var validate = __webpack_require__("b39a");
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),

/***/ "c366":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("6821");
var toLength = __webpack_require__("9def");
var toAbsoluteIndex = __webpack_require__("77f1");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "c5f3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.download = download;

/**
 * @author weilan
 * @time 2020.07.01
 * @description 通用工具函数
 */

/**
* @name处理下载接口返回的文件流数据
* @param {*} res http请求返回数据
*/
function download(res) {
  // 错误处理
  if (res.data.type == "application/json") {
    var reader = new FileReader();
    reader.readAsText(res.data, 'utf-8');

    reader.onload = function () {
      var json_data = JSON.parse(reader.result);
      throw Error(json_data.Message);
    };

    return;
  } // 下载处理


  var filename = "content-disposition" in res.headers ? decodeURIComponent(res.headers["content-disposition"].split(";")[1].split("=")[1].replace(/"/g, "")) : "下载文件";

  try {
    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(res.data, filename);
    } else {
      var blob = new Blob([res.data], {
        type: "application/vnd.ms-excel"
      });
      var url = URL.createObjectURL(blob);
      var link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(url); // 释放URL 对象

      document.body.removeChild(link);
    }
  } catch (err) {
    throw Error(err);
  }
}

/***/ }),

/***/ "c5f6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("7726");
var has = __webpack_require__("69a8");
var cof = __webpack_require__("2d95");
var inheritIfRequired = __webpack_require__("5dbc");
var toPrimitive = __webpack_require__("6a99");
var fails = __webpack_require__("79e5");
var gOPN = __webpack_require__("9093").f;
var gOPD = __webpack_require__("11e9").f;
var dP = __webpack_require__("86cc").f;
var $trim = __webpack_require__("aa77").trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__("2aeb")(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__("9e1e") ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__("2aba")(global, NUMBER, $Number);
}


/***/ }),

/***/ "c69a":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("9e1e") && !__webpack_require__("79e5")(function () {
  return Object.defineProperty(__webpack_require__("230e")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "ca5a":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "cadf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("9c6c");
var step = __webpack_require__("d53b");
var Iterators = __webpack_require__("84f2");
var toIObject = __webpack_require__("6821");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("01f9")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "cb7c":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "cd1c":
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__("e853");

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),

/***/ "ce10":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("69a8");
var toIObject = __webpack_require__("6821");
var arrayIndexOf = __webpack_require__("c366")(false);
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "d3f4":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "d53b":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "d8e8":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "dcbc":
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__("2aba");
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),

/***/ "de2d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @author weilan
 * @description 类型检查基础类
 * @time 2020.04.20
 */
var DataType = /*#__PURE__*/function () {
  function DataType() {
    _classCallCheck(this, DataType);
  }

  _createClass(DataType, null, [{
    key: "isObject",

    /**
     * @method 检测当前目标是否为对象
     * @param {*} item 
     */
    value: function isObject(item) {
      return Object.prototype.toString.call(item) === "[object Object]";
    }
    /**
     * @method 检测当前目标是否为空对象
     * @param {*} item 
     */

  }, {
    key: "isEmptyObject",
    value: function isEmptyObject(item) {
      return this.isObject(item) && Object.keys(item).length === 0;
    }
    /**
     * @method 检测当前目标是否为数组
     * @param {*} item 
     */

  }, {
    key: "isArray",
    value: function isArray(item) {
      return Array.isArray(item);
    }
    /**
     * @method 检测当前目标是否为空数组
     * @param {*} item 
     */

  }, {
    key: "isEmptyArray",
    value: function isEmptyArray(item) {
      return this.isArray(item) && item.length === 0;
    }
  }]);

  return DataType;
}();

exports["default"] = DataType;

/***/ }),

/***/ "deed":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("68e1");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "e0b8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("7726");
var $export = __webpack_require__("5ca1");
var redefine = __webpack_require__("2aba");
var redefineAll = __webpack_require__("dcbc");
var meta = __webpack_require__("67ab");
var forOf = __webpack_require__("4a59");
var anInstance = __webpack_require__("f605");
var isObject = __webpack_require__("d3f4");
var fails = __webpack_require__("79e5");
var $iterDetect = __webpack_require__("5cc5");
var setToStringTag = __webpack_require__("7f20");
var inheritIfRequired = __webpack_require__("5dbc");

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),

/***/ "e11e":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "e31b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _settings = __webpack_require__("fc2b");

var _type = _interopRequireDefault(__webpack_require__("de2d"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @method 基础判断
 * @param storageType 存储类型
 * @param encryptType 加密类型
 */
var _core = function _core() {
  var storageType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _settings._storageType.Local;
  var encryptType = arguments.length > 1 ? arguments[1] : undefined;

  if (!encryptType) {
    return {
      storage: storageType === _settings._storageType.Local ? localStorage : sessionStorage
    };
  }
};

var Storage = /*#__PURE__*/function () {
  function Storage() {
    _classCallCheck(this, Storage);
  }

  _createClass(Storage, null, [{
    key: "set",

    /**
     * @method 将键值存入本地存储
     * @param {*} key 键
     * @param {*} value 值
     * @param {*} type 类型 默认storageType.Local
     * @param {*} encrypt 加密配置项
     */
    value: function set(key, value, type, encrypt) {
      var _core2 = _core(type),
          storage = _core2.storage;

      var _processed_value = _type["default"].isObject(value) || _type["default"].isArray(value) ? JSON.stringify(value) : value;

      storage.setItem(key, _processed_value);
    }
    /**
     * @method 根据key取本地存储数据
     * @param {*} key 键
     * @param {*} type 类型 默认storageType.Local
     * @param {*} encrypt 加密配置项
     */

  }, {
    key: "get",
    value: function get(key, type, encrypt) {
      var _core3 = _core(type),
          storage = _core3.storage;

      var _stoarge_value = storage.getItem(key);

      try {
        return JSON.parse(_stoarge_value);
      } catch (err) {
        return _stoarge_value;
      }
    }
    /**
     * @method 根据key删除本地存储数据
     * @param {*} key 键
     * @param {*} type 类型 默认storageType.Local
     */

  }, {
    key: "remove",
    value: function remove(key, type) {
      var _core4 = _core(type),
          storage = _core4.storage;

      storage.removeItem(key);
    }
    /**
     * @method 清空本地存储
     * @param {*} type 类型 默认storageType.Local
     */

  }, {
    key: "clear",
    value: function clear(type) {
      var _core5 = _core(type),
          storage = _core5.storage;

      storage.clear();
    }
    /**
     * @method 根据key查询本地存储中是否存在key的实例
     * @param {*} key 键
     * @param {*} type 类型 默认storageType.Local
     */

  }, {
    key: "had",
    value: function had(key, type) {
      var _core6 = _core(type),
          storage = _core6.storage;

      return key in storage;
    }
    /**
     * @method 获取存储库里存储实例个数
     * @param {*} type 
     */

  }, {
    key: "count",
    value: function count(type) {
      var _core7 = _core(type),
          storage = _core7.storage;

      return storage.length;
    }
  }]);

  return Storage;
}();

exports["default"] = Storage;

/***/ }),

/***/ "e59e":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/shang.ae888606.png";

/***/ }),

/***/ "e853":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var isArray = __webpack_require__("1169");
var SPECIES = __webpack_require__("2b4c")('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),

/***/ "f605":
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),

/***/ "f6fd":
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),

/***/ "f751":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__("5ca1");

$export($export.S + $export.F, 'Object', { assign: __webpack_require__("7333") });


/***/ }),

/***/ "fa5b":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("5537")('native-function-to-string', Function.toString);


/***/ }),

/***/ "fab2":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("7726").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __webpack_require__("f6fd")
  }

  var setPublicPath_i
  if ((setPublicPath_i = window.document.currentScript) && (setPublicPath_i = setPublicPath_i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = setPublicPath_i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("7f7f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"73b5732a-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/tree-transfer/index.vue?vue&type=template&id=d07a45fa&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"wl-transfer transfer",style:({ width: _vm.width, height: _vm.height })},[(_vm.mode == 'transfer')?[_c('div',{staticClass:"transfer-left"},[_c('h3',{staticClass:"transfer-title"},[_c('el-checkbox',{attrs:{"indeterminate":_vm.from_is_indeterminate},on:{"change":_vm.fromAllBoxChange},model:{value:(_vm.from_check_all),callback:function ($$v) {_vm.from_check_all=$$v},expression:"from_check_all"}}),_c('span',[_vm._v(_vm._s(_vm.fromTitle))]),_vm._t("title-left")],2),_c('div',{staticClass:"transfer-main"},[_vm._t("from"),(_vm.filter)?_c('el-input',{staticClass:"filter-tree",attrs:{"placeholder":_vm.placeholder,"size":"small"},model:{value:(_vm.filterFrom),callback:function ($$v) {_vm.filterFrom=$$v},expression:"filterFrom"}}):_vm._e(),_c('el-tree',{ref:"from-tree",attrs:{"show-checkbox":"","lazy":_vm.lazy,"node-key":_vm.node_key,"load":_vm.leftloadNode,"props":_vm.defaultProps,"data":_vm.self_from_data,"accordion":_vm.accordion,"default-expand-all":_vm.openAll,"highlight-current":_vm.highLight,"check-strictly":_vm.checkStrictly,"render-content":_vm.renderContentLeft,"filter-node-method":_vm.filterNodeFrom,"default-checked-keys":_vm.defaultCheckedKeys,"default-expanded-keys":_vm.from_expanded_keys},on:{"check":_vm.fromTreeChecked}}),_vm._t("left-footer")],2)]),_c('div',{staticClass:"transfer-center"},[(_vm.button_text)?[_c('p',{staticClass:"transfer-center-item"},[_c('el-button',{attrs:{"type":"primary","disabled":_vm.from_disabled},on:{"click":function($event){return _vm.addToAims(true)}}},[_vm._v("\n            "+_vm._s(_vm.fromButton || "添加")+"\n            "),_c('i',{staticClass:"el-icon-arrow-right"})])],1),_c('p',{staticClass:"transfer-center-item"},[_c('el-button',{attrs:{"type":"primary","disabled":_vm.to_disabled,"icon":"el-icon-arrow-left"},on:{"click":_vm.removeToSource}},[_vm._v(_vm._s(_vm.toButton || "移除"))])],1)]:[_c('p',{staticClass:"transfer-center-item"},[_c('el-button',{attrs:{"type":"primary","icon":"el-icon-arrow-right","circle":"","disabled":_vm.from_disabled},on:{"click":function($event){return _vm.addToAims(true)}}})],1),_c('p',{staticClass:"transfer-center-item"},[_c('el-button',{attrs:{"type":"primary","disabled":_vm.to_disabled,"icon":"el-icon-arrow-left","circle":""},on:{"click":_vm.removeToSource}})],1)]],2),_c('div',{staticClass:"transfer-right"},[_c('h3',{staticClass:"transfer-title"},[_c('el-checkbox',{attrs:{"indeterminate":_vm.to_is_indeterminate},on:{"change":_vm.toAllBoxChange},model:{value:(_vm.to_check_all),callback:function ($$v) {_vm.to_check_all=$$v},expression:"to_check_all"}}),_c('span',[_vm._v(_vm._s(_vm.toTitle))]),_vm._t("title-right")],2),_c('div',{staticClass:"transfer-main"},[_vm._t("to"),(_vm.filter)?_c('el-input',{staticClass:"filter-tree",attrs:{"placeholder":_vm.placeholder,"size":"small"},model:{value:(_vm.filterTo),callback:function ($$v) {_vm.filterTo=$$v},expression:"filterTo"}}):_vm._e(),_c('el-tree',{ref:"to-tree",attrs:{"slot":"to","show-checkbox":"","lazy":_vm.lazyRight,"data":_vm.self_to_data,"node-key":_vm.node_key,"props":_vm.defaultProps,"load":_vm.rightloadNode,"default-expand-all":_vm.openAll,"highlight-current":_vm.highLight,"check-strictly":_vm.checkStrictly,"render-content":_vm.renderContentRight,"filter-node-method":_vm.filterNodeTo,"default-expanded-keys":_vm.to_expanded_keys},on:{"check":_vm.toTreeChecked},slot:"to"}),_vm._t("right-footer")],2)])]:(_vm.mode == 'addressList')?[_c('div',{staticClass:"transfer-left"},[_c('h3',{staticClass:"transfer-title"},[_c('el-checkbox',{attrs:{"indeterminate":_vm.from_is_indeterminate},on:{"change":_vm.fromAllBoxChange},model:{value:(_vm.from_check_all),callback:function ($$v) {_vm.from_check_all=$$v},expression:"from_check_all"}}),_c('span',[_vm._v(_vm._s(_vm.fromTitle))])],1),_c('div',{staticClass:"transfer-main"},[_vm._t("from"),(_vm.filter)?_c('el-input',{staticClass:"filter-tree",attrs:{"placeholder":_vm.placeholder,"size":"small"},model:{value:(_vm.filterFrom),callback:function ($$v) {_vm.filterFrom=$$v},expression:"filterFrom"}}):_vm._e(),_c('el-tree',{ref:"from-tree",attrs:{"show-checkbox":"","node-key":_vm.node_key,"props":_vm.defaultProps,"data":_vm.self_from_data,"default-expand-all":_vm.openAll,"highlight-current":_vm.highLight,"render-content":_vm.renderContentLeft,"filter-node-method":_vm.filterNodeFrom,"default-expanded-keys":_vm.from_expanded_keys},on:{"check":_vm.fromTreeChecked}})],2)]),_c('div',{staticClass:"transfer-center address-list-center"},[_c('p',{directives:[{name:"show",rawName:"v-show",value:(!_vm.move_up),expression:"!move_up"}],staticClass:"transfer-center-item",class:{ 'address-only-item': _vm.addressOptions.num === 1 }},[_c('el-button',{staticClass:"address-first-btn",attrs:{"type":"primary","icon":"el-icon-arrow-right","circle":"","disabled":_vm.from_disabled},on:{"click":function($event){return _vm.addressListTransfer(0)}}})],1),(_vm.addressOptions.num > 1)?_c('p',{staticClass:"transfer-center-item"},[_c('el-button',{attrs:{"type":"primary","disabled":_vm.from_disabled,"icon":"el-icon-arrow-right","circle":""},on:{"click":function($event){return _vm.addressListTransfer(1)}}})],1):_vm._e(),_c('p',{directives:[{name:"show",rawName:"v-show",value:(_vm.move_up),expression:"move_up"}],staticClass:"transfer-center-item"},[_c('el-button',{attrs:{"type":"primary","disabled":_vm.from_disabled,"icon":"el-icon-arrow-right","circle":""},on:{"click":function($event){return _vm.addressListTransfer(2)}}})],1)]),_c('div',{staticClass:"transfer-right"},[_c('div',{staticClass:"transfer-right-item",class:{
          'transfer-right-small': _vm.move_up,
          'transfer-right-only': _vm.addressOptions.num === 1,
        }},[_c('h3',{staticClass:"transfer-title"},[_c('span',[_vm._v(_vm._s(_vm.toTitle))]),(!_vm.move_up)?_c('span',{staticClass:"u-clear",on:{"click":function($event){return _vm.clearList(0, 'all')}}},[_vm._v("清空")]):_c('img',{staticClass:"move_up_img move_down_img",attrs:{"src":__webpack_require__("e59e"),"alt":""},on:{"click":function($event){return _vm.moveUp('down')}}})]),(!_vm.move_up)?_c('div',{staticClass:"transfer-main"},[_vm._t("to"),(_vm.filter)?_c('el-input',{staticClass:"filter-tree",attrs:{"placeholder":_vm.placeholder,"size":"small"},model:{value:(_vm.filterListFirst),callback:function ($$v) {_vm.filterListFirst=$$v},expression:"filterListFirst"}}):_vm._e(),_c('ul',{staticClass:"address-list-ul"},_vm._l((_vm.addressee),function(item){return _c('li',{key:item[_vm.node_key],staticClass:"address-list-li"},[_c('label',[_vm._v("\n                "+_vm._s(item[_vm.defaultProps.label])+"\n                "+_vm._s(_vm.addressOptions.connector)+"\n                "+_vm._s(item[_vm.addressOptions.suffix])+"\n              ")]),_c('i',{staticClass:"address-list-del el-icon-delete",on:{"click":function($event){return _vm.clearList(0, item[_vm.node_key])}}})])}),0)],2):_vm._e()]),(_vm.addressOptions.num >= 2)?_c('div',{staticClass:"transfer-right-item"},[_c('h3',{staticClass:"transfer-title"},[_c('span',[_vm._v(_vm._s(_vm.toTitleSecond || "抄送人"))]),_c('span',{staticClass:"u-clear",on:{"click":function($event){return _vm.clearList(1, 'all')}}},[_vm._v("清空")])]),_c('div',{staticClass:"transfer-main"},[_vm._t("to"),(_vm.filter)?_c('el-input',{staticClass:"filter-tree",attrs:{"placeholder":_vm.placeholder,"size":"small"},model:{value:(_vm.filterListSecond),callback:function ($$v) {_vm.filterListSecond=$$v},expression:"filterListSecond"}}):_vm._e(),_c('ul',{staticClass:"address-list-ul"},_vm._l((_vm.Cc),function(item){return _c('li',{key:item[_vm.node_key],staticClass:"address-list-li"},[_c('label',[_vm._v("\n                "+_vm._s(item[_vm.defaultProps.label])+"\n                "+_vm._s(_vm.addressOptions.connector)+"\n                "+_vm._s(item[_vm.addressOptions.suffix])+"\n              ")]),_c('i',{staticClass:"address-list-del el-icon-delete",on:{"click":function($event){return _vm.clearList(1, item[_vm.node_key])}}})])}),0)],2)]):_vm._e(),(_vm.addressOptions.num === 3)?_c('div',{staticClass:"transfer-right-item",class:{ 'transfer-right-small': !_vm.move_up }},[_c('h3',{staticClass:"transfer-title"},[_c('span',[_vm._v(_vm._s(_vm.toTitleThird || "密送人"))]),(_vm.move_up)?_c('span',{staticClass:"u-clear",on:{"click":function($event){return _vm.clearList(2, 'all')}}},[_vm._v("清空")]):_c('img',{staticClass:"move_up_img",attrs:{"src":__webpack_require__("e59e"),"alt":""},on:{"click":function($event){return _vm.moveUp('up')}}})]),(_vm.move_up)?_c('div',{staticClass:"transfer-main"},[_vm._t("to"),(_vm.filter)?_c('el-input',{staticClass:"filter-tree",attrs:{"placeholder":_vm.placeholder,"size":"small"},model:{value:(_vm.filterListThird),callback:function ($$v) {_vm.filterListThird=$$v},expression:"filterListThird"}}):_vm._e(),_c('ul',{staticClass:"address-list-ul"},_vm._l((_vm.secret_receiver),function(item){return _c('li',{key:item[_vm.node_key],staticClass:"address-list-li"},[_c('label',[_vm._v("\n                "+_vm._s(item[_vm.defaultProps.label])+"\n                "+_vm._s(_vm.addressOptions.connector)+"\n                "+_vm._s(item[_vm.addressOptions.suffix])+"\n              ")]),_c('i',{staticClass:"address-list-del el-icon-delete",on:{"click":function($event){return _vm.clearList(2, item[_vm.node_key])}}})])}),0)],2):_vm._e()]):_vm._e()])]:_vm._e()],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/tree-transfer/index.vue?vue&type=template&id=d07a45fa&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.iterator.js
var es6_array_iterator = __webpack_require__("cadf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.iterator.js
var es6_string_iterator = __webpack_require__("5df3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.set.js
var es6_set = __webpack_require__("4f7f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.constructor.js
var es6_regexp_constructor = __webpack_require__("3b2b");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArray.js
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js




function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js
function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js




function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find.js
var es6_array_find = __webpack_require__("7514");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.assign.js
var es6_object_assign = __webpack_require__("f751");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.constructor.js
var es6_number_constructor = __webpack_require__("c5f6");

// EXTERNAL MODULE: ./node_modules/wl-core/dist/index.js
var dist = __webpack_require__("b452");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/tree-transfer/index.vue?vue&type=script&lang=js&











//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var tree_transfervue_type_script_lang_js_ = ({
  name: "wl-tree-transfer",
  data: function data() {
    return {
      from_is_indeterminate: false,
      // 源数据是否半选
      from_check_all: false,
      // 源数据是否全选
      to_is_indeterminate: false,
      // 目标数据是否半选
      to_check_all: false,
      // 目标数据是否全选
      from_expanded_keys: [],
      // 源数据展开节点
      to_expanded_keys: [],
      // 目标数据展开节点
      from_disabled: true,
      // 添加按钮是否禁用
      to_disabled: true,
      // 移除按钮是否禁用
      from_check_keys: [],
      // 源数据选中key数组 以此属性关联穿梭按钮，总全选、半选状态
      to_check_keys: [],
      // 目标数据选中key数组 以此属性关联穿梭按钮，总全选、半选状态
      filterFrom: "",
      // 源数据筛选
      filterTo: "",
      // 目标数据筛选
      filterListFirst: "",
      // 通讯录模式 右1筛选
      filterListSecond: "",
      // 通讯录模式 右2筛选
      filterListThird: "",
      // 通讯录模式 右3筛选
      archiveFirst: [],
      // 存档右侧筛选前数据
      archiveSecond: [],
      // 存档右侧筛选前数据
      archiveThird: [],
      // 存档右侧筛选前数据
      addressee: [],
      // 收件人列表
      Cc: [],
      // 抄送人列表
      secret_receiver: [],
      // 密送人列表
      move_up: false // 通讯录模式 切换右侧

    };
  },
  props: {
    sjr: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    csr: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    msr: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    // 宽度
    width: {
      type: String,
      default: "100%"
    },
    // 高度
    height: {
      type: String,
      default: "320px"
    },
    // 标题
    title: {
      type: Array,
      default: function _default() {
        return ["源列表", "目标列表"];
      }
    },
    // 穿梭按钮名字
    button_text: Array,
    // 源数据
    from_data: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    // 选中数据
    to_data: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    // el-tree 配置项
    defaultProps: {
      type: Object,
      default: function _default() {
        return {
          label: "label",
          children: "children"
        };
      }
    },
    // el-tree node-key 必须唯一
    node_key: {
      type: String,
      default: "id"
    },
    // 自定义 pid参数名
    pid: {
      type: String,
      default: "pid"
    },
    // 自定义根节点pid的值，用于结束递归
    rootPidValue: {
      type: [String, Number],
      default: 0
    },
    // 是否启用筛选
    filter: {
      type: Boolean,
      default: false
    },
    // 是否展开所有节点
    openAll: {
      type: Boolean,
      default: false
    },
    // 左侧自定义树节点
    renderContentLeft: Function,
    // 右侧自定义树节点
    renderContentRight: Function,
    // 穿梭框模式
    mode: {
      type: String,
      default: "transfer"
    },
    // 通讯录模式配置项 num-> 所需右侧通讯录个数 suffix-> label后想要拼接的字段（如id，即取此条数据的id拼接在后方）connector -> 连接符（字符串）
    addressOptions: {
      type: Object,
      default: function _default() {
        return {
          num: 3,
          suffix: "suffix",
          connector: "-"
        };
      }
    },
    // 穿梭后是否展开节点
    transferOpenNode: {
      type: Boolean,
      default: true
    },
    // 源数据 默认选中节点
    defaultCheckedKeys: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    // 源数据 默认展开节点
    defaultExpandedKeys: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    // 筛选placeholder
    placeholder: {
      type: String,
      default: "输入关键字进行过滤"
    },
    // 自定义筛选函数
    filterNode: Function,
    // 默认穿梭一次默认选中数据
    defaultTransfer: {
      type: Boolean,
      default: false
    },
    // 是否开启arrayToTree
    arrayToTree: {
      type: Boolean,
      default: false
    },
    // 是否启用懒加载
    lazy: {
      type: Boolean,
      default: false
    },
    // 是否右侧树也启用懒加载
    lazyRight: {
      type: Boolean,
      default: false
    },
    // 懒加载的回调函数
    lazyFn: Function,
    // 是否高亮当前选中节点，默认值是 false。
    highLight: {
      type: Boolean,
      default: false
    },
    // 是否遵循父子不关联
    checkStrictly: {
      type: Boolean,
      default: false
    },
    // 是否每次只打开一个同级树节点
    accordion: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // -------------------------------提供输出函数---------------------
    // 添加按钮
    addToAims: function addToAims(emit) {
      var _this = this;

      // 获取选中通过穿梭框的keys - 仅用于传送纯净的id数组到父组件同后台通信
      var keys = this.$refs["from-tree"].getCheckedKeys(); // 获取半选通过穿梭框的keys - 仅用于传送纯净的id数组到父组件同后台通信

      var harfKeys = this.$refs["from-tree"].getHalfCheckedKeys(); // 选中节点数据

      var arrayCheckedNodes = this.$refs["from-tree"].getCheckedNodes(); // 获取选中通过穿梭框的nodes - 仅用于传送选中节点数组到父组件同后台通信需求

      var nodes = JSON.parse(JSON.stringify(arrayCheckedNodes)); // 半选中节点数据

      var arrayHalfCheckedNodes = this.$refs["from-tree"].getHalfCheckedNodes(); // 获取半选通过穿梭框的nodes - 仅用于传送选中节点数组到父组件同后台通信需求

      var halfNodes = JSON.parse(JSON.stringify(arrayHalfCheckedNodes)); // 自定义参数读取设置

      var children__ = this.defaultProps.children || "children";
      var pid__ = this.pid || "pid";
      var id__ = this["node_key"] || "id";
      var root__ = this.rootPidValue || 0; // let self__keys__ = []; // 当父子不关联时，收集穿梭子节点中，向上查询的到祖先节点，这些祖先节点肯定要穿梭到右侧
      // 父子不关联的写法

      if (this.checkStrictly) {
        this.checkStrictlyTransfer(arrayCheckedNodes, {
          children__: children__,
          pid__: pid__,
          id__: id__,
          root__: root__
        }, true);
      } else {
        /*
         * 父子关联的写法
         * 先整合目标树没有父节点的叶子节点选中，需要整理出来此叶子节点的父节点直到根节点路径 - 此时所有骨架节点已有
         * 再将所有末端叶子节点根据pid直接推入目标树即可
         * 声明新盒子将所有半选节点的子节点清除 - 只保留骨架 因为排序是先父后子 因此不存在子元素处理好插入时父元素还没处理的情况
         * 下面一二步是为了搭建出来目标树没有根节点躯干节点时的叶子选中，给此叶子搭建出根节点和躯干节点
         */
        // let不存在状态提升 因此在函数调用之前赋值 并递归为以为数组！
        // let self_to_data = JSON.stringify(this.self_to_data);
        // 第一步
        var skeletonHalfCheckedNodes = JSON.parse(JSON.stringify(arrayHalfCheckedNodes)); // 深拷贝数据 - 半选节点
        // 筛选目标树不存在的骨架节点 - 半选内的节点

        var newSkeletonHalfCheckedNodes = [];
        skeletonHalfCheckedNodes.forEach(function (item) {
          // 判断目标是否已在对面存在
          var inThere = Object(dist["valInDeep"])(_this.self_to_data, item[id__], id__, children__);

          if (!inThere.length) {
            newSkeletonHalfCheckedNodes.push(item);
          }
        }); // 筛选到目标树不存在的骨架后在处理每个骨架节点-非末端叶子节点 - 半选节点

        newSkeletonHalfCheckedNodes.forEach(function (item) {
          item[children__] = [];
          root__ !== item[pid__] ? _this.$refs["to-tree"].append(item, item[pid__]) : _this.$refs["to-tree"].append(item);
        }); // 第二步
        // 筛选目标树不存在的骨架节点 - 全选内的节点

        var newSkeletonCheckedNodes = [];
        nodes.forEach(function (item) {
          // 判断目标是否已在对面存在
          var inThere = Object(dist["valInDeep"])(_this.self_to_data, item[id__], id__, children__);

          if (!inThere.length) {
            newSkeletonCheckedNodes.push(item);
          }
        }); // 筛选到目标树不存在的骨架后在处理每个骨架节点-非末端叶子节点 - 全选节点

        newSkeletonCheckedNodes.forEach(function (item) {
          if (item[children__] && item[children__].length > 0) {
            item[children__] = [];
            root__ !== item[pid__] ? _this.$refs["to-tree"].append(item, item[pid__]) : _this.$refs["to-tree"].append(item);
          }
        }); // 第三步 处理末端叶子元素 - 声明新盒子筛选出所有末端叶子节点

        var leafCheckedNodes = arrayCheckedNodes.filter(function (item) {
          return !item[children__] || item[children__].length == 0;
        }); // 末端叶子插入目标树

        leafCheckedNodes.forEach(function (item) {
          // 判断目标是否已在对面存在
          var inThere = Object(dist["valInDeep"])(_this.self_to_data, item[id__], id__, children__);

          if (!inThere.length) {
            _this.$refs["to-tree"].append(item, item[pid__]);
          }
        }); // 左侧删掉选中数据

        arrayCheckedNodes.map(function (item) {
          return _this.$refs["from-tree"].remove(item);
        });
      } // 处理完毕按钮恢复禁用状态


      this.from_check_keys = []; // 目标数据节点展开

      if (this.transferOpenNode && !this.lazy) {
        this.to_expanded_keys = keys;
      } // 传递信息给父组件


      emit && this.$emit("addBtn", this.self_from_data, this.self_to_data, {
        keys: keys,
        nodes: nodes,
        harfKeys: harfKeys,
        halfNodes: halfNodes
      }); // 处理完毕取消选中

      this.$refs["from-tree"].setCheckedKeys([]);
    },
    // 移除按钮
    removeToSource: function removeToSource() {
      var _this2 = this;

      // 获取选中通过穿梭框的keys - 仅用于传送纯净的id数组到父组件同后台通信
      var keys = this.$refs["to-tree"].getCheckedKeys(); // 获取半选通过穿梭框的keys - 仅用于传送纯净的id数组到父组件同后台通信

      var harfKeys = this.$refs["to-tree"].getHalfCheckedKeys(); // 获取选中通过穿梭框的nodes 选中节点数据

      var arrayCheckedNodes = this.$refs["to-tree"].getCheckedNodes(); // 获取选中通过穿梭框的nodes - 仅用于传送选中节点数组到父组件同后台通信需求

      var nodes = JSON.parse(JSON.stringify(arrayCheckedNodes)); // 半选中节点数据

      var arrayHalfCheckedNodes = this.$refs["to-tree"].getHalfCheckedNodes(); // 获取半选通过穿梭框的nodes - 仅用于传送选中节点数组到父组件同后台通信需求

      var halfNodes = JSON.parse(JSON.stringify(arrayHalfCheckedNodes)); // 自定义参数读取设置

      var children__ = this.defaultProps.children || "children";
      var pid__ = this.pid || "pid";
      var id__ = this["node_key"] || "id";
      var root__ = this.rootPidValue || 0; // 父子不关联的写法

      if (this.checkStrictly) {
        this.checkStrictlyTransfer(arrayCheckedNodes, {
          children__: children__,
          pid__: pid__,
          id__: id__,
          root__: root__
        }, false);
      } else {
        /*
         * 先整合目标树没有父节点的叶子节点选中，需要整理出来此叶子节点的父节点直到根节点路径 - 此时所有骨架节点已有
         * 再将所有末端叶子节点根据pid直接推入目标树即可
         * 声明新盒子将所有半选节点的子节点清除 - 只保留骨架 因为排序是先父后子 因此不存在子元素处理好插入时父元素还没处理的情况
         * 下面一二步是为了搭建出来目标树没有根节点躯干节点时的叶子选中，给此叶子搭建出根节点和躯干节点
         */
        // let不存在状态提升 因此在函数调用之前赋值 并递归为以为数组！
        // let self_from_data = JSON.stringify(this.self_from_data);
        // 第一步
        var skeletonHalfCheckedNodes = JSON.parse(JSON.stringify(arrayHalfCheckedNodes)); // 深拷贝数据 - 半选节点
        // 筛选目标树不存在的骨架节点 - 半选内的节点

        var newSkeletonHalfCheckedNodes = [];
        skeletonHalfCheckedNodes.forEach(function (item) {
          // 判断目标是否已在对面存在
          var inThere = Object(dist["valInDeep"])(_this2.self_from_data, item[id__], id__, children__);

          if (!inThere.length) {
            newSkeletonHalfCheckedNodes.push(item);
          }
        }); // 筛选到目标树不存在的骨架后在处理每个骨架节点-非末端叶子节点 - 半选节点

        newSkeletonHalfCheckedNodes.forEach(function (item) {
          item[children__] = [];
          root__ !== item[pid__] ? _this2.$refs["from-tree"].append(item, item[pid__]) : _this2.$refs["from-tree"].append(item);
        }); // 第二步
        // 筛选目标树不存在的骨架节点 - 全选内的节点

        var newSkeletonCheckedNodes = [];
        nodes.forEach(function (item) {
          // 判断目标是否已在对面存在
          var inThere = Object(dist["valInDeep"])(_this2.self_from_data, item[id__], id__, children__);

          if (!inThere.length) {
            newSkeletonCheckedNodes.push(item);
          }
        }); // 筛选到目标树不存在的骨架后在处理每个骨架节点-非末端叶子节点 - 全选节点

        newSkeletonCheckedNodes.forEach(function (item) {
          if (item[children__] && item[children__].length > 0) {
            item[children__] = [];
            root__ !== item[pid__] ? _this2.$refs["from-tree"].append(item, item[pid__]) : _this2.$refs["from-tree"].append(item);
          }
        }); // 第三步 处理末端叶子元素 - 声明新盒子筛选出所有末端叶子节点

        var leafCheckedNodes = arrayCheckedNodes.filter(function (item) {
          return !item[children__] || item[children__].length == 0;
        }); // 末端叶子插入目标树

        leafCheckedNodes.forEach(function (item) {
          // 判断目标是否已在对面存在
          var inThere = Object(dist["valInDeep"])(_this2.self_from_data, item[id__], id__, children__);

          if (!inThere.length) {
            _this2.$refs["from-tree"].append(item, item[pid__]);
          }
        }); // 右侧删掉选中数据

        arrayCheckedNodes.map(function (item) {
          return _this2.$refs["to-tree"].remove(item);
        });
      } // 处理完毕按钮恢复禁用状态


      this.to_check_keys = []; // 目标数据节点展开

      if (this.transferOpenNode && !this.lazy) {
        this.from_expanded_keys = keys;
      } // 传递信息给父组件


      this.$emit("removeBtn", this.self_from_data, this.self_to_data, {
        keys: keys,
        nodes: nodes,
        harfKeys: harfKeys,
        halfNodes: halfNodes
      }); // 处理完毕取消选中

      this.$refs["to-tree"].setCheckedKeys([]);
    },

    /**
     * @name 父子不关联的穿梭
     * @param {Array} nodes 移动的节点信息
     * @param {Object} options 字段名配置项{ children__, pid__, id__, root__ }
     * @param {Boolean} isAdd 是add还是remove
     */
    checkStrictlyTransfer: function checkStrictlyTransfer(nodes, options, isAdd) {
      var _this3 = this;

      // 根据添加|移除穿梭操作来分配源数据
      var from_data = [];
      var to_data = [];
      var from_ref = "";
      var to_ref = "";

      if (isAdd) {
        from_data = this.self_from_data;
        to_data = this.self_to_data;
        from_ref = "from-tree";
        to_ref = "to-tree";
      } else {
        from_data = this.self_to_data;
        to_data = this.self_from_data;
        from_ref = "to-tree";
        to_ref = "from-tree";
      } // 将数据转为新数据处理


      var new_nodes = nodes.map(function (i) {
        var _Object$assign;

        var new_node = Object.assign({}, i, (_Object$assign = {}, _defineProperty(_Object$assign, options.children__, []), _defineProperty(_Object$assign, "__childrenLength", Array.isArray(i[options.children__]) ? i[options.children__].length : 0), _Object$assign));
        return new_node;
      }); // 先组合选中节点中能拼接起来的父子节点

      var assembly_data = new_nodes.reduce(function (pre, item, idx, arr) {
        var find_parent = arr.find(function (i) {
          return i[options.id__] == item[options.pid__];
        });
        if (!find_parent) return pre.concat(item);
        Array.isArray(find_parent[options.children__]) ? find_parent[options.children__].push(item) : find_parent[options.children__] = [item];
        return pre;
      }, []); // 准备处理数据

      assembly_data.forEach(function (i) {
        // 查找此节点在对面是否存在，存在即退出此节点的处理
        var inThere = Object(dist["valInDeep"])(to_data, i[options.id__], options.id__, options.children__);

        if (inThere.length) {
          // 当此节点是叶子节点时，删除此节点
          _this3.$refs[from_ref].remove(i);

          return;
        } // 计算此节点的子节点有没有全部参与穿梭


        var children_num = Array.isArray(i[options.children__]) ? i[options.children__].length : 0;
        var all_children_transfer = children_num === i.__childrenLength;
        delete i.__childrenLength; // 对面有此节点的父节点，直接插入到父节点;
        // 对面无此节点的父节点,从本测找父级再去查对面有没有，直到查到对面有此父级，或者找到本测根节点一起穿梭过去;

        _this3.findParentInTarget(i, options, from_data, to_data, from_ref, to_ref, isAdd); // 如果此节点所有子节点都参与本次穿梭，则此节点应从左侧移除


        if (all_children_transfer) {
          _this3.$refs[from_ref].remove(i);
        }
      });
    },

    /**
     * @name 根据节点找到对面存在的祖先节点，或者找到本测的根节点
     * @param {Object} item 当前节点
     * @param {options} options 字段名配置项{ children__, pid__, id__, root__ }
     * @param {Array} from_data 本侧数据
     * @param {Array} to_data 对侧数据
     * @param {String} from_ref 来源树dom
     * @param {String} to_ref 目标树dom
     * @param {Boolean} isAdd 是否添加
     */
    findParentInTarget: function findParentInTarget(item, options, from_data, to_data, from_ref, to_ref, isAdd) {
      var _this4 = this;

      var parentInThere = Object(dist["valInDeep"])(to_data, item[options.pid__], options.id__, options.children__); // 父节点在对面直接穿梭

      if (parentInThere.length) {
        this.$refs[to_ref].append(item, item[options.pid__]); // 当是授权时，如果父节点下子节点已经穿梭空，则把父节点移除

        if (!isAdd) return;

        var _valInDeep = Object(dist["valInDeep"])(from_data, item[options.pid__], options.id__, options.children__),
            _valInDeep2 = _slicedToArray(_valInDeep, 1),
            _parent_node2 = _valInDeep2[0];

        this.$nextTick(function () {
          if (_parent_node2[options.children__].length === 0) {
            _this4.$refs[from_ref].remove(_parent_node2);
          }
        });
        return;
      } // 父节点不在对面
      // 当此节点是根节点时，直接穿梭


      if (item[options.pid__] === options.root__) {
        this.$refs[to_ref].append(item);
        return;
      } // 当此节点也不根节点，先从本侧数据找到父节点，再看父节点的pid是否在对面，或者直到找到根祖先直接穿梭


      var _valInDeep3 = Object(dist["valInDeep"])(from_data, item[options.pid__], options.id__, options.children__),
          _valInDeep4 = _slicedToArray(_valInDeep3, 1),
          parent_node = _valInDeep4[0];

      var _parent_node = Object.assign({}, parent_node, _defineProperty({}, options.children__, [item])); // 当授权时既然要在右边出现，必然需要左侧父节点，而删除授权时，移除子权限并不代表想移除父权限


      if (isAdd) {
        this.$refs[from_ref].remove(item);
      }

      this.findParentInTarget(_parent_node, options, from_data, to_data, from_ref, to_ref, isAdd);
    },
    // 异步加载左侧
    leftloadNode: function leftloadNode(node, resolve) {
      this.lazyFn && this.lazyFn(node, resolve, "left");
    },
    // 异步加载右侧
    rightloadNode: function rightloadNode(node, resolve) {
      this.lazyFn && this.lazyFn(node, resolve, "right");
    },
    // 源树选中事件 - 是否禁用穿梭按钮
    fromTreeChecked: function fromTreeChecked(nodeObj, treeObj) {
      var _this5 = this;

      this.from_check_keys = treeObj.checkedNodes;
      this.$nextTick(function () {
        _this5.$emit("left-check-change", nodeObj, treeObj, _this5.from_check_all);
      });
    },
    // 目标树选中事件 - 是否禁用穿梭按钮
    toTreeChecked: function toTreeChecked(nodeObj, treeObj) {
      var _this6 = this;

      this.to_check_keys = treeObj.checkedNodes;
      this.$nextTick(function () {
        _this6.$emit("right-check-change", nodeObj, treeObj, _this6.to_check_all);
      });
    },
    // 源数据 总全选checkbox
    fromAllBoxChange: function fromAllBoxChange(val) {
      if (this.self_from_data.length == 0) {
        return;
      }

      if (val) {
        this.from_check_keys = this.self_from_data;
        this.$refs["from-tree"].setCheckedNodes(this.self_from_data);
      } else {
        this.$refs["from-tree"].setCheckedNodes([]);
        this.from_check_keys = [];
      }

      this.$emit("left-check-change", null, null, this.from_check_all);
    },
    // 目标数据 总全选checkbox
    toAllBoxChange: function toAllBoxChange(val) {
      if (this.self_to_data.length == 0) {
        return;
      }

      if (val) {
        this.to_check_keys = this.self_to_data;
        this.$refs["to-tree"].setCheckedNodes(this.self_to_data);
      } else {
        this.$refs["to-tree"].setCheckedNodes([]);
        this.to_check_keys = [];
      }

      this.$emit("right-check-change", null, null, this.to_check_all);
    },
    // 源数据 筛选
    filterNodeFrom: function filterNodeFrom(value, data) {
      if (this.filterNode) {
        return this.filterNode(value, data, "form");
      }

      if (!value) return true;
      return data[this.defaultProps.label].indexOf(value) !== -1;
    },
    // 目标数据筛选
    filterNodeTo: function filterNodeTo(value, data) {
      if (this.filterNode) {
        return this.filterNode(value, data, "to");
      }

      if (!value) return true;
      return data[this.defaultProps.label].indexOf(value) !== -1;
    },
    // 通讯录模式 穿梭操作
    addressListTransfer: function addressListTransfer(type) {
      var _this7 = this;

      // 选中节点数据
      var arrayCheckedNodes = this.$refs["from-tree"].getCheckedNodes(true); // 去重筛选

      var arrayDeWeighting = [];

      switch (type) {
        case 0:
          arrayDeWeighting = arrayCheckedNodes.filter(function (item) {
            if (!_this7.addressee.some(function (ite) {
              return ite[_this7.node_key] == item[_this7.node_key];
            })) {
              return item;
            }
          });
          this.addressee = [].concat(_toConsumableArray(this.addressee), _toConsumableArray(arrayDeWeighting));
          break;

        case 1:
          arrayDeWeighting = arrayCheckedNodes.filter(function (item) {
            if (!_this7.Cc.some(function (ite) {
              return ite[_this7.node_key] == item[_this7.node_key];
            })) {
              return item;
            }
          });
          this.Cc = [].concat(_toConsumableArray(this.Cc), _toConsumableArray(arrayDeWeighting));
          break;

        case 2:
          arrayDeWeighting = arrayCheckedNodes.filter(function (item) {
            if (!_this7.secret_receiver.some(function (ite) {
              return ite[_this7.node_key] == item[_this7.node_key];
            })) {
              return item;
            }
          });
          this.secret_receiver = [].concat(_toConsumableArray(this.secret_receiver), _toConsumableArray(arrayDeWeighting));
          break;
      } // 处理完毕取消选中


      this.$refs["from-tree"].setCheckedKeys([]); // 处理完毕按钮恢复禁用状态

      this.from_check_keys = []; // 传递信息给父组件

      this.$emit("addBtn", this.addressee, this.Cc, this.secret_receiver);
    },
    // 清理 通讯录选中 数据
    clearList: function clearList(type, id) {
      var _this8 = this;

      switch (type) {
        case 0:
          this.addressee = id == "all" ? [] : this.addressee.filter(function (item) {
            return item[_this8.node_key] != id;
          });
          break;

        case 1:
          this.Cc = id == "all" ? [] : this.Cc.filter(function (item) {
            return item[_this8.node_key] != id;
          });
          break;

        case 2:
          this.secret_receiver = id == "all" ? [] : this.secret_receiver.filter(function (item) {
            return item[_this8.node_key] != id;
          });
          break;
      } // 传递信息给父组件


      this.$emit("removeBtn", this.addressee, this.Cc, this.secret_receiver);
    },
    // 右侧 通讯录 上下自动
    moveUp: function moveUp(type) {
      if (type == "up") {
        this.move_up = true;
      } else {
        this.move_up = false;
      }
    },
    // 以下为提供方法 ----------------------------------------------------------------方法--------------------------------------

    /**
     * @name 清空选中节点
     * @param {String} type left左边 right右边 all全部 默认all
     */
    clearChecked: function clearChecked() {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "all";

      if (type === "left") {
        this.$refs["from-tree"].setCheckedKeys([]);
        this.from_is_indeterminate = false;
        this.from_check_all = false;
      } else if (type === "right") {
        this.$refs["to-tree"].setCheckedKeys([]);
        this.to_is_indeterminate = false;
        this.to_check_all = false;
      } else {
        this.$refs["from-tree"].setCheckedKeys([]);
        this.$refs["to-tree"].setCheckedKeys([]);
        this.from_is_indeterminate = false;
        this.from_check_all = false;
        this.to_is_indeterminate = false;
        this.to_check_all = false;
      }
    },

    /**
     * @name 获取选中数据
     */
    getChecked: function getChecked() {
      // 左侧选中信息
      var leftKeys = this.$refs["from-tree"].getCheckedKeys();
      var leftHarfKeys = this.$refs["from-tree"].getHalfCheckedKeys();
      var leftNodes = this.$refs["from-tree"].getCheckedNodes();
      var leftHalfNodes = this.$refs["from-tree"].getHalfCheckedNodes(); // 右侧选中信息

      var rightKeys = this.$refs["to-tree"].getCheckedKeys();
      var rightHarfKeys = this.$refs["to-tree"].getHalfCheckedKeys();
      var rightNodes = this.$refs["to-tree"].getCheckedNodes();
      var rightHalfNodes = this.$refs["to-tree"].getHalfCheckedNodes();
      return {
        leftKeys: leftKeys,
        leftHarfKeys: leftHarfKeys,
        leftNodes: leftNodes,
        leftHalfNodes: leftHalfNodes,
        rightKeys: rightKeys,
        rightHarfKeys: rightHarfKeys,
        rightNodes: rightNodes,
        rightHalfNodes: rightHalfNodes
      };
    },

    /**
     * @name 设置选中数据
     * @param {Array} leftKeys 左侧ids
     * @param {Array} rightKeys 右侧ids
     */
    setChecked: function setChecked() {
      var leftKeys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var rightKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      this.$refs["from-tree"].setCheckedKeys(leftKeys);
      this.$refs["to-tree"].setCheckedKeys(rightKeys);
    }
  },
  computed: {
    // 左侧数据
    self_from_data: function self_from_data() {
      var from_array = _toConsumableArray(this.from_data);

      return !this.arrayToTree ? from_array : Object(dist["arrayToTree"])(from_array, {
        id: this.node_key,
        pid: this.pid,
        children: this.defaultProps.children
      });
    },
    // 右侧数据
    self_to_data: function self_to_data() {
      var to_array = _toConsumableArray(this.to_data);

      return !this.arrayToTree ? to_array : Object(dist["arrayToTree"])(to_array, {
        id: this.node_key,
        pid: this.pid,
        children: this.defaultProps.children
      });
    },
    // 左侧菜单名
    fromTitle: function fromTitle() {
      var _this$title = _slicedToArray(this.title, 1),
          text = _this$title[0];

      return text;
    },
    // 右侧菜单名
    toTitle: function toTitle() {
      var _this$title2 = _slicedToArray(this.title, 2),
          text = _this$title2[1];

      return text;
    },
    // 右侧菜单名2
    toTitleSecond: function toTitleSecond() {
      var _this$title3 = _slicedToArray(this.title, 3),
          text = _this$title3[2];

      return text;
    },
    // 右侧菜单名3
    toTitleThird: function toTitleThird() {
      var _this$title4 = _slicedToArray(this.title, 4),
          text = _this$title4[3];

      return text;
    },
    // 上部按钮名
    fromButton: function fromButton() {
      if (this.button_text == undefined) {
        return;
      }

      var _this$button_text = _slicedToArray(this.button_text, 1),
          text = _this$button_text[0];

      return text;
    },
    // 下部按钮名
    toButton: function toButton() {
      if (this.button_text == undefined) {
        return;
      }

      var _this$button_text2 = _slicedToArray(this.button_text, 2),
          text = _this$button_text2[1];

      return text;
    }
  },
  watch: {
    // 左侧 状态监测
    from_check_keys: function from_check_keys(val) {
      var _this9 = this;

      if (val.length > 0) {
        // 穿梭按钮是否禁用
        this.from_disabled = false; // 总半选是否开启

        this.from_is_indeterminate = true; // 总全选是否开启 - 根据选中节点中为根节点的数量是否和源数据长度相等

        var allCheck = val.filter(function (item) {
          return item[_this9.pid] == 0;
        });

        if (allCheck.length == this.self_from_data.length) {
          // 关闭半选 开启全选
          this.from_is_indeterminate = false;
          this.from_check_all = true;
        } else {
          this.from_is_indeterminate = true;
          this.from_check_all = false;
        }
      } else {
        this.from_disabled = true;
        this.from_is_indeterminate = false;
        this.from_check_all = false;
      }
    },
    // 右侧 状态监测
    to_check_keys: function to_check_keys(val) {
      var _this10 = this;

      if (val.length > 0) {
        // 穿梭按钮是否禁用
        this.to_disabled = false; // 总半选是否开启

        this.to_is_indeterminate = true; // 总全选是否开启 - 根据选中节点中为根节点的数量是否和源数据长度相等

        var allCheck = val.filter(function (item) {
          return item[_this10.pid] == 0;
        });

        if (allCheck.length == this.self_to_data.length) {
          // 关闭半选 开启全选
          this.to_is_indeterminate = false;
          this.to_check_all = true;
        } else {
          this.to_is_indeterminate = true;
          this.to_check_all = false;
        }
      } else {
        this.to_disabled = true;
        this.to_is_indeterminate = false;
        this.to_check_all = false;
      }
    },
    // 左侧 数据筛选
    filterFrom: function filterFrom(val) {
      this.$refs["from-tree"].filter(val);
    },
    // 右侧 数据筛选
    filterTo: function filterTo(val) {
      this.$refs["to-tree"].filter(val);
    },
    // 通讯录模式 右1筛选
    filterListFirst: function filterListFirst(newval, oldval) {
      if (oldval == "") {
        this.archiveFirst = this.addressee;
      }

      if (newval == "") {
        this.addressee = this.archiveFirst;
      }

      var reg = RegExp(newval);
      this.addressee = this.addressee.filter(function (item) {
        return reg.test(item.label);
      });
    },
    // 通讯录模式 右2筛选
    filterListSecond: function filterListSecond(newval, oldval) {
      if (oldval == "") {
        this.archiveSecond = this.Cc;
      }

      if (newval == "") {
        this.Cc = this.archiveSecond;
      }

      var reg = RegExp(newval);
      this.Cc = this.Cc.filter(function (item) {
        return reg.test(item.label);
      });
    },
    // 通讯录模式 右3筛选
    filterListThird: function filterListThird(newval, oldval) {
      if (oldval == "") {
        this.archiveThird = this.secret_receiver;
      }

      if (newval == "") {
        this.secret_receiver = this.archiveThird;
      }

      var reg = RegExp(newval);
      this.secret_receiver = this.secret_receiver.filter(function (item) {
        return reg.test(item.label);
      });
    },
    // 监视默认选中
    defaultCheckedKeys: {
      handler: function handler(val) {
        var _this11 = this;

        this.from_check_keys = val || [];

        if (this.defaultTransfer && this.from_check_keys.length) {
          this.$nextTick(function () {
            _this11.addToAims(false);
          });
        }
      },
      immediate: true
    },
    // 监视默认展开
    defaultExpandedKeys: {
      handler: function handler(val) {
        var _form = new Set(this.from_expanded_keys.concat(val));

        this.from_expanded_keys = _toConsumableArray(_form);

        var _to = new Set(this.to_expanded_keys.concat(val));

        this.to_expanded_keys = _toConsumableArray(_to);
      },
      immediate: true
    },
    // 收件人默认值监测
    sjr: {
      handler: function handler(val) {
        var _this$addressee;

        (_this$addressee = this.addressee).push.apply(_this$addressee, _toConsumableArray(val));
      },
      immediate: true
    },
    // 抄送人默认值监测
    csr: {
      handler: function handler(val) {
        var _this$Cc;

        (_this$Cc = this.Cc).push.apply(_this$Cc, _toConsumableArray(val));
      },
      immediate: true
    },
    // 密送人默认值监测
    msr: {
      handler: function handler(val) {
        var _this$secret_receiver;

        (_this$secret_receiver = this.secret_receiver).push.apply(_this$secret_receiver, _toConsumableArray(val));
      },
      immediate: true
    }
  }
});
// CONCATENATED MODULE: ./src/components/tree-transfer/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_tree_transfervue_type_script_lang_js_ = (tree_transfervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/tree-transfer/index.vue?vue&type=style&index=0&lang=scss&
var tree_transfervue_type_style_index_0_lang_scss_ = __webpack_require__("deed");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/components/tree-transfer/index.vue






/* normalize component */

var component = normalizeComponent(
  components_tree_transfervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var tree_transfer = (component.exports);
// CONCATENATED MODULE: ./src/components/tree-transfer/index.js



tree_transfer.install = function (Vue) {
  Vue.component(tree_transfer.name, tree_transfer);
};

/* harmony default export */ var components_tree_transfer = (tree_transfer);
// CONCATENATED MODULE: ./src/components/index.js



var components = [components_tree_transfer];

var install = function install(Vue) {
  components.forEach(function (component) {
    Vue.component(component.name, component);
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

/* harmony default export */ var src_components = ({
  install: install,
  wlTreeTransfer: components_tree_transfer
});
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (src_components);



/***/ }),

/***/ "fc2b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._timeUnit = exports._storageType = void 0;
// 基础配置项
// 存储类型
var _storageType = {
  Local: 'local',
  Session: 'session'
}; // 时间单位 大小写不敏感 支持负数和缩写

exports._storageType = _storageType;
var _timeUnit = {
  Year: 'year',
  // Y 年
  Quarter: 'quarter',
  // Q 季度
  Month: 'month',
  // M 月
  Week: 'week',
  // W 周
  Day: 'day',
  // d 天
  Hour: 'hour',
  // h 时
  Minute: 'minute',
  // m 分
  Second: 'second' // s 秒

};
exports._timeUnit = _timeUnit;

/***/ }),

/***/ "fdef":
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ })

/******/ });
});
//# sourceMappingURL=wl-tree-transfer.umd.js.map