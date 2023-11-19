import { CreateCategoryProvider } from "./Context";

const layout = ({
    children,
  }: {
    children: React.ReactNode
  }) => {

    return (
    <CreateCategoryProvider>
        {children}
    </CreateCategoryProvider>
);
}
export default layout
