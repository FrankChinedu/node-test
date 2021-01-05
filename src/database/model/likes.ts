import { Optional, Model, DataTypes, Sequelize } from 'sequelize';

export interface LikeAttributes {
  id: number;
  userId: number;
  postId: string;
  like: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deleted_at?: Date | null;
}

export type LikeCreationAttributes = Optional<
  LikeAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deleted_at'
>;

class Like extends Model<LikeAttributes, LikeCreationAttributes> {
  public id!: number;
  public userId!: number;
  public postId!: number;
  public like!: boolean;
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

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'userId cannot be null',
        },
      },
    },

    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'postId cannot be null',
        },
      },
    },

    like: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultvalue: false,
      validate: {
        notNull: {
          msg: 'body cannot be null',
        },
      },
    },

  };

  static defineAssociation(model: { [key: string]: any }) {
    Like.belongsTo(model.User, {
      as: 'user',
      foreignKey: 'userId',
      onDelete: "cascade",
    });
    Like.belongsTo(model.Post, {
      as: 'post',
      foreignKey: 'postId',
      onDelete: "cascade",
    });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static defineModelAttrs(sequelize: Sequelize) {
    return Like.init(this.modelAttributes, {
      sequelize,
      tableName: 'likes',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      timestamps: true,
      // paranoid: true,
    });
  }
}

export default Like;
