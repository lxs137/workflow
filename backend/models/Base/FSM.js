var StateMachine = require('javascript-state-machine');

module.exports.createFSM = function(options) {
  let init = options.init;
  let transitions = options.transitions;
  let data = options.data;
  let methods = options.methods;
  let new_transitions = [];
  transitions.forEach((item) => {
    new_transitions.push({
      name: item.name,
      from: item.from,
      to: item.to,
      role: item.role || 'owner'
    });
  });
  transitions.push({ 
    name: 'goto', 
    from: '*', 
    to: function(s) { return s; },
    role: [] 
  });
  let new_data = (_data) => {
    let res = {}; 
    if(data)
      res= data(_data);
    res["actions"] = new_transitions;
    return res;
  };
  let nextStatus = function() {
    let res = [];
    new_transitions.forEach((item) => {
      if(item.from === this.state)
        res.push({
          to: item.to,
          role: item.role
        });
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