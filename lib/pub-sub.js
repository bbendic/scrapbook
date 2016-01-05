(function(){
    
    window.lib = window.lib || {}
    
    lib.EventBus = (function(){
        
        var topics = {};
        
        return {
            subscribe: function subscribe (topic, listener) {
                if ( typeof listener != 'function'){
                    return false; // throw error
                }
                 
                if(!topics[topic]) 
                    topics[topic] = [];
                topics[topic].push(listener);
            },

            publish: function publish (topic, data) {
                if(!topics[topic] || topics[topic].length < 1)
                    return;

                topics[topic].forEach(function(listener) {
                    listener(data || {});
                });
            }
        }
        
    })();
    
})();