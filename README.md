# Makey Maker

A tiny JavaScript library for making stuff with the [Makey Makey Go](http://http://shop.makeymakey.com/products/makey-makey-go) in your Web browser.

## About

The Makey Makey Go is a simple device for connecting real-world stuff to computers. It turns more-or-less conductive things into touch interfaces. This means you can make almost anything into a touchable button. Want a banana button? Makey Makey Go can help!

Need a doughnut control? Again, Makey Makey Go is the answer!

Makey Maker is a tiny, easy-to-use JavaScript library for working with the Makey Makey Go in your browser.

## Usage

### Browser installation

You can include Makey Maker in your browser based project by grabbing the file `makeymaker.js` from this repo and adding it to a web page:

```
<script src="makeymaker.js"></script>
```

Makey Maker attaches itself to the `window` object, so all of it's methods can be called from there, like this:

```
window.makeymaker.listenFor("SPACE");
```

### API

Makey Maker has a very small API.

#### listenFor

Register the event type to listen for from the Makey Makey Go. The MMG sends a single event type from the connected physical thing. This event type can be almost any keyboard or mouse event. By default, the MMG can send either a left click or a space bar key press; this can be changed (see `registerEventType` for more info).

To set the event type, do something like:

```
window.makeymaker.listenFor("SPACE");
```

See `registerEventType` for more info.

Also, note that Makey Maker makes use of JavaScript event capturing. Since Makey Maker attaches its event listener to the window, it makes sense to use capturing rather than bubbling. Since the event handler will prevent the default action and the propagation of any events, capturing will lead to no side effects beyond the processing of the explicit handler method. If the event needs to propagate beyond the handler, developers have to explicitly create a new event to handle additional behaviors.

#### listenWith

Register a callback method to handle the Makey Makey Go event. Any previous callback method is replaced.

To set the callback, do something like:

```
function handleMMGEvent(event) {
  console.log("The Makey Makey Go sent an event!");
}
window.makeymaker.listenWith(handleMMGEvent);
```

#### registerEventType

Out of the box, Makey Maker knows about two types of events: a space bar keypress and a left mouse key. This maps to the two default events available on the Makey Makey Go. You can select either of these events to listen for via the `listenFor` method:

```
window.makeymaker.listenFor("SPACE");
```

or

```
window.makeymaker.listenFor("LEFT_CLICK");
```

The left click is the preset event when the library loads.

It's possible to change the event type sent from the Makey Makey Go via the [remap page](). If you do change the event, you'll want to enable Makey Maker support in this library as well. To do this, you need to register a new event type. For, example, to tell the library to listen for key presses on "m":

```
window.makeymaker.registerEventType("LOWER_M_PRESS", {
  type: "keypress",
  character: "m"
});
window.makeymaker.listenFor("LOWER_M_PRESS");
```

Don't forget that you have to remap the Makey Makey Go event before this will work!

## Development

Makey Maker is a pretty small library. There's not a lot to hack on. I originally had a tape test for the lib, but it's really only a few lines of code, so I've pulled that out.
