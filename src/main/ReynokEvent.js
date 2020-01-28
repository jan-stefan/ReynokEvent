const ReynokEvent = {

    /**
     * Subscribes to a event and defines a callback which will run when the event is emitted later.
     * @param eventName - Name of the event. The emit method uses this to trigger events.
     * @param callback - function that will be triggert when the event was triggered.
     * @returns eventId {string} - the eventId is used to unsubscriber from the event.
     */
    subscribe: function (eventName, callback) {
        /**
         * initialize reynok event Space if not already existing.
         */
        if (!this.__isNode()) {
            if (window.reynokEvent === undefined) {
                window.reynokEvent = [];
            }
        } else {
            if (global.reynokEvent === undefined) {
                global.reynokEvent = [];
            }
        }

        const eventId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });

        if (!this.__isNode()) {
            window.reynokEvent.push({
                event: eventName,
                subscriber: callback,
                eventId: eventId
            });
        } else {
            global.reynokEvent.push({
                event: eventName,
                subscriber: callback,
                eventId: eventId
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

        if (!this.__isNode()) {
            if (window.reynokEvent === undefined) {
                console.log("there are not events registered currently.");
            } else {
                window.reynokEvent.forEach(function (value, index) {
                    if (value.event === eventName) {
                        value.subscriber();
                    }
                });
            }
        } else {
            if (global.reynokEvent === undefined) {
                console.log("there are not events registered currently.");
            } else {
                global.reynokEvent.forEach(function (value, index) {
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

        if (!this.__isNode()) {
            if (window.reynokEvent === undefined) {
                console.log("you can not unsubcribe from an event that does not exist.");
            } else {
                window.reynokEvent.forEach(function (value, index) {
                    if (eventId === value.eventId) {
                        window.reynokEvent.splice(index, 1);
                    }
                });
            }
        } else {
            if (global.reynokEvent === undefined) {
                console.log("you can not unsubcribe from an event that does not exist.");
            } else {
                global.reynokEvent.forEach(function (value, index) {
                    if (eventId === value.eventId) {
                        global.reynokEvent.splice(index, 1);
                    }
                });
            }
        }
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

