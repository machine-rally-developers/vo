function start({question, userdata}){
	console.log(question)
	return new Promise((resolve,reject)=>{
		resolve({question, answer:"Hello World"})
	})
}
module.exports=start
