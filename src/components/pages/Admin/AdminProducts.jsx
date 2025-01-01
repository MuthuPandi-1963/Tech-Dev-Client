import Button from "../../../utilities/Button"
import {Link} from 'react-router-dom'
export default function AdminProducts() {
  return (
    <div className="bg-white">
      <Button>
        <Link to="/admin/add_product">
        + Add Products 
        </Link>
        </Button>
    </div>
  )
}
