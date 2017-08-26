var StateMachine = require('javascript-state-machine');

module.exports.createFSM = function(options) {
  let init = options.init;
  let transitions = options.transitions;
  let data = options.data;
  let methods = options.methods;
  let new_data = (_data) => {
    let res = {}; 
    if(data)
      res= data(_data);
    res["actions"] = transitions;
    return res;
  };
  let nextStatus = function() {
    let res = [];
    transitions.forEach((item) => {
      if(item.from === this.state)
        res.push(item.to);
    });
    return res;
  };
  if(methods)
    methods["nextStatus"] = nextStatus;
  else
    methods = {
      nextStatus: nextStatus
    };
  return StateMachine.factory({
    init: init,
    transitions: transitions,
    data: new_data,
    methods:  methods
  })
}