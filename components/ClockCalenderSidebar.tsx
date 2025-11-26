'use client';

import { useEffect, useState } from 'react';
import HijriDate from 'hijri-date/lib/safe';
import Clock from './Clock';

const banglaMonths = [
  'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
  'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
];

const arabicMonths = [
  'মুহাররম (Muharram)', 'সফর (Safar)', 'রবিউল আওয়াল (Rabi al-awwal)',
  'রবিউস সানি (Rabi al-thani)', 'জুমাদিউল আওয়াল (Jumada al-awwal)',
  'জুমাদিউস সানি (Jumada al-thani)', 'রজব (Rajab)', 'শাবান (Sha’ban)',
  'রমজান (Ramadan)', 'শাওয়াল (Shawwal)', 'যিলক্বাদা (Dhu al-Qi’dah)',
  'যিলহিজ্জাহ (Dhu al-Hijjah)'
];

// Safe Bangla number conversion
function toBanglaNumber(num?: number) {
  if (num === undefined || num === null) return '';
  const banglaDigits = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
  return num.toString().split('').map(d => banglaDigits[+d] ?? '').join('');
}

export default function ClockCalendarSidebar() {
  const [englishDate, setEnglishDate] = useState<string>('');
  const [banglaDate, setBanglaDate] = useState<string>('');
  const [hijriDate, setHijriDate] = useState<string>('');
  const [arabicMonth, setArabicMonth] = useState<string>('');

  useEffect(() => {
    if (typeof window === 'undefined') return; // SSR skip

    const updateDate = () => {
      const now = new Date();

      // Gregorian English Date
      const engDay = now.getDate();
      const engMonth = now.toLocaleString('en-US', { month: 'long' });
      const engYear = now.getFullYear();
      setEnglishDate(`${engDay} ${engMonth}, ${engYear} খ্রিস্টাব্দ`);

      // Gregorian Bangla Date
      const banglaDay = toBanglaNumber(now.getDate());
      const banglaMonth = banglaMonths[now.getMonth()];
      const banglaYear = toBanglaNumber(now.getFullYear());
      setBanglaDate(`${banglaDay} ${banglaMonth}, ${banglaYear} খ্রিস্টাব্দ`);

      // Hijri Date
      let hijriDay = '';
      let hijriMonthName = '';
      let hijriYear = '';
      try {
        const hijri = new HijriDate(now);
        hijriDay = toBanglaNumber(hijri.getDate());
        hijriMonthName = arabicMonths[hijri.getMonth()];
        hijriYear = toBanglaNumber(hijri.getFullYear());
      } catch (e) {
        hijriDay = '';
        hijriMonthName = '';
        hijriYear = '';
      }

      setHijriDate(`${hijriDay} ${hijriMonthName}, ${hijriYear} হিজরি`);
      setArabicMonth(hijriMonthName);
    };

    updateDate();
    const interval = setInterval(updateDate, 1000); // প্রতি সেকেন্ড update
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full md:w-64 p-4 bg-gray-900 text-white rounded-xl shadow-lg space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">আজকের তারিখ</h2>
        <p className="font-medium">{englishDate}</p>
        <p className="font-medium">{banglaDate}</p>
      </div>

      <div className="text-center mt-4">
        <h2 className="text-xl font-semibold mb-1">আরবি মাস</h2>
        <p className="font-medium">{arabicMonth}</p>
        <p className="font-medium">{hijriDate}</p>
      </div>

      <div className="text-center mt-4">
        <h2 className="text-xl font-semibold mb-1">ডিজিটাল ঘড়ি</h2>
        <Clock />
      </div>
    </div>
  );
}
