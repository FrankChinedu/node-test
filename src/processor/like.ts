import { models } from '../database/model';
import { Op as op } from 'sequelize';
import { IResponse, UserDataType, UserType } from "../Interfaces";
const LikeModel = models.Like;

export const Like = {
  like: async (userId: number, postId: number): Promise<IResponse| void> => {

    try {
      const query = {
        where: {
          userId,
          postId,
        }
      }

      const postLike = await LikeModel.findOne(query);

      if(postLike) {
        if(postLike.like) {
          return {
            success: true,
            status: 200,
            message: 'Post has already been likes by you',
          }
        }

        postLike.like = true;
        await postLike.save();

        return {
          success: true,
          status: 200,
          message: 'Post has been liked',
        }
      }

      const data = {
        userId,
        postId,
        like: true
      }

      const user = await LikeModel.create(data);
      return {
        success: true,
        status: 201,
        message: 'Post has been liked'
      }
    } catch (error) {
      return {
        success:false,
        status: 500,
        error: error.message || "An Error must have Occured please try again",
      }
    }
  },

  disLike: async (userId: number, postId: number): Promise<IResponse| void> => {
    try {
      const query = {
        where: {
          userId,
          postId,
        }
      }

      const postLike = await LikeModel.findOne(query);

      if(postLike) {
        if(!postLike.like) {
          return {
            success: true,
            status: 200,
            message: 'Post has already been disliked by you',
          }
        }

        postLike.like = false;
        await postLike.save();
        
        return {
          success: true,
          status: 200,
          message: 'Post has been disliked',
        }
      }

      const data = {
        userId,
        postId,
        like: false
      }

      const user = await LikeModel.create(data);
      return {
        success: true,
        status: 201,
        message: 'Post has been disliked'
      }
    } catch (error) {
      return {
        success:false,
        status: 500,
        error: error.message || "An Error must have Occured please try again",
      }
    }
  }
};
