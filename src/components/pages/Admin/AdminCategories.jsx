import {Link} from 'react-router-dom'
import Button from '../../../utilities/Button'

const AdminCategories = () => {
  return (
    <>
    <div>AdminCategories</div>
    <Button> 
      <Link to="/admin/add_category">
       Add Category
      </Link> 
    </Button>
    </>

  )
}

export default AdminCategories