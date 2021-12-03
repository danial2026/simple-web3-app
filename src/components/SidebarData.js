import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '/simple-web3-app/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Transactions',
    path: '/simple-web3-app/transactions',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Create NFT',
    path: '/simple-web3-app/create-nft',
    icon: <IoIcons.IoIosCreate />,
    cName: 'nav-text'
  },
  {
    title: 'Market Place',
    path: '/simple-web3-app/market-place',
    icon: <FaIcons.FaCartArrowDown />,
    cName: 'nav-text'
  }
];
