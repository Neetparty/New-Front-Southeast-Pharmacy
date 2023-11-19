import { AdminUserProvider } from "./Context";

const layout = ({
    children,
  }: {
    children: React.ReactNode
  }) => {

    return (
    <AdminUserProvider>
        {children}
    </AdminUserProvider>
);
}
export default layout
