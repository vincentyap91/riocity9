import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export type CountryCode = {
  code: string;
  dialCode: string;
  name: string;
  flagUrl: string;
};

const SUPPORTED_COUNTRIES: CountryCode[] = [
  {
    code: 'MY',
    dialCode: '+60',
    name: 'Malaysia',
    flagUrl: 'https://flagcdn.com/w160/my.png', // 160px width for high resolution (2x for retina displays)
  },
  {
    code: 'AU',
    dialCode: '+61',
    name: 'Australia',
    flagUrl: 'https://flagcdn.com/w160/au.png',
  },
  {
    code: 'PH',
    dialCode: '+63',
    name: 'Philippines',
    flagUrl: 'https://flagcdn.com/w160/ph.png',
  },
];

interface CountryCodeSelectorProps {
  value: string; // dialCode like '+60'
  onChange: (dialCode: string) => void;
  disabled?: boolean;
  error?: boolean;
  className?: string;
}

export function CountryCodeSelector({
  value,
  onChange,
  disabled = false,
  error = false,
  className = '',
}: CountryCodeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedCountry = SUPPORTED_COUNTRIES.find(
    (country) => country.dialCode === value
  ) || SUPPORTED_COUNTRIES[0]; // Default to Malaysia

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (country: CountryCode) => {
    onChange(country.dialCode);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Selected Country Button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          h-11 bg-[#0f151f] rounded-xl flex items-center gap-2 px-3 min-w-[110px] sm:min-w-[120px]
          text-gray-300 font-medium transition-all
          ${error ? 'border-red-500 border-2' : 'border border-white/10'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-white/5'}
        `}
      >
        <img
          src={selectedCountry.flagUrl}
          alt={selectedCountry.name}
          className="w-6 h-4 object-cover rounded-sm shrink-0"
          loading="lazy"
        />
        <span className="text-sm font-bold text-white whitespace-nowrap">{selectedCountry.dialCode}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-50 w-[200px] sm:w-[220px] bg-[#1a2230] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="py-2">
            {SUPPORTED_COUNTRIES.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => handleSelect(country)}
                className={`
                  w-full px-4 py-3 flex items-center gap-3 text-left transition-all
                  ${
                    selectedCountry.dialCode === country.dialCode
                      ? 'bg-[#00bc7d]/10 text-[#00bc7d]'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }
                `}
              >
                <img
                  src={country.flagUrl}
                  alt={country.name}
                  className="w-6 h-4 object-cover rounded-sm shrink-0"
                  loading="lazy"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold truncate">{country.dialCode}</div>
                  <div className="text-xs text-gray-400 truncate">{country.name}</div>
                </div>
                {selectedCountry.dialCode === country.dialCode && (
                  <div className="w-2 h-2 rounded-full bg-[#00bc7d] shrink-0"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
