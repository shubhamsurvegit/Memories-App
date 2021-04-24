const jwt = require("jsonwebtoken");

const auth=async (req,res,next)=>{
    try{
        // const token=req.headers.authorization.split(" ")[1];
        const token=req.headers["x-access-token"]
        console.log(token)
        if(token){
            const isCustomAuth=token.length<500;
            let decodeData;
            if(isCustomAuth){
                decodeData=jwt.verify(token,"test");
                req.userId=decodeData?.id;
                console.log(decodeData)
            }
            else{
                decodeData=jwt.decode(token);
                req.userId=decodeData.sub
            }
            next();
        }
    }
    catch(err){
        console.log(err)
    }
}

module.exports=auth