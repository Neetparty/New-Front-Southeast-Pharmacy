import { PromotionProvider } from "./Context";

const layout = ({
    children,
  }: {
    children: React.ReactNode
  }) => {

    return (
    <PromotionProvider>
        {children}
    </PromotionProvider>
);
}
export default layout
