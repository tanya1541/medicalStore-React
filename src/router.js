import { createBrowserRouter } from "react-router-dom";
import CreateMed from './components/medicine/CreateMed';
import ListMed from './components/medicine/ListMed';
import ViewMeds from './components/medicine/ViewMed';
import EditMed from './components/medicine/EditMed';
import Register from './components/auth/register';
import Login from './components/auth/login';
import App from "./App";

const router = createBrowserRouter([
    {path: '', element: <App/>},
    {path: 'medicine', element: <ListMed/>},
    { path: 'medicine/create' , element: <CreateMed/> },
    {path: 'medicine/:medicineId', element: <ViewMeds/>},
    { path : 'medicine/:medicineId/edit', element: <EditMed/>},
    {path: 'register', element:<Register/>},
    {path : 'login', element: <Login/>}
]);

export default router;