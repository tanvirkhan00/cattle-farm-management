import React, { useState } from 'react';
import { 
  BookOpen, Search, Filter, ShieldCheck, 
  ExternalLink, FileText, CheckCircle2, Download, 
  Plus, Upload, X 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { KNOWLEDGE_DATABASE } from '../data/knowledgeData';
import { KnowledgeDocument } from '../types';

export const KnowledgeCenter: React.FC = () => {
  const { language } = useLanguage();
  const [documents, setDocuments] = useState<KnowledgeDocument[]>(KNOWLEDGE_DATABASE);
  const [searchTerm, setSearchTerm] = useState('');
  const [topicFilter, setTopicFilter] = useState<string>('all');
  const [publisherFilter, setPublisherFilter] = useState<string>('all');
  const [selectedDoc, setSelectedDoc] = useState<KnowledgeDocument | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // New Document state
  const [docTitleBn, setDocTitleBn] = useState('');
  const [docTitleEn, setDocTitleEn] = useState('');
  const [docPublisher, setDocPublisher] = useState<'DLS' | 'BLRI' | 'BAU' | 'DAE' | 'FAO'>('DLS');
  const [docTopic, setDocTopic] = useState<'veterinary' | 'nutrition' | 'breeding' | 'housing'>('veterinary');
  const [docSummaryBn, setDocSummaryBn] = useState('');
  const [docUrl, setDocUrl] = useState('');

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = 
      doc.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.titleBn.includes(searchTerm) ||
      doc.summaryBn.includes(searchTerm);
    const matchesTopic = topicFilter === 'all' || doc.topic === topicFilter;
    const matchesPub = publisherFilter === 'all' || doc.publisherOrganization === publisherFilter;
    return matchesSearch && matchesTopic && matchesPub;
  });

  const handleCreateDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitleBn && !docTitleEn) return;

    const newDoc: KnowledgeDocument = {
      id: `knd-${Date.now()}`,
      titleEn: docTitleEn || docTitleBn,
      titleBn: docTitleBn || docTitleEn,
      publisherOrganization: docPublisher,
      publicationYear: 2026,
      sourceUrl: docUrl || 'https://dls.gov.bd',
      topic: docTopic,
      geographicRelevance: 'Bangladesh Nationwide',
      summaryBn: docSummaryBn || 'সরকারি সম্প্রসারণ ও গবেষণা প্রকাশনা।',
      summaryEn: 'Official government publication and technical directive.',
      keyRecommendations: ['Follow verified storage and feeding guidelines'],
      isVerified: true,
      lastVerifiedDate: new Date().toISOString().split('T')[0]
    };

    setDocuments([newDoc, ...documents]);
    setIsUploading(false);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-forest-50 border border-forest-200 text-xs font-semibold text-forest-800 mb-2">
            <BookOpen size={14} />
            <span>{language === 'bn' ? 'যাচাইকৃত সরকারি গবেষণা ও নির্দেশিকা' : 'Official Verified Research Library'}</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-stone-900 tracking-tight">
            {language === 'bn' ? 'নলেজ সেন্টার ও গবেষণা ভাণ্ডার (DLS, BLRI, BAU)' : 'Knowledge Center & Trusted Sources'}
          </h2>
          <p className="text-xs md:text-sm text-stone-600 mt-1 max-w-2xl">
            {language === 'bn'
              ? 'প্রাণিসম্পদ অধিদপ্তর (DLS), বাংলাদেশ প্রাণিসম্পদ গবেষণা ইনস্টিটিউট (BLRI), বাকৃবি (BAU) ও FAO-এর আনুষ্ঠানিক প্রযুক্তি প্রকাশনা।'
              : 'Repository of verified agricultural policy manuals, clinical vaccination circulars, and feed technology bulletins.'}
          </p>
        </div>

        <button
          onClick={() => setIsUploading(true)}
          className="px-5 py-2.5 rounded-2xl bg-forest-700 hover:bg-forest-800 text-white font-bold text-xs shadow-xs transition flex items-center space-x-2"
        >
          <Upload size={16} />
          <span>{language === 'bn' ? 'নতুন দলিল/পিডিএফ যুক্ত করুন' : 'Upload Publication'}</span>
        </button>
      </div>

      {/* Publisher Trust Badges Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3.5 rounded-2xl bg-white border border-stone-200 shadow-soft flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-forest-50 text-forest-800 font-black flex items-center justify-center flex-shrink-0">
            DLS
          </div>
          <div>
            <h4 className="font-bold text-stone-900 text-xs">প্রাণিসম্পদ অধিদপ্তর</h4>
            <p className="text-[10px] text-stone-400">Department of Livestock Services</p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-stone-200 shadow-soft flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 font-black flex items-center justify-center flex-shrink-0">
            BLRI
          </div>
          <div>
            <h4 className="font-bold text-stone-900 text-xs">প্রাণিসম্পদ গবেষণা</h4>
            <p className="text-[10px] text-stone-400">Bangladesh Livestock Research Inst.</p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-stone-200 shadow-soft flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-800 font-black flex items-center justify-center flex-shrink-0">
            BAU
          </div>
          <div>
            <h4 className="font-bold text-stone-900 text-xs">বাংলাদেশ কৃষি বিশ্ববিদ্যালয়</h4>
            <p className="text-[10px] text-stone-400">Faculty of Veterinary Science</p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-stone-200 shadow-soft flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 font-black flex items-center justify-center flex-shrink-0">
            FAO
          </div>
          <div>
            <h4 className="font-bold text-stone-900 text-xs">জাতিসংঘ খাদ্য ও কৃষি সংস্থা</h4>
            <p className="text-[10px] text-stone-400">UN Food & Agriculture Org</p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-soft flex flex-col sm:flex-row gap-3 items-center justify-between text-xs">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-3 text-stone-400" />
          <input
            type="text"
            placeholder={language === 'bn' ? 'গবেষণা বা নির্দেশিকার বিষয় খুঁজুন...' : 'Search manual title or topic...'}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-forest-500 bg-stone-50/50"
          />
        </div>

        <div className="flex space-x-2 overflow-x-auto w-full sm:w-auto">
          <select
            value={topicFilter}
            onChange={e => setTopicFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-stone-200 bg-stone-50 font-medium"
          >
            <option value="all">{language === 'bn' ? 'সকল বিষয়' : 'All Topics'}</option>
            <option value="veterinary">{language === 'bn' ? 'চিকিৎসা ও টিকা' : 'Veterinary'}</option>
            <option value="nutrition">{language === 'bn' ? 'ঘাস ও পুষ্টি' : 'Nutrition'}</option>
            <option value="housing">{language === 'bn' ? 'শেড নির্মাণ' : 'Housing'}</option>
            <option value="business_feasibility">{language === 'bn' ? 'ব্যবসায়িক মডেল' : 'Business Feasibility'}</option>
          </select>

          <select
            value={publisherFilter}
            onChange={e => setPublisherFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-stone-200 bg-stone-50 font-medium"
          >
            <option value="all">{language === 'bn' ? 'সকল প্রকাশক' : 'All Publishers'}</option>
            <option value="DLS">DLS</option>
            <option value="BLRI">BLRI</option>
            <option value="BAU">BAU</option>
            <option value="FAO">FAO</option>
          </select>
        </div>
      </div>

      {/* Documents List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredDocs.map(doc => (
          <div
            key={doc.id}
            className="bg-white rounded-3xl border border-stone-200 p-6 shadow-soft space-y-4 hover:shadow-card transition flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <span className="px-2.5 py-0.5 rounded-full font-black text-[10px] bg-forest-100 text-forest-800 border border-forest-200">
                  {doc.publisherOrganization} • {doc.publicationYear}
                </span>

                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center space-x-1">
                  <ShieldCheck size={12} />
                  <span>Verified</span>
                </span>
              </div>

              <div>
                <h3 className="font-bold text-stone-900 text-sm leading-snug">
                  {language === 'bn' ? doc.titleBn : doc.titleEn}
                </h3>
                <p className="text-[11px] text-stone-400 mt-0.5">
                  Relevance: {doc.geographicRelevance}
                </p>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                {language === 'bn' ? doc.summaryBn : doc.summaryEn}
              </p>

              {/* Key Recommendations */}
              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 space-y-1 text-xs">
                <span className="font-bold text-stone-800 block text-[11px]">
                  {language === 'bn' ? 'মূল প্রযুক্তিগত নির্দেশনা:' : 'Core Technical Directives:'}
                </span>
                <ul className="space-y-1 pl-4 list-disc text-stone-600 text-[11px]">
                  {doc.keyRecommendations.map((rec, i) => (
                    <li key={i}>{rec}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-[10px] text-stone-400">Verified: {doc.lastVerifiedDate}</span>
              {doc.sourceUrl && (
                <a
                  href={doc.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-forest-700 hover:text-forest-900 flex items-center space-x-1"
                >
                  <span>{language === 'bn' ? 'সরকারি সার্কুলার লিংক' : 'Official Publication Link'}</span>
                  <ExternalLink size={13} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Upload Document Modal */}
      {isUploading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl border border-stone-200 w-full max-w-md p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-bold text-stone-900 text-sm">
                {language === 'bn' ? 'নতুন গবেষণা সার্কুলার সংরক্ষণ' : 'Upload Research Document'}
              </h3>
              <button onClick={() => setIsUploading(false)} className="text-stone-400 hover:text-stone-700">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateDocument} className="space-y-3">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">{language === 'bn' ? 'প্রকাশনার শিরোনাম (বাংলা)' : 'Title (Bengali)'}</label>
                <input
                  type="text"
                  placeholder="e.g. জাতীয় ক্ষুরারোগ টিকাদান প্রটোকল"
                  value={docTitleBn}
                  onChange={e => setDocTitleBn(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">{language === 'bn' ? 'শিরোনাম (English)' : 'Title (English)'}</label>
                <input
                  type="text"
                  placeholder="e.g. National FMD Immunization Protocol"
                  value={docTitleEn}
                  onChange={e => setDocTitleEn(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">{language === 'bn' ? 'সংস্থা' : 'Publisher'}</label>
                  <select
                    value={docPublisher}
                    onChange={e => setDocPublisher(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 font-bold"
                  >
                    <option value="DLS">DLS (প্রাণিসম্পদ অধিদপ্তর)</option>
                    <option value="BLRI">BLRI (গবেষণা ইনস্টিটিউট)</option>
                    <option value="BAU">BAU (বাকৃবি)</option>
                    <option value="FAO">FAO (জাতিসংঘ)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">{language === 'bn' ? 'বিষয়' : 'Topic'}</label>
                  <select
                    value={docTopic}
                    onChange={e => setDocTopic(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300"
                  >
                    <option value="veterinary">Veterinary (চিকিৎসা)</option>
                    <option value="nutrition">Nutrition (পুষ্টি)</option>
                    <option value="housing">Housing (শেড)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">{language === 'bn' ? 'অনলাইন সোর্স লিংক (URL)' : 'Official Source URL'}</label>
                <input
                  type="url"
                  placeholder="https://dls.gov.bd/bulletin..."
                  value={docUrl}
                  onChange={e => setDocUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">{language === 'bn' ? 'সংক্ষিপ্ত সারসংক্ষেপ' : 'Summary'}</label>
                <textarea
                  rows={2}
                  placeholder="সরকারি নির্দেশনা ও প্রযুক্তি সারসংক্ষেপ..."
                  value={docSummaryBn}
                  onChange={e => setDocSummaryBn(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsUploading(false)}
                  className="px-4 py-2 rounded-xl border border-stone-300"
                >
                  {language === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-forest-700 text-white font-semibold"
                >
                  {language === 'bn' ? 'সংরক্ষণ' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
