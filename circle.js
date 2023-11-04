const circle = require("./circle.js");
console.log(`This area is ${circle.area(4)}.`);

const { PI } = Math;
const area = (r) => PI * r ** 2;
const circumference = (r) => 2 * PI * r;
module.exports = { area, circumference };
