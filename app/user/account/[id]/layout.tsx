import { UserAccountProvider } from "./Context";

const layout = ({
    children,
  }: {
    children: React.ReactNode
  }) => {

    return (
    <>
        <UserAccountProvider>
          {children}
        </UserAccountProvider>
    </>
);
}
export default layout
