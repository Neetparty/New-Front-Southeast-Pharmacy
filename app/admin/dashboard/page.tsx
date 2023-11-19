"use client"
import Dashboard from "./dashboard";
import CardStatsNewUser from "./card/CardStatsNewUser";
import CardTotalProduct from "./card/CardTotalProduct";
import CardIncome from "./card/CardIncome";
import CardTransaction from "./card/CardTransaction";
export default function page() {




    return (
        <div className="p-8 flex flex-col gap-8">
            <div className="flex flex-wrap gap-10 mt-6 justify-around">
                <CardTotalProduct/>
                <CardStatsNewUser />
                <CardIncome/>
                <CardTransaction  />
            </div>
     
            <div className='mt-3'>
                <Dashboard />
            </div>
        </div>
    );
}