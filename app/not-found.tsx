
import Link from "next/link";

export default function Custom404() {


    return (
    <div className="w-screen h-screen bg-gray-300 text-center">
        <div className="flex flex-col gap-4 h-full justify-center items-center">
            <h6 className="text-2xl text-center self-center text-slate-700">There was a problem</h6>
            <p>We could not find the page you were looking for.</p>
            <p>{`Go back to the -> `}<Link href="/" className="text-blue-500 hover:text-blue-400">Home</Link></p>
        </div>    
    </div>
);
}