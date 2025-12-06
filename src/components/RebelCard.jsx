
import React from 'react';

const RebelCard = ({ data }) => {
    return (
        <div className="w-full h-full relative overflow-hidden flex flex-col" style={{ backgroundColor: '#F2E8C9' }}>
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}></div>
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-red-600 blur-[80px] opacity-20 mix-blend-multiply"></div>
            <div className="absolute -top-6 left-[20%] w-32 h-12 bg-white/40 shadow-sm transform -rotate-3 backdrop-blur-sm z-20"></div>

            <div className="relative z-10 p-8 md:p-12 flex flex-col h-full justify-between">
                <div className="flex justify-between items-start">
                    <span className="border-2 border-red-800 text-red-800 px-3 py-1 font-bold tracking-widest uppercase text-sm transform -rotate-2 mix-blend-multiply">
                        {data.tag || 'URGENT'}
                    </span>
                    {data.logo && <img src={data.logo} className="h-12 w-auto mix-blend-multiply opacity-80 grayscale contrast-125" alt="logo" />}
                </div>

                <div className="flex-grow flex flex-col justify-center my-6">
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-[1.1] mb-6 drop-shadow-sm font-bengali">
                        {data.headline}
                    </h1>
                    <div className="w-full h-[2px] bg-gray-900 mb-6 opacity-80 transform -rotate-1"></div>
                    <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed font-bengali text-justify">
                        {data.body}
                    </p>
                </div>

                <div className="border-t-4 border-black pt-4 flex justify-between items-end">
                    <h3 className="text-xl font-bold text-red-900 font-bengali">{data.footer}</h3>
                    <span className="bg-black text-white px-2 py-1 text-xs font-bold tracking-widest">{data.date}</span>
                </div>
            </div>
        </div>
    );
};

export default RebelCard;
