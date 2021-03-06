/*
 * Makey Maker - A tiny JavaScript library for making stuff with the Makey Makey Go
 *
 * Copyright (c) 2015 George White <stonehippo@gmail.com>
 *
 * This file is covered by the MIT License. See LICENSE for details.
 */
window.makeymaker = (function() {
  var mmgEventTypes = {
    SPACE: {
      type: "keypress",
      character: "\u0020" // Unicde for a space character
    },
    LEFT_CLICK: {
      type: "click"
    }
  };

  // The default is to take no action when catching the MMG input
  var callback = function() {};
  var handler = function(event) {
    if (event.type === "keypress" && event.charCode !== currentEventType.character.charCodeAt(0)) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    callback.call(this, event);
  };

  function registerEventType(name, mmgEventType) {
    mmgEventTypes[name] = mmgEventType;
  }

  var currentEventType = mmgEventTypes.LEFT_CLICK;

  function registerEvent(mmgEvent) {
    document.addEventListener(mmgEvent.type, handler, true);
  }

  function unregisterEvent(mmgEvent) {
    document.removeEventListener(mmgEvent.type, handler);
  }

  // Set the callback function on the fly
  function listenWith(f) {
    callback = f;
    unregisterEvent(currentEventType);
    registerEvent(currentEventType);
  }

  function listenFor(mmgEvent) {
    if (mmgEvent && mmgEventTypes.hasOwnProperty(mmgEvent)) {
      unregisterEvent(currentEventType);
      currentEventType = mmgEventTypes[mmgEvent];
      registerEvent(currentEventType);
    }
  }

  // Set up the default listener
  registerEvent(currentEventType);

  return {
    listenFor: listenFor,
    listenWith: listenWith,
    registerEventType: registerEventType
  };
})();
