
import React from 'react';
import { getThemeStyles } from '../lib/utils';

const QuoteCard = ({ data }) => {
    // Determine styles based on theme
    const theme = data.theme || 'classic';
    const styles = getThemeStyles(theme);

    return (
        <div
            className="w-full h-full relative flex flex-col p-8 md:p-12 transition-all duration-300 font-bengali"
            style={{
                backgroundColor: styles.bgColor,
                color: styles.bodyColor,
            }}
        >
            {/* Borders based on theme */}
            {styles.showBorder && theme === 'classic' && (
                <div className="absolute inset-4 border-2 border-[#B31D31] opacity-20 pointer-events-none"></div>
            )}
            {styles.showBorder && theme === 'bold' && (
                <div className="absolute inset-6 border border-white opacity-20 pointer-events-none"></div>
            )}
            {styles.showBorder && theme === 'dark' && (
                <div className="absolute inset-6 border border-[#FFD700] opacity-30 pointer-events-none"></div>
            )}

            {/* Oborodh Border */}
            {theme === 'oborodh' && (
                <div className="absolute inset-2.5 border-4 pointer-events-none border-[#B31D31]"></div>
            )}

            {/* Header / Logo */}
            <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="flex-1"></div>
                {data.logo && (
                    <img
                        src={data.logo}
                        className="h-10 object-contain"
                        style={{
                            filter: theme === 'bold' || theme === 'dark' || theme === 'oborodh'
                                ? 'grayscale(100%) brightness(1000%)'
                                : 'grayscale(100%) contrast(120%)'
                        }}
                        alt="logo"
                    />
                )}
            </div>

            {/* Main Content */}
            <div className={`flex-grow flex flex-col ${theme === 'modern' ? 'items-start text-left' : 'items-center text-center'} justify-center relative z-10`}>

                {data.showMainImage && (
                    <div className={`relative mb-6 ${theme === 'modern' ? 'self-start' : ''}`}>
                        <img
                            src={data.mainImage || "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Begum_Rokeya.jpg/300px-Begum_Rokeya.jpg"}
                            className={`w-32 h-32 object-cover rounded-full shadow-md border-2 ${theme === 'bold' ? 'border-[#B31D31]' :
                                    theme === 'dark' ? 'border-[#FFD700]' : 'border-[#E5E6DA]'
                                }`}
                            style={{ filter: data.imageStyle === 'sepia' ? 'sepia(50%) contrast(110%)' : data.imageStyle === 'grayscale' ? 'grayscale(100%)' : 'none' }}
                            alt="Portrait"
                        />
                    </div>
                )}

                <h1
                    className="font-bold leading-tight mb-4"
                    style={{
                        color: styles.headlineColor,
                        fontSize: `${data.headlineFontSize || 32}px`
                    }}
                >
                    {data.headline}
                </h1>

                {theme !== 'modern' && <div className={`w-12 h-1 mb-6 rounded-full opacity-60 ${theme === 'bold' ? 'bg-white' : theme === 'dark' ? 'bg-[#FFD700]' : 'bg-[#B31D31]'}`}></div>}

                <p
                    className={`font-medium leading-relaxed whitespace-pre-wrap ${theme === 'modern' ? 'text-left' : 'text-justify'}`}
                    style={{
                        fontSize: `${data.bodyFontSize || 18}px`,
                        color: styles.bodyColor
                    }}
                >
                    {data.body}
                </p>
            </div>

            {/* Footer */}
            <div className={`mt-6 pt-4 border-t ${theme === 'bold' ? 'border-white/20' : 'border-[#B31D31]/20'} relative z-10`}>
                <div className={`flex flex-col gap-1 ${theme === 'modern' ? 'items-start' : 'items-center text-center'}`}>
                    <p className="italic text-sm" style={{ color: styles.footerColor }}>{data.bookName}</p>
                    <p className="font-bold text-lg" style={{ color: styles.authorColor }}>{data.authorName}</p>
                    <p className="text-xs tracking-wide opacity-80" style={{ color: styles.footerColor }}>{data.date}</p>
                </div>
            </div>

            {theme === 'classic' && (
                <>
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-[#B31D31]"></div>
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-[#B31D31]"></div>
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-[#B31D31]"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-[#B31D31]"></div>
                </>
            )}
        </div>
    );
};

export default QuoteCard;
