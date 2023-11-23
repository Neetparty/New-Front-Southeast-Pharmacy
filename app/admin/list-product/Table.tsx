"use client";

import Input from "@/app/component/Input/Input";
import { Circular } from "@/app/component/Loading/Circular";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Pagination } from "@/app/component/Pagination/Pagination";
import { ListProduct, ListProductTBState } from "./list-product";
import { DeleteProduct, GetProductData, SearchProduct } from "./list-product-api";
import { toast } from "react-toastify";


const rowsPerPage = 10;
export default function Table() {
  
  const router = useRouter()
  const [state, setState] = useState<ListProductTBState>({
        product: [],
        loading:false,
        search: "",
        select: "",
        index: -1,
        currentPage: 1,
        countProduct: 0,
    })

    useEffect(() => {
      if(!state.search){
        LoadData()
      }
    }, [state.currentPage])

    useEffect(() => {
      if(state.index !== -1 && state.select === "delete"){
        HandleDelete()
      }
      else if(state.index !== -1 && state.select === "update"){
        HandleUpdate()
      }
    }, [state.select])


    return (
    <>
    <div className="p-8 flex flex-col gap-8">
        <h6 className="text-3xl font-bold">สินค้าทั้งหมด </h6>


      <div className="my-2">
        <div className="flex flex-col gap-2">
          <h6>ค้นหาสินค้าจากชื่อหรือไอดี</h6>
          <div className="flex gap-2">

          <Input
          value={state.search}
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => setState(prev => ({...prev, search:e.target.value}))}
          placeholder="ค้นหา"
          icon="material-symbols:search"
          iconClassName="w-6 h-6"
          />
          <button
          className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg w-max"
          onClick={handleSearch}
          >
          ค้นหา
          </button>
          </div>
        </div>
      </div>
      
        <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 border rounded bg-slate-200" }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0 shadow-lg">
          <div className="flex flex-wrap items-center ">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 ">
              <h3
                className={
                  "font-semibold text-lg text-slate-700"
                }
              >
                สินค้าทั้งหมด
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse border">
            <thead>
              <tr>
                <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                  รูปภาพ
                </th>
                <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                  ไอดีสินค้า
                </th>
                <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                  ชื่อสินค้า
                </th>
                <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                  ราคา
                </th>
                <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                  ราคาโปรโมชั่น
                </th>
                <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                  สต็อก
                </th>
                <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                  แก้ไข/ลบ
                </th>
                
              </tr>
            </thead>

            <tbody className="bg-slate-50">
                 
                {state.product.length !== 0 && 
                state.search ?
                state.product.slice((state.currentPage-1) * rowsPerPage, (state.currentPage * rowsPerPage)).map((item, key) => (
                  renderTable(item, key)
                  ))
                  :
                  state.product.map((item, key) => (
                    renderTable(item, key)
                  ))
                }
             
            </tbody>
          </table>
        </div>

        <Pagination
        count={state.countProduct}
        rowsPerPage={rowsPerPage}
        currentPage={state.currentPage}
        setCurrentPage={handleChangePage}
        filteredData={state.product}
        />

        <Circular
        loading={state.loading}
        />
      </div>
      </div>
    </>
);

function renderTable(item:ListProduct, key:number) {
  return (
    <tr 
    key={key}
    className={` border-b-slate-200 odd:bg-slate-100 hover:bg-slate-200/70`} 
    >
    
   
      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap mx-auto flex justify-center ">
        <div className="w-20 h-20">
          <Image 
          width={80}
          height={80}
          alt="test" src={item.image} className="w-full h-full object-contain" />
        </div>
      </th>

    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-center ">
        <span className={"ml-3 font-medium text-slate-600  whitespace-normal line-clamp-1 md:line-clamp-2"}>
          {item.product_id}
        </span>
    </th>
   
    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-center ">
        <span className={"ml-3 font-medium text-slate-600  whitespace-normal line-clamp-1 md:line-clamp-2"}>
          {item.product_name}
          {/* Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint illum rem quod sunt! Non in fugiat rem dolorum repudiandae velit eum pariatur itaque? Est fuga, cum minima accusamus totam corrupti. */}
        </span>
    </th>

        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-center ">
          <span className={"ml-3 font-medium text-slate-600 "}>
              {item.price}
          </span>
        </th>


        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-center ">
          <span className={"ml-3 font-medium text-slate-600 "}>
              {item.promotion_price}
          </span>
        </th>

        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-center ">
          <span className={"ml-3 font-medium text-slate-600 "}>
              {item.quantity}
          </span>
        </th>

        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-center h-full ">
        {state.index === key ? 
            <select 
            className="border text-slate-700 text-sm rounded-lg block p-2 outline-none placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 mx-auto"
            value={state.select}
            onChange={(e:React.ChangeEvent<HTMLSelectElement>) => setState(prev => ({...prev, select:e.target.value, index:key}))}
            >                      
                <option value={"select"}>เลือก</option>
                <option value={"update"}>อัพเดต</option>
                <option value={"delete"}>ลบ</option>
            </select>
            :
            <select 
            className="border text-slate-700 text-sm rounded-lg block p-2 outline-none placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 mx-auto"
            value={"select"}
            onChange={(e:React.ChangeEvent<HTMLSelectElement>) => setState(prev => ({...prev, select:e.target.value, index:key}))}
            >                      
                <option value={"select"}>เลือก</option>
                <option value={"update"}>อัพเดต</option>
                <option value={"delete"}>ลบ</option>
            </select>
        }
      </td>
</tr>
  )
}

async function LoadData(){
  setState(prev => ({...prev, loading:true}));
  const {data, error} = await GetProductData(state.currentPage, rowsPerPage, state.countProduct);
  if(error || !data || !data.product){
      toast.error(error);
      setState(prev => ({...prev, loading:false}));
      return;
    }
    else {
    setState(prev => ({...prev, loading:false, product:data.product, countProduct:data.totalProduct}));
    
  }

}
async function handleSearch(e:React.MouseEvent<HTMLButtonElement>) {
  e.preventDefault();
  if(state.search){

    setState(prev => ({ ...prev, loading: true }));
    const { data, error } = await SearchProduct(state.search);
    if (error || !data) {
      toast.error(error || "error");
      setState(prev => ({ ...prev, loading: false }));
      return;
    }
    else {
      setState(prev => ({ ...prev, product: data.product, loading: false, countProduct:data.product.length, currentPage:1 }))
    }
  }

}
function handleChangePage (currentPage:number) {
  setState(prev => ({...prev, currentPage:currentPage}));
}

async function HandleDelete() {
  setState(prev => ({...prev, loading:true}));
  let tempId:string = "";
  let productName: string = "";
  const {product, index} = state;

  product.forEach((elem, i) => {
      if(index === i){
        productName = elem.product_name;
        tempId = elem.product_id;
        return;
      }
  });


  if(window.confirm(`คุณต้องการสินค้า ${productName} ใช่ไหม`)){
    const {data, error} = await DeleteProduct(tempId)
    if(error){
      toast.error(error);
      setState(prev => ({...prev, loading:false}));
      return;
    }
    
    toast.success("ลบข้อมูลสินค้าเรียบร้อยแล้ว");
    let tempProduct:ListProduct[] = [];
    for (let i = 0; i < product.length; i++) {
      if(product[i].product_id === tempId && product[i] !== undefined){
        continue;
      }          
      else {
        tempProduct.push(product[i]);
      }
    }
    setState((prev) => ({...prev, product:tempProduct, loading:false, select:"setting", index:-1}))
  }
  else {
      setState((prev) => ({...prev, loading:false, select:"setting", index:-1}))
    }
}

async function HandleUpdate() {
  let tempId:string = "";
  const {product, index} = state;

  product.forEach((elem, i) => {
      if(index === i){
        tempId = elem.product_id;
        return;
      }
    });

  router.push(`/admin/update-product/${tempId}`, { scroll: false })

}
}