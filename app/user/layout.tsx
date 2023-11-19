import Footer from "../component/Footer/Footer";
import Navbar from "../component/Navbar/Navbar";
import SubNavbar from "../component/SubNavbar/SubNavbar";

export default function layout({
    children,
  }: {
    children: React.ReactNode;
  }) {

    return (
    <>
    <Navbar/>
    <SubNavbar/>
    <div className="w-full mx-auto md:max-w-[75vw] bg-white flex flex-col gap-8 min-h-[50vh] overflow-hidden">
      {children}
    </div>
    <Footer/>
    {/* <div className="w-full border-0 bg-red-500">dasd</div> */}
    </>
)
}
