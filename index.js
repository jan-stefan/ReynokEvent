require("src/main/ReynokEvent");

//docs:
//use subscribe call to subscribe to a event.
// import {ReynokEvent} from "./src/main/ReynokEvent";

ReynokEvent.subscribe('mach', function () {
    console.log("luuuui");
});

// you can cahe the eventId to unsubscribe later.
const eventIdFromLui1 = ReynokEvent.subscribe('mach', function () {
    console.log("luuuui1");
});

// call emit to trigger the event and its functionality.
ReynokEvent.emit('mach');

// unsubscribe using the eventid
ReynokEvent.unsubscribe(eventIdFromLui1);