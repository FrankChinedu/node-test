import { Optional, Model, DataTypes, Sequelize } from 'sequelize';

export interface PostAttributes {
  id: number;
  userId: number;
  name: string;
  body: string;
  createdAt?: Date;
  updatedAt?: Date;
  deleted_at?: Date | null;
}

export type PostCreationAttributes = Optional<
  PostAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deleted_at'
>;

class Post extends Model<PostAttributes, PostCreationAttributes> {
  public id!: number;
  public userId!: number;
  public name!: string;
  public body!: string;
  public deleted_at!: Date | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static modelAttributes = {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      validate: {
        notNull: {
          msg: 'post ID is required',
        },
      },
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'name cannot be null',
        },
      },
    },

    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'body cannot be null',
        },
      },
    },

    userId: {
      type: DataTypes.NUMBER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'user id cannot be null',
        },
      },
    },

  };

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static defineModelAttrs(sequelize: Sequelize) {
    return Post.init(this.modelAttributes, {
      sequelize,
      tableName: 'posts',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      underscored: true,
      timestamps: true,
      paranoid: true,
    });
  }
}

export default Post;
