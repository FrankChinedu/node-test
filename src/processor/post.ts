import { models } from '../database/model';
import { Op as op } from 'sequelize';
import { IResponse, PostDataType, } from "../Interfaces";
const PostModel = models.Post;

export const Post = {
  create:  async (body: PostDataType, userId: number):Promise<IResponse| void> => {
    try {
      const post =  await PostModel.create({ userId, ...body});
      return {
        status: 201,
        success: true,
        data: post
      }
    } catch (error) {
      return {
        status: 500,
        success: false,
        error: error.message || 'An errror must have occured'
      }
    }
  },

  update:  async (body: PostDataType, id: number, userId: number):Promise<IResponse| void> => {
    try {
      const query = {
        where: {
          userId,
          id
        }
      }
      const post =  await PostModel.findOne(query);

      if(!post) {
        return {
          status: 404,
          success: false,
          message: 'post not found'
        }
      }

      post.name = body.name;
      post.body = body.body;
      await post.save();

      return {
        status: 201,
        success: true,
        data: post
      }
    } catch (error) {
      return {
        status: 500,
        success: false,
        error: error.message || 'An errror must have occured'
      }
    }
  },

  getAllPosts: async (id:number, limit: number, offset: number):Promise<IResponse| void> => {
    try {
      const query = {
        where: {
          userId: id,
        },
        limit,
        offset
      }
      const post = await PostModel.findAndCountAll(query);
      return {
        success: true,
        status: 200,
        data: {
          total: post.count,
          rows: post.rows,
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
  getOne: async (id:number):Promise<IResponse| void> => {
    try {
      const post = await PostModel.findByPk(id);

      if(!post) {
        return {
          success: false,
          status: 404,
          message: 'Not found'
        }
      }

      return {
        success: true,
        status: 200,
        data: post
      }
    } catch (error) {
      return {
        success:false,
        status: 500,
        error: "An Error must have Occured please try again",
      }
    }
  },

  delete: async (id:number, user_id:number):Promise<IResponse| void> => {
    try {
      const post = await PostModel.findByPk(id);
      if(!post) {
        return {
          success: false,
          status: 404,
          message: 'Not found'
        }
      }
      if(post.userId !== user_id) {
        return {
          success: false,
          status: 403,
          message: 'only post creator can delete post'
        }
      }
      post.destroy();
      return {
        success: true,
        status: 200,
        message: 'post deleted successfully'
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
