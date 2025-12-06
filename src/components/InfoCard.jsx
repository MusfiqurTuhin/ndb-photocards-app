
import React from 'react';
import { ShieldAlert, Activity } from 'lucide-react';

const InfoCard = ({ data }) => {
    return (
        <div className="w-full h-full relative flex flex-col bg-[#B31D31] text-white">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

            <div className="relative z-10 p-8 flex flex-col h-full">
                <div className="flex justify-between items-center border-b border-white/20 pb-4 mb-6">
                    {data.logo && <img src={data.logo} className="h-10 w-auto brightness-0 invert" alt="logo" />}
                    <div className="flex items-center gap-2 bg-white text-[#B31D31] px-3 py-1 rounded-sm font-bold text-sm uppercase">
                        <ShieldAlert size={16} /> {data.tag || 'সতর্কতা'}
                    </div>
                </div>

                <h1 className="text-4xl font-black mb-8 leading-tight font-bengali drop-shadow-lg">
                    {data.headline}
                </h1>

                <div className="grid grid-cols-1 gap-4 flex-grow">
                    <div className="bg-black/20 p-4 border-l-4 border-white flex items-center gap-4 backdrop-blur-sm">
                        <Activity size={40} className="shrink-0" />
                        <div>
                            <h2 className="text-3xl font-black font-bengali">{data.stat1Value || '৮.৬৫ লাখ'}</h2>
                            <p className="text-sm opacity-90 font-bengali">{data.stat1Label || 'ভবন ধস (ঢাকায়)'}</p>
                        </div>
                    </div>
                    <div className="bg-black/20 p-4 border-l-4 border-white flex items-center gap-4 backdrop-blur-sm">
                        <ShieldAlert size={40} className="shrink-0" />
                        <div>
                            <h2 className="text-3xl font-black font-bengali">{data.stat2Value || '২.১০ লাখ'}</h2>
                            <p className="text-sm opacity-90 font-bengali">{data.stat2Label || 'সম্ভাব্য মৃত্যু'}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/20 text-sm opacity-80 font-bengali text-center">
                    উৎস: {data.footer}
                </div>
            </div>
        </div>
    );
};

export default InfoCard;
