import Form from "./Form";
import SecondForm from "./SecondForm";
import Table from "./Table";

export default function page() {


    return (
    <>
        <Form/>
        <div className="p-8">
          <Table/>
        </div>
        <SecondForm/>
    </>
);
}