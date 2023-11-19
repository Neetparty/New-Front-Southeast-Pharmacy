import Form from "./Form";

const layout = ({
  children,
}: {
  children: React.ReactNode
}) => {

  return (
    <>
      <>
        <Form />
        <div className="p-8">
          {children}
        </div>
      </>
    </>
  );
}
export default layout
