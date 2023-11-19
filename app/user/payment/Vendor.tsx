"use client"
import { Icon } from "@iconify/react";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { PaymentState, ShippingRate } from "./Payment";
import {
    useJsApiLoader,
    GoogleMap,
    DirectionsRenderer,
  } from '@react-google-maps/api'
import { Circular } from "@/app/component/Loading/Circular";
import { ProductRedux } from "@/app/GlobalRedux/Features/Feature";
import { UserPaymentContextType, useUserPayment } from "./Context";
import { useTranslation } from 'react-i18next';
//13.738932474873339, 100.55812097303263
const center = { lat: Number(process.env.NEXT_PUBLIC_APP_GOOGLE_MAPS_LAT) || 13.738932474873339, lng: Number(process.env.NEXT_PUBLIC_APP_GOOGLE_MAPS_LNG) || 100.55812097303263 }
    
    
export default function Vendor({state, setState}: {
    state:PaymentState,
    setState:Dispatch<SetStateAction<PaymentState>>,
})
{   
    const { t } = useTranslation('translation');
    const {product }:UserPaymentContextType = useUserPayment?.()!;

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_APP_GOOGLE_MAPS_API_KEY as string,
        libraries: ['places'],
    })

    

    const [mapState, setMapState] = useState({
        map: null,
        directionsResponse: null,
        distance: '',
    });


    async function calculateRoute() {
        if (!isLoaded) {
            return;
        }
        let directionsService = new window.google.maps.DirectionsService()
        const results = await directionsService.route({
            origin: center,
            destination: {lat: state.selectAddress!.latitude, lng:state.selectAddress!.longitude},
            //@ts-ignore
            travelMode: google.maps.TravelMode.DRIVING,
        })
        //@ts-ignore
        setState(prev => ({...prev, distance: results.routes[0].legs[0].distance?.text.replace(/\s*km$/, '')}))
        setMapState({
            ...mapState,
            //@ts-ignore  
            directionsResponse: results,
            //@ts-ignore
            distance: results.routes[0].legs[0].distance.text,
        });
    }

    useEffect(() => {
        if (state.selectVendor) {
          const selectedVendor = state.vendor.find(
            (vendor) => vendor.name === state.selectVendor
          );
      
          if (selectedVendor) {
            let shippingCostWeight = 0;
            let shippingCostDistance = 0;
      
            for (const rate of selectedVendor.shipping_rate) {
              if (
                rate.type === "weight" &&
                state.weight >= rate.shipping_rate_start &&
                state.weight <= rate.shipping_rate_end
              ) {
                shippingCostWeight = rate.rate_price;
                break;
              }
            }
           
            for (const rate of selectedVendor.shipping_rate) {
              if (
                rate.type === "distance" &&
                state.distance >= rate.shipping_rate_start &&
                state.distance <= rate.shipping_rate_end
              ) {
                shippingCostDistance = rate.rate_price;
                break;
              }
            }
      
            // Update the shipping cost based on the weight range
            setState((prev) => ({
              ...prev,
              shippingCost: shippingCostWeight + shippingCostDistance,
              shippingCostDistance:shippingCostDistance,
              shippingCostWeight: shippingCostWeight,
            }));
          }
        }
      }, [state.selectVendor, state.weight, state.vendor, state.distance, state.selectAddress]);
    

    useEffect(() => {
        calculateRoute();
      }, [isLoaded, state.selectAddress]);
    

    const index = useMemo(() => {
        return state.vendor.findIndex((item) => item.name === state.selectVendor);
    }, [state.selectVendor]);

    const weightArr = useMemo(() => {
        let table = state.vendor[index];
        let temp:ShippingRate[] = [];
        table && table.shipping_rate.length !== 0 && table.shipping_rate.forEach(elem => {
            if(elem.type === "weight"){
                temp.push(elem)
            }
        });
        return temp
    }, [state.selectVendor])

    const distanceArr = useMemo(() => {
        let table = state.vendor[index];
        let temp:ShippingRate[] = [];
        table && table.shipping_rate.length !== 0 && table.shipping_rate.forEach(elem => {
            if(elem.type === "distance"){
                temp.push(elem)
            }
        });
        return temp
    }, [state.selectVendor]);

    const weight = useMemo(() => {
        let number = 0;
        product.product.forEach((elem:ProductRedux) => {
            number += (elem.weight * elem.totalProduct)
        });
        setState(prev => ({...prev, weight: number}))
        return number
    }, [product])

    if (!isLoaded) {
        return <Circular loading={true} />
    }

   

    return (    
    <>
     <div className="flex flex-col gap-4 border p-4 rounded shadow">
        <div className="flex gap-2">
            <Icon
            icon={"la:shipping-fast"}
            className="w-8 h-8 text-red-500"
            />
            <h6 className="text-2xl"> {t("paymentVendorChoice")} </h6>
        </div>
        <hr className="my-2" />

        <select 
        className="border text-slate-700 text-sm rounded-lg block p-2 outline-none placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
        value={state.selectVendor}
        onChange={(e:React.ChangeEvent<HTMLSelectElement>) => setState(prev => ({...prev, selectVendor:e.target.value}))}
        >
            {state.vendor.map((item, i) => (
                <option
                key={i}
                value={item.name}
                >
                {item.name}
                </option>
            ))}                      
        </select>
                
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="block w-full overflow-x-auto">
            <table className="items-center w-full bg-transparent border-collapse border">
                <thead>
                <tr>
                    <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                        {t("paymentVendorWeight")}
                    </th>
                    <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                        {t("paymentVendorPriceperUnit")}
                    </th>
                </tr>
                </thead>
                <tbody className="bg-slate-50">
                    {weightArr.map((item, key) => (
                        <tr
                        key={key}
                        className={`border-b-slate-200 odd:bg-slate-100 hover:bg-slate-200/70`}
                        >
                            <th className="border-t-0 md:px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-center py-2 p-1 ">
                                <span className={"md:ml-3 font-medium text-slate-600  whitespace-normal "}>
                                {item.shipping_rate_start} - {item.shipping_rate_end}
                                </span>
                            </th>
                        
                            <th className="border-t-0 md:px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-center py-2 p-1 ">
                                <span className={"md:ml-3 font-medium text-slate-600  whitespace-normal "}>
                                {item.rate_price}
                                </span>
                            </th>
                        </tr>
                    ))}
                </tbody>

            </table>
            </div>
           
            <div className="block w-full overflow-x-auto">
            <table className="items-center w-full bg-transparent border-collapse border">
                <thead>
                <tr>
                    <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                        {t("paymentVendorRateDistance")}
                    </th>
                    <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-white text-blue-500 border-slate-100 "}>
                        {t("paymentVendorPriceperUnit")}
                    </th>
                 
                </tr>
                </thead>
                <tbody className="bg-slate-50">
                    {distanceArr.map((item, key) => (
                        <tr
                        key={key}
                        className={`border-b-slate-200 odd:bg-slate-100 hover:bg-slate-200/70`}
                        >
                            <th className="border-t-0 md:px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-center py-2 p-1 ">
                                <span className={"md:ml-3 font-medium text-slate-600  whitespace-normal "}>
                                {item.shipping_rate_start} - {item.shipping_rate_end}
                                </span>
                            </th>
                        
                            <th className="border-t-0 md:px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-center py-2 p-1 ">
                                <span className={"md:ml-3 font-medium text-slate-600  whitespace-normal "}>
                                {item.rate_price}
                                </span>
                            </th>
                        </tr>
                    ))}
                </tbody>

            </table>
            </div>
            
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-2 mt-8">
            <h6 className="text-xl"> {t("paymentVendorTotalWeight")}: {weight} kg </h6>
            <h6 className="text-xl"> {t("paymentVendorDistance")}: {mapState.distance}</h6>
        </div>
        <div className="w-full h-full mx-auto xl mb-4">
        <GoogleMap
          center={center}
          zoom={10}
          mapContainerClassName='mx-auto sm:w-[250px] h-[400px]  md:w-[500px]  md:h-[500px] lg:w-[600px] lg:h-[600px] xl:w-[700px]'
          options={{
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
        }}
        // @ts-ignore
        onLoad={(map) => setMapState({ ...mapState, map })}
        >
            {mapState.directionsResponse && (
                <DirectionsRenderer  directions={mapState.directionsResponse} />
            )}
        </GoogleMap>
      
        </div>

    </div>
    </>
);
}