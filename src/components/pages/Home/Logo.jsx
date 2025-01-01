import { DevicesOther as DevicesOtherIcon } from '@mui/icons-material'
import { Link } from 'react-router-dom'
export default function Logo({Color}) {
  return(
    <div className="flex items-center gap-2">
            <DevicesOtherIcon sx={{ fontSize: "30px", color: Color ? "white" : "darkblue" }} />
            <Link to="" className={`text-lg font-bold ${Color ? Color : "text-blue-900"}`}>
              Tech-Dev
            </Link>
          </div>
  )
}