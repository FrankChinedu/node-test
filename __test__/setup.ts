import dotenv from 'dotenv';

import { models } from '../src/database/model';
import { Like } from '../src/processor/like';

dotenv.config();

beforeEach(async () => {
  const {
    Like,
    Post,
    User,
  } = models;
  await Like.destroy({ where: {}, force: true });
  await Post.destroy({ where: {}, force: true });
  await User.destroy({ where: {}, force: true });
});

afterAll(async () => {
  const {
    Like,
    Post,
    User,
  } = models;
  await Like.destroy({ where: {}, force: true });
  await Post.destroy({ where: {}, force: true });
  await User.destroy({ where: {}, force: true });
});
