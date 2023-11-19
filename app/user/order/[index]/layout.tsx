import { UserOrderProvider } from "./Context";

const layout = ({
    children,
  }: {
    children: React.ReactNode
  }) => {

    return (
    <UserOrderProvider>
        {children}
    </UserOrderProvider>
);
}
export default layout
