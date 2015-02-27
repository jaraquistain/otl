'use strict';
var foo = require('./foo');
var bar = require('./bar');

module.exports = Test;

function Test(n) {
    this.number = n || 4;
}

Test.prototype.foo = function(){
    console.log(foo(this.number));
};

Test.prototype.bar = function(){
    console.log(bar(this.number));
};

var t = new Test(6);

t.foo();
t.bar();
