(function(){
    
    window.lib = {}
    lib.event = {
        Event: function Event() {
            this.name = 'UNKNOWN'
            this.target = null;
        },
        
        Mixin: {
            on: function on (eventName, eventHandler) {
                if (!this.eventMap) {
                    this.eventMap = {}
                }
                if (!this.eventMap[eventName]) {
                    this.eventMap[eventName] = []
                }
                this.eventMap[eventName].push(eventHandler)
            },
            off: function off (eventName, eventHandler) {
                if (eventHandler)
                    throw new Error('Removing specific eventhandler is not implremted, yet')

                if (!this.eventMap || !this.eventMap[eventName])
                    return;

                this.eventMap[eventName] = [];
            },
            dispatchEvent: function dispatchEvent (eventName, eventData) {
                if (!this.eventMap) {
                    this.eventMap = {}
                }
                var handlers = this.eventMap[eventName]
                if (handlers) {
                    var event = new lib.event.Event();
                    event.name = eventName
                    event.target = this
                    if (typeof eventData != 'undefined' && eventData !== null) {
                        event.data = eventData;
                    }

                    for (var h=0; h<handlers.length; ++h) {
                        handlers[h](event)
                    }
                }
            }
        }
    }
    
    lib.mixin = function mixin (C, functions) {
        for (var f in functions) {
            if (functions.hasOwnProperty(f)) {
                C.prototype[f] = functions[f];
            }
        }
    }
    
    lib.Class1 = function Class1() {}
    
    lib.mixin (lib.Class1, lib.event.Mixin);
    
    lib.Class1.prototype.emmitEvent = function emmitEvent(data) {
        this.eventFired = true;
        this.dispatchEvent('opa-cupa', data);
    }
    
    
    
    
    lib.Class2 = function Class2(c2) {
        this.c2 = c2
        
        c2.on('opa-cupa', function class2Callback(event){
            console.log(event);
        })
    }
    
    
})()