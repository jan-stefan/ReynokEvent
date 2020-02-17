const ReynokEvent = {

    /**
     * Subscribes to a event and defines a callback which will run when the event is emitted later.
     * @param eventName - Name of the event. The emit method uses this to trigger events.
     * @param callback - function that will be triggered when the event was triggered.
     * @returns string - the eventId is used to unsubscribe from the event.
     */
    subscribe: function (eventName, callback) {
        /**
         * initialize reynok event Space if not already existing.
         */
        if (this.__isNode()) {
            if (global.reynokEvent === undefined) {
                global.reynokEvent = [];
            }
        } else {
            if (window.reynokEvent === undefined) {
                window.reynokEvent = [];
            }
        }

        const eventId = this.__createEventId();

        if (this.__isNode()) {
            global.reynokEvent.push({
                event     : eventName,
                subscriber: callback,
                eventId   : eventId
            });
        } else {
            window.reynokEvent.push({
                event     : eventName,
                subscriber: callback,
                eventId   : eventId
            });
        }


        /**
         * Returns the id which can be used to remove the subscription later.
         */
        return eventId;
    },

    /**
     * If the event Exists, this triggers the event and runs all callback functions registered to it.
     * @param eventName - The name of the event you want to trigger.
     */
    emit: function (eventName) {
        if (this.__isNode()) {
            if (global.reynokEvent === undefined) {
                console.error("No events has been registered yet.");
                throw new Error("No events has been registered yet.");
            } else {
                global.reynokEvent.forEach(function (value, index) {
                    if (value.event === eventName) {
                        value.subscriber();
                    }
                });
            }
        } else {
            if (window.reynokEvent === undefined) {
                console.error("No events has been registered yet.");
                throw new Error("No events has been registered yet.");
            } else {
                window.reynokEvent.forEach(function (value, index) {
                    if (value.event === eventName) {
                        value.subscriber();
                    }
                });
            }
        }
    },

    /**
     * Unsubscribe from a event using the eventId.
     * @param eventId - EventId retrieved from the subscription process.
     */
    unsubscribe: function (eventId) {
        let store = this.__isNode() ? global : window;

        if (store.reynokEvent === undefined) {
            console.error("Failed to unsubscribe from event.");
            throw new Error("Failed to unsubscribe from event.");
        } else {
            let found = false;
            store.reynokEvent.forEach(function (value, index) {
                if (eventId === value.eventId) {
                    found = true;
                    store.reynokEvent.splice(index, 1);
                }
            });

            if (!found) throw new Error("No event with event id " + eventId + " found");
        }
    },

    clear: function () {
        let store = this.__isNode() ? global : window;

        store.reynokEvent = [];
    },

    /**
     * Creates a new Event ID to be used by subscribe.
     * @returns {string} the event id generated
     * @private
     */
    __createEventId: function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },

    /**
     * Checks for the environment. If it's running under node js it returns true. If not it returns false.
     * @returns {boolean} True if under node, false in other environments
     * @private
     */
    __isNode: function () {
        if (typeof window === 'undefined' && typeof process === 'object') {
            return true;
        } else {
            return false;
        }
    }
};

module.exports = ReynokEvent;