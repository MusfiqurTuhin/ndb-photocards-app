
import React, { useState, useEffect } from 'react';
import {
  Download, Layout, Type, Image as ImageIcon, Palette,
  ArrowLeft, ChevronRight, Zap, Layers,
  MonitorPlay, Mic, ShieldAlert, Activity, Quote, BookOpen, CheckCircle, Menu
} from 'lucide-react';
import { FONTS, INITIAL_QUOTES } from './lib/constants';
import { downloadImage } from './lib/utils';

// Import Components
import QuoteCard from './components/QuoteCard';
import RebelCard from './components/RebelCard';
import LegalCard from './components/LegalCard';
import EventCard from './components/EventCard';
import InfoCard from './components/InfoCard';

export default function App() {
  const [view, setView] = useState('home'); // 'home' | 'editor'
  const [activeTemplate, setActiveTemplate] = useState(null);

  // Template Data Definitions
  const templates = [
    {
      id: 'quote',
      name: 'Quote Generator',
      desc: 'Rokeya style quotes with themes.',
      component: QuoteCard,
      icon: Quote,
      defaultData: {
        headline: '“অতএব জাগ, জাগ গো ভগিনি!”',
        body: 'প্রথমে জাগিয়া উঠা সহজ নহে, জানি; সমাজ মহা গোলযোগ বাধাইবে জানি; ভারতবাসী মুসলমান আমাদের জন্য “কৎল” এর (অর্থাৎ প্রাণদণ্ডের) বিধান দিবেন এবং হিন্দু চিতানল বা তুষানলের ব্যবস্থা দিবেন, জানি! কিন্তু সমাজের কল্যাণের নিমিত্ত জাগিতে হইবেই।',
        bookName: 'স্ত্রীজাতির অবনতি, মতিচূর (প্রথম খণ্ড)',
        authorName: 'বেগম রোকেয়া সাখাওয়াত হোসেন',
        date: '৯ ডিসেম্বর, ১৮৮০ - ৯ ডিসেম্বর, ১৯৩২',
        logo: 'https://democraticbangladeshnetwork.com/wp-content/uploads/2025/11/gbn-logo-red-scaled.png',
        theme: 'classic',
        headlineFontSize: 28,
        bodyFontSize: 16,
        showMainImage: true,
        imageStyle: 'grayscale'
      }
    },
    {
      id: 'rebel',
      name: 'Rebel Press',
      desc: 'Gritty, textured style for protests.',
      component: RebelCard,
      icon: Zap,
      defaultData: {
        tag: 'গণবিক্ষোভ',
        headline: 'সারাদেশে ছাত্র-জনতার অসহযোগ আন্দোলন',
        body: 'দাবি মানা না হলে অনির্দিষ্টকালের জন্য রাজপথ অবরোধ কর্মসূচি চলবে। সকল শিক্ষা প্রতিষ্ঠান ও অফিস আদালত বন্ধ থাকবে।',
        footer: 'বিপ্লবী ছাত্র সমাজ',
        date: '৫ আগস্ট ২০২৫',
        logo: 'https://democraticbangladeshnetwork.com/wp-content/uploads/2025/11/gbn-logo-red-scaled.png'
      }
    },
    {
      id: 'legal',
      name: 'Official Decree',
      desc: 'Clean, authoritative style for laws.',
      component: LegalCard,
      icon: Layers,
      defaultData: {
        tag: 'ধারা ১৪৪',
        headline: 'জরুরি অবস্থা ঘোষণা ও কারফিউ জারি',
        body: 'আইনশৃঙ্খলা পরিস্থিতি নিয়ন্ত্রণে রাখার স্বার্থে আজ সন্ধ্যা ৬টা থেকে অনির্দিষ্টকালের জন্য কারফিউ জারি করা হলো। বিনা প্রয়োজনে ঘরের বাইরে বের হওয়া দণ্ডনীয় অপরাধ।',
        footer: 'স্বরাষ্ট্র মন্ত্রণালয়',
        date: 'অফিসিয়াল আদেশ',
        logo: 'https://democraticbangladeshnetwork.com/wp-content/uploads/2025/11/gbn-logo-red-scaled.png'
      }
    },
    {
      id: 'event',
      name: 'Event Panel',
      desc: 'Speaker grid for seminars/lives.',
      component: EventCard,
      icon: MonitorPlay,
      defaultData: {
        tag: 'LIVE Discussion',
        headline: 'গণতন্ত্র ও গণমাধ্যমের স্বাধীনতা',
        date: 'শুক্রবার, ১০ ডিসেম্বর',
        footer: 'রাত ৯:০০ টা',
        speaker1Name: 'ড. আসিফ নজরুল',
        speaker1Role: 'অধ্যাপক, ঢাবি',
        speaker1Img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
        speaker2Name: 'নুরুল হক নুর',
        speaker2Role: 'ভিপি, ডাকসু',
        speaker2Img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
        speaker3Name: 'জোনায়েদ সাকি',
        speaker3Role: 'গণসংহতি আন্দোলন',
        speaker3Img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
        logo: 'https://democraticbangladeshnetwork.com/wp-content/uploads/2025/11/gbn-logo-red-scaled.png'
      }
    },
    {
      id: 'info',
      name: 'Red Alert',
      desc: 'High impact infographic data.',
      component: InfoCard,
      icon: ShieldAlert,
      defaultData: {
        tag: 'বন্যা সতর্কতা',
        headline: 'উত্তরাঞ্চলে বন্যার পানি বিপদসীমার উপরে',
        stat1Value: '৫০ হাজার',
        stat1Label: 'পানিবন্দী পরিবার',
        stat2Value: '১২০টি',
        stat2Label: 'আশ্রয়কেন্দ্র খোলা হয়েছে',
        footer: 'দুর্যোগ ব্যবস্থাপনা অধিদপ্তর',
        logo: 'https://democraticbangladeshnetwork.com/wp-content/uploads/2025/11/gbn-logo-red-scaled.png'
      }
    },
  ];


  // Editor State
  const [editorData, setEditorData] = useState({});

  const handleTemplateSelect = (template) => {
    setActiveTemplate(template);
    setEditorData(template.defaultData);
    setView('editor');
  };

  const handleInputChange = (key, value) => {
    setEditorData(prev => ({ ...prev, [key]: value }));
  };

  const handleImageUpload = (key, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        handleInputChange(key, event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Preset Loader for Quote Card
  const loadPreset = (preset) => {
    setEditorData(prev => ({
      ...prev,
      headline: preset.headline,
      body: preset.body,
      bookName: preset.bookName,
      theme: preset.defaultTheme
    }));
  };

  // --- RENDERERS ---

  if (view === 'home') {
    return (
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#B31D31] rounded-lg flex items-center justify-center text-white font-bold">N</div>
              <span className="font-bold text-xl tracking-tight">NDB<span className="text-[#B31D31]">Studio</span></span>
            </div>
            <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
              <a href="#" className="hover:text-[#B31D31]">Templates</a>
              <a href="#" className="hover:text-[#B31D31]">Showcase</a>
              <a href="#" className="hover:text-[#B31D31]">Resources</a>
            </div>
            <button className="bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
              Sign In
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-red-50 text-[#B31D31] text-xs font-bold uppercase tracking-wider mb-6 border border-red-100">
            Version 2.0 Beta
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-gray-900 mb-6">
            Create powerful <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B31D31] to-orange-600">Bengali Visuals</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-10">
            A specialized design suite for NDB activists. Generate press cards, event posters, and legal notices in seconds. No design skills required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => document.getElementById('templates').scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-[#B31D31] text-white rounded-full font-bold text-lg shadow-lg hover:bg-red-700 transition-all flex items-center justify-center gap-2">
              Start Designing <ChevronRight size={20} />
            </button>
            <button className="px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-full font-bold text-lg shadow-sm hover:bg-gray-50 transition-all">
              View Gallery
            </button>
          </div>

          {/* Social Proof */}
          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col items-center">
            <p className="text-sm text-gray-400 font-medium mb-4">TRUSTED BY 500+ ACTIVISTS</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div id="templates" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Select a Template</h2>
                <p className="text-gray-500">Choose a starting point for your design.</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 border rounded-md hover:bg-gray-50"><Layout size={20} /></button>
                <button className="p-2 border rounded-md hover:bg-gray-50"><Menu size={20} /></button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {templates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => handleTemplateSelect(template)}
                  className="group relative bg-gray-50 rounded-2xl overflow-hidden cursor-pointer border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-[4/5] bg-gray-200 relative overflow-hidden">
                    {/* Live Preview Thumbnail Mockup */}
                    <div className="absolute inset-0 transform scale-50 origin-top-left w-[200%] h-[200%] pointer-events-none">
                      <template.component data={template.defaultData} />
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                    <div className="absolute bottom-4 right-4 bg-white rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                      <ArrowLeft size={20} className="transform rotate-180 text-[#B31D31]" />
                    </div>
                  </div>
                  <div className="p-5 bg-white">
                    <div className="flex items-center gap-2 mb-1">
                      <template.icon size={16} className="text-[#B31D31]" />
                      <h3 className="font-bold text-gray-900">{template.name}</h3>
                    </div>
                    <p className="text-xs text-gray-500">{template.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // EDITOR VIEW
  return (
    <div className="h-screen flex flex-col md:flex-row bg-[#E5E5E5] overflow-hidden font-sans">
      <style>{`
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 2px; }
      `}</style>

      {/* LEFT: Sidebar Editor Controls */}
      <div className="w-full md:w-[380px] bg-white border-r border-gray-200 flex flex-col z-20 shadow-xl h-full overflow-hidden">
        {/* Sidebar Header */}
        <div className="p-5 border-b border-gray-100 flex items-center gap-4 bg-white">
          <button
            onClick={() => setView('home')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="font-bold text-gray-900 text-lg leading-tight">{activeTemplate.name}</h2>
            <p className="text-xs text-gray-400">Editing Mode</p>
          </div>
        </div>

        {/* Scrollable Form Area */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6">

          {/* --- QUOTE GENERATOR SPECIFIC CONTROLS --- */}
          {activeTemplate.id === 'quote' && (
            <>
              {/* 1. Theme Selector */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  <Palette size={14} /> Theme Style
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {['classic', 'modern', 'bold', 'dark', 'oborodh'].map(t => (
                    <button
                      key={t}
                      onClick={() => handleInputChange('theme', t)}
                      className={`py-2 text-xs font-bold rounded-lg capitalize border ${editorData.theme === t
                          ? 'bg-[#B31D31] text-white border-[#B31D31] shadow-md'
                          : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                        } ${t === 'oborodh' ? 'col-span-3' : ''}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Preset Selection */}
              <div className="space-y-3 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  <BookOpen size={14} /> Load Preset Quote
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {INITIAL_QUOTES.map((q) => (
                    <button
                      key={q.id}
                      onClick={() => loadPreset(q)}
                      className="h-10 rounded border border-gray-200 hover:border-[#B31D31] hover:bg-red-50 text-xs font-bold text-gray-600 transition-colors"
                    >
                      {q.id}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Typography Controls */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  <Type size={14} /> Typography
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Headline Size</span>
                      <span>{editorData.headlineFontSize}px</span>
                    </div>
                    <input
                      type="range" min="20" max="60"
                      value={editorData.headlineFontSize}
                      onChange={(e) => handleInputChange('headlineFontSize', e.target.value)}
                      className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#B31D31]"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Body Size</span>
                      <span>{editorData.bodyFontSize}px</span>
                    </div>
                    <input
                      type="range" min="14" max="32"
                      value={editorData.bodyFontSize}
                      onChange={(e) => handleInputChange('bodyFontSize', e.target.value)}
                      className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#B31D31]"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Section: Text Content (Generic + Specifics) */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
              <Type size={14} /> Text Content
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600">Headline</label>
              <textarea
                value={editorData.headline}
                onChange={(e) => handleInputChange('headline', e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bengali focus:ring-2 focus:ring-[#B31D31] focus:border-transparent outline-none transition-all resize-none"
                rows={3}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600">Body Text</label>
              <textarea
                value={editorData.body}
                onChange={(e) => handleInputChange('body', e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bengali focus:ring-2 focus:ring-[#B31D31] focus:border-transparent outline-none transition-all"
                rows={5}
              />
            </div>

            {/* Dynamic Fields based on Template */}
            {activeTemplate.id === 'quote' ? (
              <div className="space-y-3">
                <input
                  type="text" placeholder="Book Name"
                  value={editorData.bookName || ''}
                  onChange={(e) => handleInputChange('bookName', e.target.value)}
                  className="w-full p-2 bg-gray-50 border border-gray-200 rounded-md text-sm font-bengali"
                />
                <input
                  type="text" placeholder="Author Name"
                  value={editorData.authorName || ''}
                  onChange={(e) => handleInputChange('authorName', e.target.value)}
                  className="w-full p-2 bg-gray-50 border border-gray-200 rounded-md text-sm font-bengali"
                />
                <input
                  type="text" placeholder="Date"
                  value={editorData.date || ''}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="w-full p-2 bg-gray-50 border border-gray-200 rounded-md text-sm font-bengali"
                />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-600">Tag / Badge</label>
                  <input
                    type="text"
                    value={editorData.tag || ''}
                    onChange={(e) => handleInputChange('tag', e.target.value)}
                    className="w-full p-2 bg-gray-50 border border-gray-200 rounded-md text-sm font-bengali"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600">Date</label>
                  <input
                    type="text"
                    value={editorData.date || ''}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className="w-full p-2 bg-gray-50 border border-gray-200 rounded-md text-sm font-bengali"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-semibold text-gray-600">Footer / Source</label>
                  <input
                    type="text"
                    value={editorData.footer || ''}
                    onChange={(e) => handleInputChange('footer', e.target.value)}
                    className="w-full p-2 bg-gray-50 border border-gray-200 rounded-md text-sm font-bengali"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Conditional Inputs based on Template Type */}
          {activeTemplate.id === 'event' && (
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                <Mic size={14} /> Speakers
              </div>
              {[1, 2, 3].map(i => (
                <div key={i} className="p-3 bg-gray-50 rounded-lg border border-gray-200 space-y-2">
                  <p className="text-xs font-bold text-gray-400">Speaker {i}</p>
                  <input
                    type="text"
                    placeholder="Name"
                    value={editorData[`speaker${i}Name`] || ''}
                    onChange={(e) => handleInputChange(`speaker${i}Name`, e.target.value)}
                    className="w-full p-2 bg-white border border-gray-200 rounded text-sm font-bengali"
                  />
                  <input
                    type="text"
                    placeholder="Role"
                    value={editorData[`speaker${i}Role`] || ''}
                    onChange={(e) => handleInputChange(`speaker${i}Role`, e.target.value)}
                    className="w-full p-2 bg-white border border-gray-200 rounded text-xs font-bengali"
                  />
                  <div className="flex items-center gap-2">
                    <label className="flex-1 cursor-pointer bg-white border border-dashed border-gray-300 p-2 rounded text-xs text-center text-gray-500 hover:text-[#B31D31] hover:border-[#B31D31] transition-colors">
                      Upload Photo
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(`speaker${i}Img`, e)} />
                    </label>
                    {editorData[`speaker${i}Img`] && <div className="text-green-600"><CheckCircle size={14} /></div>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTemplate.id === 'info' && (
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                <Activity size={14} /> Statistics
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input type="text" placeholder="Value 1" value={editorData.stat1Value} onChange={(e) => handleInputChange('stat1Value', e.target.value)} className="p-2 border rounded text-sm font-bengali" />
                <input type="text" placeholder="Label 1" value={editorData.stat1Label} onChange={(e) => handleInputChange('stat1Label', e.target.value)} className="p-2 border rounded text-sm font-bengali" />
                <input type="text" placeholder="Value 2" value={editorData.stat2Value} onChange={(e) => handleInputChange('stat2Value', e.target.value)} className="p-2 border rounded text-sm font-bengali" />
                <input type="text" placeholder="Label 2" value={editorData.stat2Label} onChange={(e) => handleInputChange('stat2Label', e.target.value)} className="p-2 border rounded text-sm font-bengali" />
              </div>
            </div>
          )}

          {/* Logo Section */}
          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
              <ImageIcon size={14} /> Brand Assets
            </div>

            {/* Quote Card Specific: Main Portrait */}
            {activeTemplate.id === 'quote' && (
              <div className="mb-4 p-3 bg-gray-50 rounded border border-gray-200">
                <p className="text-xs font-bold text-gray-500 mb-2">Author Portrait</p>
                <div className="flex items-center gap-2">
                  <label className="flex-1 cursor-pointer bg-white border border-dashed border-gray-300 px-3 py-2 rounded text-xs text-center hover:bg-gray-50">
                    Upload Portrait
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload('mainImage', e)} />
                  </label>
                  <select
                    value={editorData.imageStyle || 'grayscale'}
                    onChange={(e) => handleInputChange('imageStyle', e.target.value)}
                    className="text-xs p-2 border rounded bg-white"
                  >
                    <option value="none">Original</option>
                    <option value="grayscale">B&W</option>
                    <option value="sepia">Sepia</option>
                  </select>
                </div>
              </div>
            )}

            <div className="flex gap-4 items-center">
              <img src={editorData.logo} className="h-10 w-auto object-contain border p-1 rounded bg-white" alt="Current Logo" />
              <label className="cursor-pointer bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-xs font-bold hover:bg-gray-50 transition-colors">
                Change Logo
                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload('logo', e)} />
              </label>
            </div>
          </div>
        </div>

        {/* Sidebar Footer: Download */}
        <div className="p-5 border-t border-gray-200 bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-20">
          <button
            onClick={() => downloadImage('canvas-area', activeTemplate.id)}
            className="w-full py-4 bg-[#B31D31] text-white rounded-xl font-bold shadow-lg shadow-red-200 hover:bg-red-700 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <Download size={20} /> Download High-Res
          </button>
        </div>
      </div>

      {/* RIGHT: Canvas Area */}
      <div className="flex-1 bg-gray-100 relative overflow-hidden flex flex-col items-center justify-center p-8 md:p-16">
        {/* Background Dot Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#9ca3af 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

        <div className="mb-4 text-xs font-bold text-gray-400 uppercase tracking-widest bg-white px-3 py-1 rounded-full shadow-sm flex items-center gap-2">
          <span>Live Preview</span>
          {activeTemplate.id === 'quote' && <span className="text-[#B31D31]">• {editorData.theme?.toUpperCase()} Mode</span>}
        </div>

        {/* The Card Itself */}
        <div
          id="canvas-area"
          className="relative shadow-2xl transition-all duration-300 ease-out bg-white"
          style={{
            width: '540px', // Display scale (50% of 1080)
            height: '675px', // Display scale (50% of 1350)
            transform: 'scale(1)',
          }}
        >
          <activeTemplate.component data={editorData} />
        </div>

        {/* Zoom Controls (Visual only for this demo) */}
        <div className="absolute bottom-8 right-8 flex gap-2 bg-white p-2 rounded-lg shadow-md">
          <button className="p-2 hover:bg-gray-100 rounded text-gray-600">-</button>
          <span className="p-2 text-xs font-bold text-gray-500">50%</span>
          <button className="p-2 hover:bg-gray-100 rounded text-gray-600">+</button>
        </div>
      </div>
    </div>
  );
}
