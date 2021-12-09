import {name, sampleFun} from "./modules/sample.mjs";
import {parse} from "./csvparser.mjs";

console.log(name)
console.log(sampleFun())
let r = await parse()
console.log(r)
