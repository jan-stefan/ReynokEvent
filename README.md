# ReynokEvent

Reynok Event is a small event system which enables you to subscribe and emit events in browser or node runtime environment.

## Usage / Example

Include it in your project:
```javascript
let Event = require('reynok-event');
```

OR

```javascript
import Event from 'reynok-event';
```


After that just subscribe to a event:
```javascript
const EVENT_ID = Event.subscribe('my-event-name', function () {
           console.log('I will be executed when emitting the event');
       });
```

You can emit a event using:
```javascript
ReynokEvent.emit('my-event-name');
```

Also events can be unsubscribed:
Just use the EventID you get when subscribing to it.
```javascript
Event.unsubscribe(EVENT_ID);
```