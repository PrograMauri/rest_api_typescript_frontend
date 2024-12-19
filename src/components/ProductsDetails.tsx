import { deleteProduct } from "../services/Product.service";
import { Product } from "../types";
import { formatCurrency } from "../utils";
import {useNavigate,ActionFunctionArgs, redirect, useFetcher, Form} from 'react-router-dom'

type ProductsTypes ={
   product:Product
}

export async function action({ params }:ActionFunctionArgs){
  if(params.id !== undefined){
    await deleteProduct(+params.id)
  }
  return redirect('/')
}


export default function ProductsDetails({product} : ProductsTypes) {


const fetcher = useFetcher()
const navigate = useNavigate()

    const isAvaible = product.availability
  return (
          <tr className="border-b ">
        <td className="p-3 text-lg text-gray-800">
            {product.name}
        </td>

        <td className="p-3 text-lg text-gray-800">
            {formatCurrency(product.price)}
        </td>

        <td className="p-3 text-lg text-gray-800">
          <fetcher.Form method="POST">
            <button
            type="submit"
            name="id"
            value={product.id}
            className={`${isAvaible ? 'text-black' : 'text-red-600'}
            rounded-lg p-2 w-full uppercase font-bold text-xs border
             hover:cursor-pointer
            `}
            >
              {isAvaible ?<p>Disponible</p> : <p>No disponible</p>}
            </button>
          </fetcher.Form>
        
        </td>
        <td className="p-3 text-lg text-gray-800 ">
           <div className=" flex gap-2 items-center">
                <button
                className=" bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
                onClick={() => navigate(`/productos/${product.id}/editar`)}
                >Editar
                </button>
            <Form 
            className=" w-full"
            method="POST"
            action={`productos/${product.id}/eliminar`}
            onSubmit={(e) => {
              if(!confirm('¿Eliminar?')){
                e.preventDefault()
              }
            }}  
            >
              <input
              type="submit"
              value={'Eliminar'}
              className="bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center cursor-pointer"
              ></input>
            </Form>
           </div>
        </td>
    </tr> 

  )
}
