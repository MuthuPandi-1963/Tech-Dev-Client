import React from 'react'
import { Outlet } from 'react-router-dom';
import Breadcrumb from '../../helpers/Breadcrumb';

const ShoppingLayout = () => {
  return (
    <>
    <Breadcrumb/>
    <Outlet/>
    </>
  )
}

export default ShoppingLayout;