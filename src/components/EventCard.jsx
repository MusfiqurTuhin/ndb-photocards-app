
import React from 'react';
import { Mic, Calendar, Clock, ImageIcon } from 'lucide-react';

const EventCard = ({ data }) => {
    return (
        <div className="w-full h-full relative flex flex-col bg-[#E5E6DA]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#B31D31] rounded-bl-full opacity-10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#B31D31] rounded-tr-full opacity-5 pointer-events-none"></div>

            <div className="relative z-10 p-8 md:p-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3 bg-white p-2 pr-6 rounded-full shadow-sm border border-gray-200">
                        <div className="bg-[#B31D31] p-2 rounded-full text-white"><Mic size={16} /></div>
                        <div className="flex flex-col">
                            <span className="font-bold text-sm leading-none font-bengali">গণতন্ত্র আলাপ</span>
                            <span className="text-[10px] text-red-600 font-bold uppercase">{data.tag || 'EPISODE 01'}</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="flex items-center justify-end gap-2 text-[#B31D31] font-bold font-bengali"><Calendar size={16} /> {data.date}</div>
                        <div className="flex items-center justify-end gap-2 text-gray-600 text-sm font-bengali"><Clock size={14} /> {data.footer}</div>
                    </div>
                </div>

                <div className="mb-6 border-l-4 border-[#B31D31] pl-4">
                    <h1 className="text-3xl md:text-4xl font-black text-[#B31D31] leading-tight font-bengali">
                        {data.headline}
                    </h1>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-auto mb-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex flex-col items-center text-center">
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 border-[#B31D31] mb-2 shadow-sm bg-gray-200 relative">
                                {data[`speaker${i}Img`] ? (
                                    <img src={data[`speaker${i}Img`]} className="w-full h-full object-cover" alt="speaker" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400"><ImageIcon size={24} /></div>
                                )}
                            </div>
                            <h3 className="font-bold text-sm text-gray-900 leading-tight font-bengali">{data[`speaker${i}Name`] || 'নাম লিখুন'}</h3>
                            <p className="text-[10px] text-gray-600 font-bengali">{data[`speaker${i}Role`] || 'পদবী'}</p>
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-between border-t border-gray-300 pt-4 mt-auto">
                    <div className="flex items-center gap-2">
                        {data.logo && <img src={data.logo} className="h-8 w-auto object-contain" alt="logo" />}
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-800 leading-tight">Democratic<br />Bangladesh<br />Network</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#B31D31] font-bold text-sm font-bengali">
                        <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span> লাইভ দেখুন
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
