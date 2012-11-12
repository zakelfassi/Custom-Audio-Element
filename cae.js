// Custom Audio Element
// Author : Zak El Fassi <z@kelfassi.com>

var cae = cae || {};

/**
  Includes all the library's static elements;
  Buttons, Components, Configuration.

  First version of CAE supports only one Audio eleemnt.
  Iterate over the other later.

  TODO [prod] : separate .configuration.theme .
*/
cae.STATIC = {
  BUTTONS: {
    PLAY: 'play',
    PAUSE: 'pause',
    MUTE: 'mute',
    STATE: {
      ON: 'true',
      OFF: 'false'
    }
  },
  COMPONENTS: {
    TIME: 'time',
    SLIDER: 'slider'
  },
  CONFIGURATION: {
    DEFAULT_THEME: 'default-template'
  }
};

/**
  Default template if none provided.
*/
cae.STATIC.TEMPLATE = '<div class="hehe">Hello Moto</div>';


/**
  Returns an element source file.

  @param {Element} el The CUSTOMAUDIO element.
  @return {String} Audio source file.
*/
cae.getSrc = function(el) {
  return el.dataset.src;
};


/**
  Returns an element Theme.

  @param {Element} el The CUSTOMAUDIO element.
  @return {String} Theme name.
*/
cae.getTheme = function(el) {
  return el.dataset.theme;
};


/**
  Mock to get Handlebars template from current HTML page.

  @param {String} theme Theme/Template name
      (also the ID of text/x-handlebars-template" element).
  @return {String} The uncompiled-template.
*/
cae.getTemplate = function(theme) {
  var source = document.getElementById(theme).innerHTML;
  return Handlebars.compile(source);
};


/**
  Renderer function.
  Builds the template attributes and renders using Handelbars.js.
  TODO : add templating engine.

  @param {Number} elid Element order in the DOM hierarchy.
*/
cae.render = function(elid) {
  var el = document.getElementsByTagName('customaudio')[elid];
  var src = cae.getSrc(el);
  var theme = cae.getTheme(el) || cae.STATIC.CONFIGURATION.DEFAULT_THEME;

  var templateAttributes = {
    src: src,
    theme: theme
  };

  var template = cae.getTemplate(theme);
  var html = template(templateAttributes);

  el.innerHTML = html;

  console.log('Shadow Not Supported.');
};


/**
  Renderer function if ShadowRoot is supported.
  TODO : add templating engine.

  @param {Number} elid Element order in the DOM hierarchy.
*/
cae.renderShadow = function(elid) {
  console.log('Shadow Supported.');
};

/**
  Renders all the CustomAudio elements.
*/
cae.renderAll = function() {
  var numberOfCustomAudioElements =
      document.getElementsByTagName('customaudio').length;

  for (var i = 0; i < numberOfCustomAudioElements; i++) {
    if (typeof WebKitShadowRoot === 'function') {
      cae.renderShadow(i);
    }
    else {
      cae.render(i);
    }
  }
};

/**
  Hides all the Audio elements in the current document.
*/
cae.hideAudioElements = function() {
  var els = document.getElementsByTagName('audio');
  var numberOfAudioElements = els.length;

  for (var i = 0; i < numberOfAudioElements; i++) {
    var el = document.getElementsByTagName('audio')[i];
    el.style.display = 'none';
  }
};


/**
  initilization method. Calls all the initialization methods.
*/
cae.init = function() {
  cae.hideAudioElements();
  cae.renderAll();
};

/**
  Initialisation
*/
document.addEventListener('DOMContentLoaded', function() {
  cae.init();
});
