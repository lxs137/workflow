var Enum = function() {
    let values = arguments;
    let self = {
        all: [],
        keys: values,
        length: arguments.length,
    };
    for(let i = 0; i < values.length; i++) {
        self[values[i]] = i;
        self.all[i] = values[i];
    }
    return self;
};

module.exports = Enum;