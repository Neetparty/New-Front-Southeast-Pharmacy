"use client";
import { useSelector } from "react-redux";
import { selectCategoryData } from "@/app/GlobalRedux/Features/selector";
import { useTranslation } from 'react-i18next';
import { StateSearch } from "./Search";

export default function FilterSection({state, setState, lang, handleLang}:{state:StateSearch, setState: React.Dispatch<React.SetStateAction<StateSearch>>, lang: {lang:string},
    handleLang:(thai:string, eng:string, china:string) => string}) {

    const category = useSelector(selectCategoryData);
    const { t } = useTranslation('translation')    

    return (
        <div className="flex flex-col gap-4 w-full mx-auto">

            <details className="border shadow-lg p-4">
                <summary className="cursor-pointer min:w-max w-full">
                    <h1 className="inline w-max"> {t("searchCategory")} </h1>
                </summary>
                
               <div className="flex flex-col gap-4 mt-4">
                    {category.length !== 0 && category.map((item, i) => (
                        <div className="flex gap-2 cursor-pointer items-center" onClick={() => setState(prev => ({...prev, selectCategory:item.category_id}))}  key={i}>
                            <input
                            type="radio"
                            checked={item.category_id === state.selectCategory}
                            value={item.category_id}
                            className="w-4 h-4"
                            onChange={() => {}}
                            />
                            <h6 className="line-clamp-2">{handleLang(item.category_name, item.category_name_en, item.category_name_ch)}</h6>
                        </div>
                    ))}
               </div>
            </details>
         
           
        </div>

    );
};