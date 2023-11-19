import Form from "./Form";
import Table from "./Table";

export default function page() {


    return (
    <div className="p-8 flex flex-col gap-8">
        <Form/>
        <Table/>
    </div>
);
}