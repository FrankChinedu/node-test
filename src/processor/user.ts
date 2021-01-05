import { models } from '../database/model';
import UserM from '../database/model/users'
import { Op as op } from 'sequelize';
import bcrypt from 'bcrypt';
import { IResponse, IRegisterIn } from "../Interfaces";
const UserModel = models.User;

export const User = {
  register: async (body: IRegisterIn): Promise<IResponse| void> => {

    try {
      const user = await UserModel.create(body);
      return {
        success: true,
        status: 200,
        data: user
      }
    } catch (error) {
      return {
        success:false,
        status: 500,
        error: "An Error must have Occured please try again",
      }
    }
  },

  login: async (body: IRegisterIn): Promise<IResponse| void> => {
    
    try {
      const query = {
        where :{ 
          email: body.email
        }
      }
      const user = await UserModel.findOne(query);
    
      const isValid = await bcrypt.compare(body.password, user.password);
      
      if(!isValid) {
        return {
          success: false,
          status: 401,
          error: 'Invalid credentials'
        }
      }

      return {
        success: true,
        status: 200,
        data: user
      }
    } catch (error) {
      return {
        success:false,
        status: 500,
        error: "An Error must have Occured please try again",
      }
    }
  },
};
