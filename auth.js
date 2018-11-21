import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import "dotenv/config";
import models from './models';

const auth = {
  checkHeaders: async (req, res, next) => {
    const token = req.headers["x-token"];
    if (token) {
      try {
        const {user} = jwt.verify(token, process.env.SECRET)
        req.user = user
      } catch (e) {
        //invalid token
        const newToken = await auth.checkToken(token)
        console.log(newToken);
        req.user = newToken.user
        if (newToken.token) {
          res.set("Access-Control-Expose-Headers", "x-token")
          res.set("x-token", newToken.token)
        }
      }
    }
    next()
  },
  checkToken: async (token) => {
    let idUser=null;
    try {
      const {user} = await jwt.decode(token);
      idUser = user;
    } catch (e) {
      return {}
    }
    const user = await models.User.findOne({_id:idUser});
    console.log(user);
    const [newToken] = auth.getToken(user)
    return {
      user: user._id,
      token: newToken
    }
  },
  getToken: ({_id}) => {
    const newToken = jwt.sign({user: _id}, process.env.SECRET, {expiresIn: '10s'})
    //const refreshToken = jwt.sign({user: _id}, process.env.SECRET, {expiresIn: '5d'})
    return [newToken];
  },
  login: async (email, password, User) => {
    console.log('hola mundo');

    const  user = await User.findOne({email})
    if (!user) {
      return {
        success: false,
        errors: [{path:'email', message:'Email no existe'}]
      }
    }
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return {
        success: false,
        errors: [{path:'password', message:'La contraseña no es correcta'}]
      }
    }

    const [newToken] = auth.getToken(user)
    return {
      success: true,
      token: newToken,
      errors: []
    }
  }
}

export default auth;
