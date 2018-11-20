import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const auth = {
  getToken: ({_id}, SECRET ) => {
    const token = jwt.sign({user: _id}, SECRET, {expiresIn: '5d'})
    return token;
  },
  login: async (email, password, User, SECRET) => {
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

    const token = auth.getToken(user, SECRET)
    console.log(token);
    return {
      success: true,
      token,
      errors: []
    }
  }
}

export default auth;
