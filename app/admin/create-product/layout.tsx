import { CreateProductProvider } from "./Context";

const layout = ({
    children,
  }: {
    children: React.ReactNode
  }) => {

    return (
    <>
        <CreateProductProvider>
          {children}
        </CreateProductProvider>
    </>
);
}
export default layout
