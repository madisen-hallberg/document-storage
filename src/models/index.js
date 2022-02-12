// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { School, User, Document } = initSchema(schema);

export {
  School,
  User,
  Document
};