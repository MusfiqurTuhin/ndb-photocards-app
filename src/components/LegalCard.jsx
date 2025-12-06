
import React from 'react';

const LegalCard = ({ data }) => {
    return (
        <div className="w-full h-full relative flex flex-col bg-white">
            <div className="absolute left-0 top-0 bottom-0 w-[12px] bg-[#B31D31] z-20"></div>
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

            <div className="relative z-10 p-10 md:p-14 flex flex-col h-full">
                <div className="flex justify-end mb-8">
                    {data.logo && <img src={data.logo} className="h-12 w-auto mix-blend-multiply" alt="logo" />}
                </div>

                <div className="flex-grow flex flex-col justify-center">
                    <div className="mb-4">
                        <span className="bg-[#B31D31] text-white px-3 py-1 text-sm font-bold rounded-sm inline-block mb-2 font-bengali">
                            {data.tag || 'ধারা ৩৪৫'}
                        </span>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight border-b-2 border-gray-100 pb-4 font-bengali">
                            {data.headline}
                        </h1>
                    </div>

                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-justify font-bengali">
                        {data.body}
                    </p>
                </div>

                <div className="mt-8 pt-4 border-t border-gray-200 flex justify-between items-center">
                    <span className="text-lg font-bold text-[#B31D31] font-bengali">{data.footer}</span>
                    <span className="text-xs text-gray-400 uppercase tracking-widest font-sans">{data.date}</span>
                </div>
            </div>
        </div>
    );
};

export default LegalCard;
