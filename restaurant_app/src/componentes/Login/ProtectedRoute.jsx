import {Navigate, Outlet} from 'react-router-dom'

export const ProtectedRoute = ({isAllowed, children, redirectTo="/Inicio"}) => {
    if(!isAllowed){
        return <Navigate to={redirectTo} />
    }
    return children ? children : <Outlet/>
}