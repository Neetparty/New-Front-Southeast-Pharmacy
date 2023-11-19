"use client";
import { Circular } from '@/app/component/Loading/Circular';
import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
  } from '@react-google-maps/api'
  
import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from 'react'
import { ThirdTabAddAddressState, ThirdTabUpdateAddressState } from './account';
import { useTranslation } from 'react-i18next';
interface GoogleMapState {
    map: any;
    directionsResponse: any;
    distance: any;
    duration: any;
    target: {
      lng:any;
      lat:any;
    };
  }
  
  export default function GoogleMapComponent({
    setSubState,
    lat,
    lng
  }:{
    setSubState:Dispatch<SetStateAction<ThirdTabAddAddressState>> | Dispatch<SetStateAction<ThirdTabUpdateAddressState>>
    lat?:number,
    lng?:number
  }
  ) {
    let center = useMemo(() => {
    if(lat && lng){
      return {lat:lat, lng:lng}
    }
    else {
      return {lat:13.94994400987989, lng:100.61974684657837}
    }
  },[lat,lng]);
  
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_APP_GOOGLE_MAPS_API_KEY as string,
        libraries: ['places'],
    })
    const [mapState, setMapState] = useState<GoogleMapState>({
        map: null,
        directionsResponse: null,
        distance: '',
        duration: '',
        target: {
          lat: center.lat, 
          lng: center.lng
        },
    });

    const originRef = useRef(null);
    const destiantionRef = useRef(null);
    const { t } = useTranslation('translation');

    useEffect(() => {
      
          if (mapState.map) {
            //@ts-ignore
          mapState.map.addListener("click", (e) => {
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();
            setSubState((prev:any) => ({
                ...prev,
                position: {
                    lat:lat,
                    lng:lng
                }
            }))
            setMapState(prev => ({
              ...prev,
              target: {
                lat: lat,
                lng: lng
              }
            }));
          });
        }
      }, [mapState.map]);
      
      
      useEffect(() => {
        if(mapState.map){
          setMapState(prev => ({
            ...prev,
            target: {
              lat: center.lat,
              lng: center.lng
            }
          }));  
        }
      }, [])
      

    if (!isLoaded) {
        return <Circular loading={true} />
    }

    return (
        <div className="w-full h-full mx-auto xl">
          <GoogleMap
          center={center}
          zoom={15}
          mapContainerClassName='mt-16  mx-auto sm:w-[250px] h-[400px]  md:w-[500px]  md:h-[600px] lg:w-[700px] lg:h-[800px] xl:w-[900px]'
          options={{
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
        }}
        //@ts-ignore
        onLoad={(map) => setMapState({ ...mapState, map })}
        >
            {/* @ts-ignore */}
            <Marker position={{ lat: Number(mapState.target.lat), lng: Number(mapState.target.lng) }} />
            {mapState.directionsResponse && (
                <DirectionsRenderer directions={mapState.directionsResponse} />
            )}
        </GoogleMap>
        <div className="p-4 rounded-lg m-4 bg-white shadow-base min-w-container.md z-1">
      <div className="flex space-x-2 justify-between">
        <div className="flex-grow">
            <h6 className="text-lg mb-2"> {t("googlemapSearch1")} </h6>
          <Autocomplete 
          ref={destiantionRef}
            className="relative outline-none focus:outline-none">
            <input
              type="text"
              placeholder={t("googlemapSearch2")}
              /* @ts-ignore */
              ref={originRef}
              className="w-full py-2 px-3 border rounded-lg focus:ring focus:ring-blue-400 outline-none focus:outline-none relative  text-sm shadow"
              />
          </Autocomplete>
              <button
              type='button'
              onClick={() => {
                //@ts-ignore
                if(destiantionRef.current){
                  //@ts-ignore
                  let lat = destiantionRef.current.state.autocomplete.gm_accessors_.place.vw.Bm.gm_accessors_.place.Bm.place.geometry.location.lat() || 13.738932474873339;
                  //@ts-ignore
                  let lng = destiantionRef.current.state.autocomplete.gm_accessors_.place.vw.Bm.gm_accessors_.place.Bm.place.geometry.location.lng() || 100.55812097303263;
                  center = {lat:lat, lng:lng}
                  mapState.map.panTo(center)
                }
              }}
              className="mt-2 px-4 py-2 bg-red-500 hover:bg-red-400 text-white rounded-lg"
              >
              {t("googlemapGo")}
              </button>
        </div>
        
      </div>
    </div>
    </div>
);
}