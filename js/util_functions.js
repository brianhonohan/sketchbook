class UtilFunctions {
    // via: https://stackoverflow.com/a/901144
  static getParameterByName(name, formatter, url = null) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    let results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return null;

    let value = decodeURIComponent(results[2].replace(/\+/g, " "));
    if (formatter) return formatter(value);
    return value;
  }

  // via: https://stackoverflow.com/a/38340730
  static unsetUndefineds(obj) {
    Object.keys(obj).forEach((key) => (obj[key] == null) && delete obj[key]);
    return obj;
  }
}