import Form from "./Form";

export default function page({ params }: { params: { id: string } }) {


    return (
    <>
    <Form 
    cateId={params.id}
    />
    </>
);
}