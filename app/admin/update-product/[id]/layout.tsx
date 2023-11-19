import { UpdateProductProvider } from "./Context";

const layout = ({
    children,
  }: {
    children: React.ReactNode
  }) => {

    return (
    <>
        <UpdateProductProvider>
          {children}
        </UpdateProductProvider>
    </>
);
}
export default layout
