import { 
  Optional, Model, DataTypes, Sequelize,
  HasManyGetAssociationsMixin,
 } from 'sequelize';
import Post from './posts';
import Like from './likes';
import bcrypt from 'bcrypt';
const salt = 10;


export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  deleted_at?: Date | null;
}

export type UserCreationAttributes = Optional<
  UserAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deleted_at'
>;

class User extends Model<UserAttributes, UserCreationAttributes> {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
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
          msg: 'user ID is required',
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

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'email cannot be null',
        },
        isEmail: true,
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'password cannot be null',
        },
      },
    }
  };
  public getPosts!: HasManyGetAssociationsMixin<Post>
  public getLikes!: HasManyGetAssociationsMixin<Like>

  static defineAssociation(model: { [key: string]: any }) {
    User.hasMany(model.Post, {
      as: 'posts',
      foreignKey: 'id',
      onDelete: 'CASCADE',
      hooks: true,
    });
    User.hasMany(model.Like, {
      as: 'likes',
      foreignKey: 'id',
      onDelete: 'CASCADE',
      hooks: true,
    });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static defineModelAttrs(sequelize: Sequelize) {

    return User.init(this.modelAttributes, {
      sequelize,
      tableName: 'users',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      underscored: true,
      timestamps: true,
      paranoid: true,
      hooks: {
        beforeCreate: async (user, options) => {
          if(user) {
            const hashPassword = await bcrypt.hash(user.password, salt);
            user.password = hashPassword;
          }
        },
      }
    });
  }
}

export default User;
