const test= require("./index");
const obj ={
	question: "Show me image of cats"
}
test(obj)
.then((result)=>console.log(result))
.catch((err)=>console.log(err))