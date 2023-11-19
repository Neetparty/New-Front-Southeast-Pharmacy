import { AdminDasboardProvider } from "./Context";

const layout = ({
    children,
  }: {
    children: React.ReactNode
  }) => {

    return (
    <>
        <AdminDasboardProvider>
          {children}
        </AdminDasboardProvider>
    </>
);
}
export default layout
