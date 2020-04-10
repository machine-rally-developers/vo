const base64Img = require("./base64-img");

//export your start function this is required
function start({question, func, userdata}){
	console.log("com.image.cat");
	console.log(question)

	//function must return a promise
	return new Promise((resolve,reject)=>{
		if(question.includes("cat")){
			func.getModuleDirectory((path)=>{
				console.log("Module directory is: "+ path)
				console.log("Cat path is: "+path+"\\cat.jpg")
				let img = base64Img.base64Sync(path+"\\cat.jpg");
				let obj ={
				question,
				answer : `<img src="${img}" />`
			}
			
			resolve(JSON.stringify(obj))
			});
				
		}
		else{
			let obj ={
				question,
				answer : "Sorry I cant process your question. Try rephrasing your word"
			}
			
			reject(JSON.stringify(obj))
		}
	})
}
module.exports=start