import Form from "./Form";
import Table from "./Table";

export default function page() {


    return (
        <>
            <Form />
            <div className="p-8">
                <Table />
            </div>

        </>
    );
}