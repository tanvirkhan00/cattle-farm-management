import React, { useState } from 'react';
import { 
  Bot, Send, Sparkles, AlertTriangle, BookOpen, 
  HelpCircle, ShieldAlert, CheckCircle2, RotateCcw, 
  Database, User 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useFarm } from '../context/FarmContext';
import { processAdvisorQuery, AdvisorAnalysisResult } from '../services/advisorEngine';
import { AdvisorMessage } from '../types';

export const AiAdvisor: React.FC = () => {
  const { language } = useLanguage();
  const { cattleList, transactions, feedInventory, settings } = useFarm();

  const [inputQuery, setInputQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Pre-populated initial conversation
  const [messages, setMessages] = useState<AdvisorMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      content: language === 'bn'
        ? `আসসালামু আলাইকুম! আমি **স্মার্ট ক্যাটেল ফার্ম ইন্টেলিজেন্স অ্যাসিস্ট্যান্ট**।\n\nআমি বাংলাদেশ প্রাণিসম্পদ গবেষণা ইনস্টিটিউট (বিএলআরআই) ও প্রাণিসম্পদ অধিদপ্তরের (ডিএলএস) বৈজ্ঞানিক মানদণ্ড এবং আপনার খামারের লাইভ ডেটাবেস ব্যবহার করে পরামর্শ প্রদান করি।\n\nআপনি বাংলা বা ইংরেজিতে যেকোনো ব্যবসায়িক, খাদ্য, রোগ প্রতিরোধ বা কুরবানি পরিকল্পনা সংক্রান্ত প্রশ্ন করতে পারেন।`
        : `Welcome! I am your **Smart Cattle Farm Intelligence Assistant**.\n\nI provide advisory based on verified Bangladesh livestock references (BLRI, DLS, BAU) and your farm's active herd database.\n\nAsk me about business models, feed formulation, seasonal disease alerts, or Eid-ul-Adha fattening plans in either English or Bengali.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      dataSourcesCited: ['DLS Official Veterinary Protocol', 'BLRI Beef & Dairy Guidelines', 'Active Farm Records'],
      suggestedFollowUps: language === 'bn'
        ? [
            'আমার ৫ লাখ টাকা বাজেট। কোন ধরনের খামার শুরু করা উচিত?',
            'বর্ষাকালে আমার গরুগুলোর কী কী রোগের ঝুঁকি থাকতে পারে?',
            'আমার ২৫০ কেজি ওজনের গরুর খাবারের পরিকল্পনা কীভাবে করব?',
            'এই মাসে আমার খামারের মোট খাবারের খরচ কত?',
            'আমার ১০ শতক জমিতে কতগুলো গরু রাখা যেতে পারে?',
            'আগামী ঈদুল আজহার জন্য কখন গরু কেনা শুরু করা উচিত?'
          ]
        : [
            'I have a BDT 5 Lakh budget. Which farm model should I start?',
            'What are the main monsoon disease risks for my herd?',
            'How should I plan the daily ration for a 250 kg cattle?',
            'What is my total farm feed cost this month?',
            'How many cattle can be housed safely on 10 decimals of land?',
            'When should I start buying bulls for Eid-ul-Adha?'
          ]
    }
  ]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query) return;

    const userMsg: AdvisorMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsProcessing(true);

    // Context snapshot for the advisor
    const context = {
      cattleList,
      transactions,
      feedInventory,
      currentSeason: 'late_autumn' as const,
      farmLocation: `${settings.location.upazila}, ${settings.location.district}`,
      totalLandDecimals: settings.totalLandDecimals
    };

    // Simulate smart agent processing with immediate reliable domain reasoning
    setTimeout(() => {
      const result: AdvisorAnalysisResult = processAdvisorQuery(query, context);

      const assistantMsg: AdvisorMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        content: result.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        dataSourcesCited: result.dataSourcesCited,
        assumptionsUsed: result.assumptionsUsed,
        disclaimers: result.disclaimers,
        isFlaggedMedicalEmergency: result.isFlaggedMedicalEmergency,
        suggestedFollowUps: result.suggestedFollowUps
      };

      setMessages(prev => [...prev, assistantMsg]);
      setIsProcessing(false);
    }, 600);
  };

  const handleClearHistory = () => {
    setMessages([messages[0]]);
  };

  return (
    <div className="h-[calc(100vh-8.5rem)] flex flex-col bg-white rounded-3xl border border-stone-200 shadow-soft overflow-hidden animate-in fade-in duration-200">
      {/* Advisor Top Bar */}
      <div className="px-6 py-3.5 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-forest-800 text-emerald-300 flex items-center justify-center shadow-xs">
            <Bot size={20} />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-sm font-bold text-stone-900">
                {language === 'bn' ? 'এআই খামার বুদ্ধিমত্তা ও ব্যবসায়িক উপদেষ্টা' : 'AI Farm Intelligence & Business Advisor'}
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                Bilingual (বাংলা / English)
              </span>
            </div>
            <p className="text-[11px] text-stone-500">
              {language === 'bn' 
                ? 'ডিএলএস, বিএলআরআই এবং আপনার খামারের লাইভ ডেটা দ্বারা চালিত' 
                : 'Driven by DLS, BLRI, BAU research citations and active herd records'}
            </p>
          </div>
        </div>

        <button
          onClick={handleClearHistory}
          className="p-1.5 rounded-xl text-stone-500 hover:text-stone-800 hover:bg-stone-200/50 transition text-xs flex items-center space-x-1"
          title="Reset Chat"
        >
          <RotateCcw size={14} />
          <span className="hidden sm:inline">{language === 'bn' ? 'নতুন আলোচনা' : 'New Chat'}</span>
        </button>
      </div>

      {/* Safety Notice Banner */}
      <div className="px-6 py-2 bg-amber-50/80 border-b border-amber-200/60 text-[11px] text-amber-900 flex items-center space-x-2">
        <ShieldAlert size={14} className="text-amber-600 flex-shrink-0" />
        <span className="truncate">
          {language === 'bn'
            ? 'ক্লিনিক্যাল বা প্রেসক্রিপশন সিদ্ধান্তের জন্য সর্বদা রেজিস্টার্ড ভেটেরিনারি সার্জনের পরামর্শ নিন। এআই সরাসরি অ্যান্টিবায়োটিক নির্দেশ করে না।'
            : 'Veterinary Guardrail: AI provides educational guidance & business planning. Clinical diagnoses & prescription medicines require a registered veterinarian.'}
        </span>
      </div>

      {/* Chat Messages Log Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-stone-50/30">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'assistant' && (
              <div className="w-8 h-8 rounded-xl bg-forest-800 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-1 shadow-xs">
                <Bot size={16} />
              </div>
            )}

            <div className={`max-w-2xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-xs
              ${msg.sender === 'user' 
                ? 'bg-forest-800 text-white rounded-tr-xs' 
                : msg.isFlaggedMedicalEmergency 
                  ? 'bg-rose-50 border-2 border-rose-300 text-rose-950 rounded-tl-xs' 
                  : 'bg-white border border-stone-200/90 text-stone-800 rounded-tl-xs'}
            `}>
              {/* Message Content with Markdown Formatting */}
              <div className="whitespace-pre-line space-y-2">
                {msg.content}
              </div>

              {/* Data Sources and Disclaimers Footnote for AI replies */}
              {msg.sender === 'assistant' && msg.dataSourcesCited && (
                <div className="mt-4 pt-3 border-t border-stone-100 text-[10px] space-y-1.5 text-stone-500">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="font-bold text-stone-700 flex items-center">
                      <BookOpen size={11} className="mr-1 text-forest-700" />
                      {language === 'bn' ? 'তথ্যসূত্র (Verified Sources):' : 'Verified References:'}
                    </span>
                    {msg.dataSourcesCited.map((src, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200">
                        {src}
                      </span>
                    ))}
                  </div>

                  {msg.assumptionsUsed && msg.assumptionsUsed.length > 0 && (
                    <div className="text-stone-500 italic">
                      <span className="font-semibold text-stone-600">Assumptions: </span>
                      {msg.assumptionsUsed.join('; ')}
                    </div>
                  )}

                  <div className="text-stone-400 text-[9px] pt-1">
                    {msg.timestamp} • Smart Cattle Farm Advisory Engine v2.4
                  </div>
                </div>
              )}

              {/* Suggested Follow-up Pills */}
              {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                <div className="mt-3.5 pt-2.5 border-t border-stone-100 flex flex-wrap gap-1.5">
                  {msg.suggestedFollowUps.map((pill, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(pill)}
                      className="px-2.5 py-1 rounded-xl bg-forest-50 hover:bg-forest-100 border border-forest-200 text-forest-800 text-[11px] font-medium transition text-left"
                    >
                      💡 {pill}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-xl bg-stone-800 text-white flex items-center justify-center flex-shrink-0 mt-1">
                <User size={16} />
              </div>
            )}
          </div>
        ))}

        {isProcessing && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-xl bg-forest-800 text-emerald-400 flex items-center justify-center flex-shrink-0 animate-pulse">
              <Bot size={16} />
            </div>
            <div className="bg-white border border-stone-200 rounded-2xl p-3.5 text-xs text-stone-500 flex items-center space-x-2 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-forest-600 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-forest-600 animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-forest-600 animate-bounce [animation-delay:0.4s]" />
              <span className="pl-1">
                {language === 'bn' ? 'খামার ডেটা ও গবেষণা বিশ্লেষণ করা হচ্ছে...' : 'Analyzing live farm records & scientific references...'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-stone-200 bg-white">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={e => setInputQuery(e.target.value)}
            placeholder={
              language === 'bn'
                ? 'খামার পরিকল্পনা, পুষ্টি, রোগ বা বাজেট সম্পর্কে প্রশ্ন লিখুন...'
                : 'Ask a question in Bangla or English (e.g. 5 lakh budget plan, monsoon diseases)...'
            }
            className="flex-1 px-4 py-3 rounded-2xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-forest-600 text-xs sm:text-sm text-stone-800 bg-stone-50/50"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isProcessing}
            className="px-5 py-3 rounded-2xl bg-forest-700 hover:bg-forest-800 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm shadow-xs transition flex items-center space-x-1.5"
          >
            <span>{language === 'bn' ? 'পাঠান' : 'Send'}</span>
            <Send size={15} />
          </button>
        </form>
      </div>
    </div>
  );
};
