var eventproxy = require('eventproxy');

function instance() {
  let ep = new eventproxy();
  setTimeout(() => {
    ep.emit('create', 'done');
  }, 1000);
  let res;
  ep.on('create', (text) => {
    res = text + ' instance';
  });
  return res;
}

console.log(instance());