(function(window, undefined) {
  var dictionary = {
    "949682a1-3da4-4f6a-9d4e-9c0195f6a280": "snsTemperatura",
    "911d7e98-b6de-4ad3-95c3-f65871d2daf3": "menu",
    "8ebc7013-d216-4deb-ad5e-6b9eb51fdabd": "snsHumedad",
    "2524f5df-10f9-4f34-808e-bb974b51fd91": "apagar",
    "d12245cc-1680-458d-89dd-4f0d7fb22724": "Screen 1",
    "e41a9363-7639-4eea-8763-ac0e05b95690": "snsPresencia",
    "d8b03e52-63da-4639-a80d-39653997eea3": "sensores",
    "549261fe-0e11-427c-b286-9a6a8b5cbc46": "acercaDe",
    "6194b9a4-45c0-48ad-b772-9d82a46bde51": "graficas",
    "729c6756-9b25-458f-bb81-1e64474988c0": "temporizador",
    "f39803f7-df02-4169-93eb-7547fb8c961a": "Template 1",
    "bb8abf58-f55e-472d-af05-a7d1bb0cc014": "default"
  };

  var uriRE = /^(\/#)?(screens|templates|masters|scenarios)\/(.*)(\.html)?/;
  window.lookUpURL = function(fragment) {
    var matches = uriRE.exec(fragment || "") || [],
        folder = matches[2] || "",
        canvas = matches[3] || "",
        name, url;
    if(dictionary.hasOwnProperty(canvas)) { /* search by name */
      url = folder + "/" + canvas;
    }
    return url;
  };

  window.lookUpName = function(fragment) {
    var matches = uriRE.exec(fragment || "") || [],
        folder = matches[2] || "",
        canvas = matches[3] || "",
        name, canvasName;
    if(dictionary.hasOwnProperty(canvas)) { /* search by name */
      canvasName = dictionary[canvas];
    }
    return canvasName;
  };
})(window);