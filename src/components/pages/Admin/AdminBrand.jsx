import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const AdminBrand = () => {
  return (
    <>
    <div>AdminBrand</div>
    <Button>
        <Link to="/admin/add_brand">
        Add Brand
        </Link></Button>
    </>
  )
}

export default AdminBrand