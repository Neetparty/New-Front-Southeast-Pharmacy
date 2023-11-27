"use client";
import { Pagination } from "@/app/component/Pagination/Pagination";
import { TypeProduct } from "./searchType";
import { StateSearch } from "./Search";
import { TFunction } from "i18next";
import CardDetail from "./CardDetail";
import React from "react";

export default function Product({ product, state, rowsPerPage, setState, lang, handleLang, t }: {
  product: TypeProduct[],
  state: StateSearch,
  rowsPerPage: number,
  setState: React.Dispatch<React.SetStateAction<StateSearch>>
  lang: { lang: string },
  handleLang: (thai: string, eng: string, china: string) => string,
  t: TFunction<"translation", undefined>
}) {


  const handleChangePage = (currentPage: number) => {
    setState(prev => ({ ...prev, currentPage: currentPage }));
  }

  return (

    <>
      <div className=" sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-8 justify-items-center flex gap-2 flex-wrap">
        {product.length !== 0 && product.slice((state.currentPage - 1) * rowsPerPage, (state.currentPage * rowsPerPage)).map((item, key) => (
          <React.Fragment key={key}>
            {/*@ts-ignore*/}
            <CardDetail
              handleLang={handleLang}
              //@ts-ignore
              {...item}

            />
          </React.Fragment>
        ))}
      </div>
      {/* {state.countProduct === 0 &&  */}
      <Pagination
        count={state.countProduct}
        rowsPerPage={rowsPerPage}
        currentPage={state.currentPage}
        setCurrentPage={handleChangePage}
        filteredData={product}
      />
      {/* } */}
    </>
  );
}

