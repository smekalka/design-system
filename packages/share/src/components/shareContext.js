import { createContext, useContext } from 'react';

const ShareContext = createContext({});

export const useShareContext = () => useContext(ShareContext) || {};

export default ShareContext;
