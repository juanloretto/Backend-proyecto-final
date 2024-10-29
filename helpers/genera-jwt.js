const jwt = require('jsonwebtoken')
const generarJWT=(id)=>{
return new Promise((resolve, reject)=>{

    const payload = {id};
    jwt.sign(payload,process.env.PRIVATESECRETKEY,{expiresIn:'5h'})

})
}

module.exports = {generarJWT}