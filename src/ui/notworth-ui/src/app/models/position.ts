import { Value } from './value';

export interface Position {
  id: string;
  name: string;
  description: string;
  category: string;
  values: Array<Value>;
}

export const DefaultPosition = {
  id: '-1',
  name: '',
  description: '',
  category: '',
  values: [],
};
