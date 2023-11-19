import axios from "axios";
import { Product, ProductByCategory, Promotion } from "./home";
import ClientComponent from "./user/home/ClientComponent";

async function LoadData() {
  const res = await axios.get<{
    msg: string
    promotion: Promotion,
    productByCategory: ProductByCategory[],
    randomProduct: Product[]
  }>(`${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/get-home-data`)
  if (res.status !== 200) {
    return { data: null, error: "Server is not ready" }
  }
  else {
    return { data: res.data, error: null }
  }
}

export default async function page() {

  const { data, error } = await LoadData();

  return (
    <>
      {data ?
        <ClientComponent
          data={data}
        />
        :
        <h6 className="text-xl text-center">{error}</h6>
      }
    </>
  );

}

