"use client"
import { Circular } from "@/app/component/Loading/Circular";
import { CreateProductContext, useCreateProduct } from "./Context";
import FirstTab from "./FirstTab";
import SecondTab from "./SecondTab";
import ThirdTab from "./ThirdTab";
const tabClassName = "font-bold relative border-b-4 border-red-500 px-4 hover:border-red-400 hover:text-slate-800/75"

export default function Form() {
    // const [combo, setCombo] = useState(true);
    const {handleTab, onSubmit, state}:CreateProductContext = useCreateProduct?.()!;
    

    
    return (
    <form onSubmit={onSubmit} className="p-8 flex flex-col gap-8">
        <h6 className="text-3xl font-bold">สร้างสินค้า</h6>

        <div className="flex items-center">
                <ul className="flex gap-16 text-xl text-slate-800">
                    
                    <button 
                    type="button"
                    onClick={() => handleTab(0)}
                    className={state.index === 0 ? tabClassName : "hover:text-red-300 hover:border-red-300"}
                    >
                        <h6>ไทย</h6>
                    </button>
                    <button 
                    type="button"
                    onClick={() => handleTab(1)}
                    className={state.index === 1 ? tabClassName : "hover:text-red-300 hover:border-red-300"}
                    >
                        <h6>อังกฤษ</h6>
                    </button>
                    <button 
                    type="button"
                    onClick={() => handleTab(2)}
                    className={state.index === 2 ? tabClassName : "hover:text-red-300 hover:border-red-300"}
                    >
                        <h6>จีน</h6>
                    </button>
                </ul>
        </div>

        {state.index === 0 && 
         <FirstTab/>
        }

        {state.index === 1 && 
        <div className="">
            <SecondTab/>
        </div>
        }

        {state.index === 2 && 
        <div className="">
            <ThirdTab/>
        </div>
        }
        
      <Circular
      loading={state.loading}
      />
    </form>
);


}