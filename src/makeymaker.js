var makeymaker = (function() {
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
    callback.call(this, event);
  };

  function registerEventType(name, mmgEventType) {
    mmgEventTypes[name] = mmgEventType;
  }

  var currentEventType = mmgEventTypes.LEFT_CLICK;

  function registerEvent(mmgEvent) {
    document.addEventListener(mmgEvent.type, handler, false);
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
})(window.makeymaker);
