import { authHandlers } from './auth';
import { orderHandlers } from './orders';
import { productHandlers } from './products';

export const handlers = [
  ...authHandlers,
  ...productHandlers,
  ...orderHandlers,
];
