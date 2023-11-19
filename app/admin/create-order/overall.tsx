export default function footer() {


    return (
        <>
            <div className="flex justify-end py-10">
                <div className="">
                    <div className="gap-20 py-2 flex justify-between">
                        <div className="">
                            <h6>ยอดรวมสินค้า</h6>
                        </div>
                        <div className="">
                            <h6>฿150</h6>
                        </div>
                    </div>

                    <div className="gap-20 py-2 flex justify-between">
                        <div className="">
                            <h6>ค่าจัดส่ง</h6>
                        </div>
                        <div className="">
                            <h6>฿50</h6>
                        </div>
                    </div>

                    <div className="gap-20 py-2 flex justify-between">
                        <div className="">
                            <h6>การชำระเงินทั้งหมด</h6>
                        </div>
                        <div className="">
                            <h6>฿200</h6>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end">
                <button className="bg-[#ef4444] hover:bg-[#f05a5a] text-white font-bold py-2 px-4 h-10 rounded">สร้างออเดอร์</button>
            </div>
            
        </>
    );
}