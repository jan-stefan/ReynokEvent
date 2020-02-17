const reynokEvent = require('../main/ReynokEvent');

const TEST_EVENT_NAME = "my-test-event";

QUnit.test('test event it not equal for 100 generations', assert => {
    let ids = [];

    for (let i = 0; i < 100; i++) {
        let id = reynokEvent.__createEventId();

        if (!ids.includes(id)) {
            ids.push(id);
        }
    }

    assert.equal(ids.length, 100, "100 unique IDS should be found");
});

QUnit.test('subscribe and emit', assert => {
    reynokEvent.clear();
    assert.expect(1);

    let done = assert.async();

    reynokEvent.subscribe(TEST_EVENT_NAME, () => {
        assert.ok(true, 'Event was called.');
        done()
    });

    reynokEvent.emit(TEST_EVENT_NAME);
});

QUnit.test('subscribe and unsubscribe', assert => {
    reynokEvent.clear();
    assert.expect(2);

    let eventId = reynokEvent.subscribe(TEST_EVENT_NAME, () => {
    });

    reynokEvent.unsubscribe(eventId);

    assert.ok(true, 'Unsubscribe worked.');

    assert.throws(() => reynokEvent.unsubscribe(eventId));
});