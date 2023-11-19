import Form from "./Form";
import Table from "./Table";

export default function page({ params }: { params: { id: string } }) {


    return (
    <div className="p-8 flex flex-col gap-8">
        <Form promotion_id={params.id}/>
 
        <Table promotion_id={params.id}/>
    </div>
);
}