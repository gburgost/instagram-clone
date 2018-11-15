import bcrypt from 'bcrypt';

const formatErrors = (error, otherErrors) => {
  const errors = error.errors;
  let objErrors = [];

  console.log(otherErrors);

  if (errors) {
    Object.entries(errors).map(error => {
      const {path, message} = error[1];
      objErrors.push({path,message})
    })
    objErrors = objErrors.concat(otherErrors);
    return objErrors;
  }else if(otherErrors.length){
    return otherErrors
  }
  const uknowError = {}
  switch (error.code) {
    case 11000:
      uknowError.path = "username"
      uknowError.message = "El nombre de usuario ya existe"
    break;
    default:
      uknowError.path = "Desconocido"
      uknowError.message = error.message
    }
    return [uknowError];

}

export default {
  Query: {
    allUsers: (parent, args, {models}) => models.User.find(),
    getUser: (parent, args, {models}) => models.User.findOne(args)
  },
  Mutation: {
    createUser: async (parent, {password, ...args}, {models}) => {
      //return models.User.create(args)
      const otherErrors = []
      try {
        if (password.length < 8) {
          otherErrors.push({path: 'password', message: 'Password debe ser mayor a 8 caracteres'});
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const user = await models.User.create({...args, password: hashPassword})

        if (otherErrors.length) {
          throw otherErrors;
        }
        return {
          success: true,
          errors: []
        }
        //return user && user.id;
      }catch(error){
        return {
          success: false,
          errors: formatErrors(error, otherErrors)
        };
      }
    }
  }
}
