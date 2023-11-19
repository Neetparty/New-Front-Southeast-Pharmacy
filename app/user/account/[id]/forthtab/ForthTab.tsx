"use client"
import Image from 'next/image'
import moment from 'moment';
import "moment/locale/th";
import { Pagination } from '@/app/component/Pagination/Pagination';
import { UserAccountContextType, useUserAccount } from '../Context';
import { useSelector } from 'react-redux';
import { selectLangData } from '@/app/GlobalRedux/Features/selector';
export default function ForthTab() {

    const lang = useSelector(selectLangData);

    const {forthState, setForthState, rowsPerPage}:UserAccountContextType = useUserAccount?.()!;

    const handleChangePage = (currentPage:number) => {
        setForthState(prev => ({...prev, currentPage:currentPage}));
    }

    

    

    return (
        <>
        <div className="flex flex-col gap-8 text-slate-700 ">
           {forthState.notiData.length !== 0 ? forthState.notiData.map((item, i) => (
            <div className="flex flex-wrap gap-4 justify-center items-center md:justify-between border-b pb-2"key={i}>
                <div className="flex flex-wrap gap-2 items-center"
                >
                    {item.image ? 
                    <div className="flex gap-2 relative w-[4rem] h-[4rem] min-w-max">
                    <Image
                    alt='notiImage'
                    src={item.image}
                    fill
                    />
                    </div>
                    :
                    <div className="border flex gap-2 relative w-[4rem] h-[4rem] min-w-max">
                    </div>

                    }
                    <div className="flex flex-col gap-2">
                        <h6 className="text-xl ">{item.title}</h6>
                        <h6 className="text-base ">{item.message}</h6>
                    </div>

                </div>

                <div className="float-end">
                    <h6 className="w-max text-sm">{moment(item.created_at).locale(lang.lang).format("lll")}</h6>
                </div>
         </div>
           ))
        :
        <h6 className="text-slate-600 text-center text-xl font-semibold">ดูเหมือนคุณจะยังไม่มีการแจ้งเตือนเลย</h6>
        }
           
           {forthState.countNoti !== 0 && 
          <Pagination
          count={forthState.countNoti}
          currentPage={forthState.currentPage}
          rowsPerPage={rowsPerPage}
          setCurrentPage={handleChangePage}
          filteredData={forthState.notiData}
          />
        }
        
        </div>
        </>
    )
}

   

/* 
 

*/