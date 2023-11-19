"use client";
import Product from "./product";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from 'react-i18next';
import InputRef from "@/app/component/Input/InputRef";
import { SearchProductUser } from "./search-api";
import { Circular } from "@/app/component/Loading/Circular";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { selectCategoryData, selectLangData } from "@/app/GlobalRedux/Features/selector";
import { TypeProduct } from "./searchType";
import FilterSection from "./FilterSection";


export interface StateSearch {
    search:string;
    selectCategory:string;
    product: TypeProduct[];
    loading: boolean;
    currentPage: number;
    countProduct: number;
}
const rowsPerPage = 10;
export default function SearchPage() {

    const { t } = useTranslation('translation')
    const searchParams = useSearchParams()
    let cate = searchParams.get('cate') || "";
    const lang = useSelector(selectLangData);
    const search = useRef<HTMLInputElement | null>(null)
    const category = useSelector(selectCategoryData);

    const [state, setState] = useState<StateSearch>({
        search: "",
        selectCategory: cate || "",
        product: [],
        loading: false,
        currentPage: 1,
        countProduct: 0,
    })
    
    useEffect(() => {
        if(cate !== ""){
            handleSearch()
        }
    }, [])
    
    function handleLang(thai:string, english:string, china:string){

        if(lang.lang === "th"){
          return thai;
        }
        else if(lang.lang === "en"){
          return english;
        }
        else if(lang.lang === "cn"){
          return china;
        }
        else {
          return thai;
        }
    }
    
    async function handleSearch() {
        // e.preventDefault();
        setState(prev => ({...prev, loading:true}));
        const {data, error} = await SearchProductUser(search.current ? search.current.value : "no", state.selectCategory, window.localStorage.getItem("lang") || "th")
        cate = "";
        if(data?.product){
            setState(prev => ({...prev, product:data?.product, loading:false, countProduct:data.product.length}));
        }
        else {
            setState(prev => ({...prev, loading:false}));
        }
    }


    return (
        <div className="flex flex-col gap-4">
            <h6 className="text-xl font-semibold mt-8 px-4">{t("searchProduct") || "Search for product"}</h6>
            <div className=" flex flex-wrap md:flex-nowrap gap-2 py-2 px-4">
                <InputRef
                ref={search}
                placeholder={t("searchProduct")}
                />
                <button
                onClick={handleSearch}
                className="bg-red-500 hover:bg-red-400 text-white rounded-lg px-4 py-2 w-max"
                >
                {t("search")}
                </button>
            </div>
            <div className="flex flex-col  gap-4">
                    <div className="w-full px-4 py-2">
                   
                      <div className="flex gap-2 flex-col">
                        <h6>{t("searchCategory")}</h6>
                        <select 
                        className="border text-slate-700 text-sm rounded-lg block p-2 outline-none placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                        value={state.selectCategory}
                        onChange={(e:React.ChangeEvent<HTMLSelectElement>) => setState(prev => ({...prev, selectCategory:e.target.value}))}
                        >                      
                            {category && category.map((item, i) => (
                                <option value={item.category_id} key={i}>{handleLang(item.category_name, item.category_name_en, item.category_name_ch)}</option>
                            ))}
                            <option value={""}>ไม่มีหมวดหมู่</option>
                        </select>
                    </div>
                    </div>
                            
                    <div className="w-full p-1">
                    {state.product.length === 0 ?
                    <h6 className="text-center text-2xl font-semibold mt-4 text-slate-700">{t("notFoundSearch")}</h6>
                    :
                    <Product
                    product={state.product}
                    state={state}
                    rowsPerPage={rowsPerPage}
                    setState={setState}
                    lang={lang}
                    handleLang={handleLang}
                    t={t}
                    />
                    }
                    </div>
            </div>
            <Circular
            loading={state.loading}
            />
        </div>
);
}