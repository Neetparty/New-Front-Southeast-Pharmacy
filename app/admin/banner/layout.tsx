import { BannerProvider } from "./Context";

const layout = ({
    children,
  }: {
    children: React.ReactNode
  }) => {

    return (
    <>
        <BannerProvider>
          {children}
        </BannerProvider>
    </>
);
}
export default layout
