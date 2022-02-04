// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Yaml from "yaml";
import * as Dict$Std from "../Dict.js";
import * as Array$Std from "../Array.js";
import * as Float$Std from "../Float.js";
import * as String$Std from "../String.js";

function classify(value) {
  var match = Object.prototype.toString.call(value);
  switch (match) {
    case "[object Array]" :
        return {
                TAG: /* Array */3,
                _0: Array$Std.map(value, classify)
              };
    case "[object Boolean]" :
        return {
                TAG: /* Bool */4,
                _0: value
              };
    case "[object Number]" :
        return {
                TAG: /* Number */1,
                _0: value
              };
    case "[object String]" :
        return {
                TAG: /* String */0,
                _0: value
              };
    case "[object Null]" :
    case "[object Undefined]" :
        return /* Null */0;
    default:
      return {
              TAG: /* Object */2,
              _0: Dict$Std.map(value, (function (param) {
                      return [
                              param[0],
                              classify(param[1])
                            ];
                    }))
            };
  }
}

function get(yaml, key) {
  if (typeof yaml === "number") {
    return /* Null */0;
  }
  if (yaml.TAG !== /* Object */2) {
    return /* Null */0;
  }
  var val = Dict$Std.get(yaml._0, key);
  if (val !== undefined) {
    return val;
  } else {
    return /* Null */0;
  }
}

function map(yml, f) {
  if (typeof yml === "number") {
    return [];
  } else if (yml.TAG === /* Array */3) {
    return Array$Std.map(yml._0, f);
  } else {
    return [];
  }
}

function parse(string) {
  return classify(Yaml.parse(string));
}

function _stringify(yml, level) {
  if (typeof yml === "number") {
    return "";
  }
  switch (yml.TAG | 0) {
    case /* String */0 :
        return "\"" + yml._0 + "\"";
    case /* Number */1 :
        return Float$Std.toString(yml._0);
    case /* Object */2 :
        var entries = Dict$Std.toArray(yml._0);
        return (
                level === 0 ? "" : "\n"
              ) + Array$Std.join(Array$Std.mapWithIndex(entries, (function (i, param) {
                          var val = param[1];
                          if (typeof val === "number") {
                            return "";
                          }
                          if (val.TAG === /* Array */3 && val._0.length === 0) {
                            return "";
                          }
                          return String$Std.repeat("  ", level) + param[0] + ": " + _stringify(val, level + 1 | 0) + (
                                  (i + 1 | 0) === Array$Std.length(entries) ? "" : "\n"
                                );
                        })), "");
    case /* Array */3 :
        var array = yml._0;
        return (
                level === 0 ? "" : "\n"
              ) + Array$Std.join(Array$Std.mapWithIndex(array, (function (i, val) {
                          if (typeof val === "number") {
                            return "";
                          } else {
                            return String$Std.repeat("  ", level) + "- " + _stringify(val, level + 1 | 0) + (
                                    (i + 1 | 0) === Array$Std.length(array) ? "" : "\n"
                                  );
                          }
                        })), "");
    case /* Bool */4 :
        if (yml._0) {
          return "true";
        } else {
          return "false";
        }
    
  }
}

function stringify(yml) {
  return _stringify(yml, 0);
}

export {
  classify ,
  get ,
  map ,
  parse ,
  _stringify ,
  stringify ,
  
}
/* yaml Not a pure module */