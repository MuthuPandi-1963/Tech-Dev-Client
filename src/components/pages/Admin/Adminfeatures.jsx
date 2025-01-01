import React from 'react'
import Button from '../../../utilities/Button';
import { Link, Outlet } from 'react-router-dom';

const Adminfeatures = () => {
  return (
    <>
    <div>Adminfeatures</div>
    <Button>
      <Link to="/admin/add_feature">
      Add Features
      </Link>
      </Button>
    <Outlet/>
    </>
  )
}

export default Adminfeatures;