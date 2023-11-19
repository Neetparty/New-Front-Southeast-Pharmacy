import { UpdateOrderProvider } from "./Context";

const layout = ({
    children,
  }: {
    children: React.ReactNode
  }) => {

    return (
    <>
        <UpdateOrderProvider>
          {children}
        </UpdateOrderProvider>
    </>
);
}
export default layout