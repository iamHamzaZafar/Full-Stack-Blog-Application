
function signup (req , res){
    const{username , password} = req.body;
    console.log( req.body) ;
    if(!username || !password){
        res.status(201).json({message: "All fields are required"}) ;
    }
    
    res.status(200).json({message: "Got a signup request"})
}

function login (req , res ){

}


module.exports ={signup , login}