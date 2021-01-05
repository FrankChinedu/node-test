import { models } from '../database/model';
import { Op as op } from 'sequelize';
import bcrypt from 'bcrypt';
import { IResponse, UserDataType, UserType } from "../Interfaces";
const UserModel = models.User;

export const User = {
  register: async (body: UserDataType): Promise<IResponse| void> => {

    try {
      const user = await UserModel.create(body);
      return {
        success: true,
        status: 200,
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      }
    } catch (error) {
      return {
        success:false,
        status: 500,
        error: error.message || "An Error must have Occured please try again",
      }
    }
  },

  login: async (body: UserDataType): Promise<IResponse| void> => {
    
    try {
      const query = {
        where :{ 
          email: body.email
        }
      }
      const user = await UserModel.findOne(query);
      if(!user) {
        return {
          success: false,
          status: 401,
          error: 'Invalid credentials'
        }
      }
    
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
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      }
    } catch (error) {
      return {
        success:false,
        status: 500,
        error: "An Error must have Occured please try again",
      }
    }
  },

  update: async (body: UserDataType, user: any): Promise<IResponse| void> => {
    let thisUser = user as UserType;
    let name = body.name;

    try {
      const query = {
        where :{
          email: thisUser.email
        }
      }
      const user = await UserModel.findOne(query);

      user.name = name;
      await user.save();

      return {
        success: true,
        status: 200,
        message: 'updated successfully'
      }
    } catch (error) {
      return {
        success:false,
        status: 500,
        error: "An Error must have Occured please try again",
      }
    }
  },

  getById: async (id:number):Promise<IResponse| void> => {
    try {
      const user = await UserModel.findByPk(id);
      return {
        success: true,
        status: 200,
        data: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      }
    } catch (error) {
      return {
        success:false,
        status: 500,
        error: "An Error must have Occured please try again",
      }
    }
  },

  delete: async (id:number):Promise<IResponse| void> => {
    try {
      const user = await UserModel.findByPk(id);
      user.destroy();
      return {
        success: true,
        status: 200,
        message: 'user account deleted successfully'
      }
    } catch (error) {
      return {
        success:false,
        status: 500,
        error: "An Error must have Occured please try again",
      }
    }
  }
};
