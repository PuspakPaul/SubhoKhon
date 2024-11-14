import React from "react";

const Gallery = () => {
    return(
        <div className="md:w-[80%] mx-auto my-28">
            <div className="mb-16">
                <h1 className="text-5x1 font-bold text-center dark:text-white">Our Gallery</h1>
            </div>
            <div className="md:grid grid-cols-2 items-center justify-center gap-4">
                <div className="mb-4 md:mb-0">
                    <img src="https://i.pinimg.com/564x/a2/31/5a/a2315ada51014cdbc9881fb4f5b961cd.jpg" alt="" className="md:h-[720px] w-full mx-auto rounded-sm"/>
                </div>
                <div className="gap-4 grid grid-cols-2 items-start">
                    <div>
                        <img src="https://qph.cf2.quoracdn.net/main-qimg-b6d951711af26ac0410e620cfc2b6df6-lq"/>
                    </div>
                    <div>
                        <img src="https://3.imimg.com/data3/RA/HE/MY-12980746/theme-party-decoration-1000x1000.jpg"/>
                    </div>
                    <div>
                        <img src="https://www.tripsavvy.com/thmb/OIdZ8mM6Lv5XHgSfgD2Ag2J5onA=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-590267557-57f4aadf5f9b586c35bfa719.jpg" alt="" className="md:h-[350px] rounded-sm"/>
                    </div>
                    <div>
                        <img src="https://i.pinimg.com/originals/f4/0e/5d/f40e5d5ad79f7c2f06c33b1c494ee8cb.jpg" alt="" className="md:h-[350px] rounded-sm"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Gallery