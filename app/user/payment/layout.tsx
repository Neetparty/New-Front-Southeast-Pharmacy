import { UserPaymentProvider } from "./Context";

const layout = ({
    children,
  }: {
    children: React.ReactNode
  }) => {

    return (
    <>
        <UserPaymentProvider>
          {children}
        </UserPaymentProvider>
    </>
);
}
export default layout
