import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/layout";
import Products, { action as ActionPatch} from "./views/Products";
import NewProduct,{action as newProductAction}from "./views/NewProduct";
import { loader as productsLoader } from "./views/Products";
import EditProduct,{loader as EditProductLoader,action as editProductAction} from "./views/EditProduct";
import { action as DeleteProductAction } from "./components/ProductsDetails";
export const router = createBrowserRouter([
    {
        path:'/',
        element: <Layout />,
        children:[
            {
                index:true,
                element:<Products />,
                loader: productsLoader,
                action: ActionPatch
        },
        {
            path:'productos/nuevo',
            element:<NewProduct />,
            action:newProductAction
        },{
            path:'productos/:id/editar',
            element:<EditProduct />,
            loader:EditProductLoader,
            action:editProductAction
        },{
             path:'productos/:id/eliminar',
             action:DeleteProductAction
        }
    ]
    }
])