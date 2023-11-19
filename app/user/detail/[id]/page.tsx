import Carousel from "@/app/component/Carousel/Carousel";
import Detail from "./detail";

export default function page({ params }: { params: { id: string } }) {

    return (
    <>

    <div className="md:p-8 p-2">
        <Detail
        id={params.id}
        />
    </div>
    </>
);
}