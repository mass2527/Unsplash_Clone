import { createContext } from 'react';

export const PhotoContext = createContext({
  accountName: '',
  bio: '',
  portfolio_url: '',
  userImageURL: '',
  userName: '',
});

export interface PhotoContextProps {
  accountName: string;
  bio: string;
  portfolio_url: string;
  userImageURL: string;
  userName: string;
}
