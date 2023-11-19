import { UpdatePromotionProvider } from "./Context";

const layout = ({
    children,
  }: {
    children: React.ReactNode
  }) => {

    return (
    <UpdatePromotionProvider>
        {children}
    </UpdatePromotionProvider>
);
}
export default layout
