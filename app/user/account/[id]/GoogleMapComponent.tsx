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
    lng: any;
    lat: any;
  };
}
interface AddressComponents {
  addressDes: string;
  subDistrict: string;
  district: string;
  province: string;
  postalCode: string;
}


function splitAddress(address: string): AddressComponents {

  // Split the address using commas
  const addressParts: string[] = address.split(',').map(part => part.trim());

  // Extract specific components
  const houseAndRoad: string = addressParts[0];
  const subDistrict: string = addressParts[1];
  const district: string = addressParts[2];
  const provinceAndPostal: string[] = addressParts[3].split(' ');
  const province: string = [...provinceAndPostal.slice(0, provinceAndPostal.length - 1)].join(' ');
  const postalCode: string = provinceAndPostal[provinceAndPostal.length - 1];

  // Create an object with the extracted components
  const result: AddressComponents = {
    addressDes: houseAndRoad,
    subDistrict: subDistrict,
    district: district,
    province: province,
    postalCode: postalCode
  };

  return result;
}

export default function GoogleMapComponent({
  setSubState,
  lat,
  lng
}: {
  setSubState: Dispatch<SetStateAction<ThirdTabAddAddressState>> | Dispatch<SetStateAction<ThirdTabUpdateAddressState>>
  lat?: number,
  lng?: number
}
) {
  let center = useMemo(() => {
    if (lat && lng) {
      return { lat: lat, lng: lng }
    }
    else {
      return { lat: 13.94994400987989, lng: 100.61974684657837 }
    }
  }, [lat, lng]);

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
  const { t, i18n } = useTranslation('translation');
  const options = {
    fields: ["formatted_address", "geometry", "name"],
    strictBounds: false,
  };

  useEffect(() => {
    if (mapState.map) {
      //@ts-ignore
      mapState.map.addListener("click", (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        setSubState((prev: any) => ({
          ...prev,
          position: {
            lat: lat,
            lng: lng
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
  }, [mapState.map, setSubState]);


  useEffect(() => {
    if (mapState.map) {
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
        onClick={(e: any) => {
          // @ts-ignore
          const place = new google.maps.Geocoder().geocode({
            location: {
              lat: e.latLng.lat(),
              lng: e.latLng.lng(),
            },
            region: "th",
            language: i18n.language,
          }).then((response) => {
            const res = response.results[0];
            const address = res.address_components.map((val:any, index) => {
              return {
                addressDes: `${val.types.includes("street_number") ? val.long_name : ''} ${val.types.includes("route") ? val.long_name : ''}`,
                subDistrict: `${val.types.includes("sublocality_level_2") ? val.long_name : ''}`,
                district: `${val.types.includes("sublocality_level_1") ? val.long_name : ''}`,
                province: `${val.types.includes("administrative_area_level_1") ? val.long_name : ''}`,
                postalCode: `${val.types.includes("postal_code") ? val.long_name : ''}`,
              }
            })

            setMapState(prev => ({
              ...prev,
              target: {
                lat: res?.geometry?.location?.lat(),
                lng: res?.geometry?.location?.lng(),
              },
            }));
            setSubState((prev: any) => ({
              ...prev,
              ...address,
              position: {
                lat: res?.geometry?.location?.lat(),
                lng: res?.geometry?.location?.lng(),
              }
            }))
          })
        }}
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
              className="relative outline-none focus:outline-none"
              onPlaceChanged={() => {
                // @ts-ignore
                const autocomplete = new google.maps.places.Autocomplete(originRef.current, options);
                autocomplete.addListener('place_changed', () => {
                  const place = autocomplete.getPlace();

                  const address = splitAddress(place?.formatted_address as string)

                  if (place.geometry) {
                    setMapState(prev => ({
                      ...prev,
                      target: {
                        lat: place?.geometry?.location?.lat(),
                        lng: place?.geometry?.location?.lng(),
                      },
                    }));
                    setSubState((prev: any) => ({
                      ...prev,
                      addressDes: address.addressDes,
                      subDistrict: address.subDistrict,
                      district: address.district,
                      province: address.province,
                      postalCode: address.postalCode,
                      position: {
                        lat: place?.geometry?.location?.lat(),
                        lng: place?.geometry?.location?.lng(),
                      }
                    }))
                  }
                })
              }}
            >
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
                // @ts-ignore
                const autocomplete = new google.maps.places.Autocomplete(originRef.current, options);
                autocomplete.addListener('place_changed', () => {
                  const place = autocomplete.getPlace();

                  const address = splitAddress(place?.formatted_address as string)

                  if (place.geometry) {
                    setMapState(prev => ({
                      ...prev,
                      target: {
                        lat: place?.geometry?.location?.lat(),
                        lng: place?.geometry?.location?.lng(),
                      },
                    }));
                    setSubState((prev: any) => ({
                      ...prev,
                      addressDes: address.addressDes,
                      subDistrict: address.subDistrict,
                      district: address.district,
                      province: address.province,
                      postalCode: address.postalCode,
                      position: {
                        lat: place?.geometry?.location?.lat(),
                        lng: place?.geometry?.location?.lng(),
                      }
                    }))
                  }
                })


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