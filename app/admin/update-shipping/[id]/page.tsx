"use client"
import Form from "./Form";
import RateWeight from "./RateWeight";
import RateDistance from "./RateDistance";

export default function page({params}: {params:{id:string}}) {


    return (
    <div className="p-8 flex flex-col gap-16">
        <Form ShipID={params.id}/>
        <hr/>
        <RateWeight ShipID={params.id}/>
        <hr/>
        <RateDistance ShipID={params.id}/>

    </div>
);
}