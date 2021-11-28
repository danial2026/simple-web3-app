import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Transactions',
    path: '/transactions',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Create NFT',
    path: '/create-nft',
    icon: <IoIcons.IoIosCreate />,
    cName: 'nav-text'
  },
  {
    title: 'Market Place',
    path: '/market-place',
    icon: <FaIcons.FaCartArrowDown />,
    cName: 'nav-text'
  }
];
