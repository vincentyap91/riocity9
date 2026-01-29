import React, { useState, useRef, useEffect } from 'react';
import { Paperclip, Mic, MessageCircle, XCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { sanitizeTextInput } from '../utils/security';

type MessageStatus = 'success' | 'failed';

interface ChatMessage {
  id: string;
  sender: 'System';
  timestamp: string;
  dateLabel: string;
  body: string;
  status: MessageStatus;
}

const SUGGESTED_MESSAGES = [
  "I'm New Here",
  "Forgot Username/Password",
  "Account Verification Issue",
  "怎样充值",
  "Hi",
];

const MOCK_MESSAGES: ChatMessage[] = [
  { id: '1', sender: 'System', timestamp: '11 Dec 2025, 09:56', dateLabel: '11/12/2025', body: 'Your deposit of 1.00 (4658) was successful.', status: 'success' },
  { id: '2', sender: 'System', timestamp: '15 Dec 2025, 10:22', dateLabel: '15/12/2025', body: 'Sorry, your deposit of 10000.00 (4703) failed. Please try again later.', status: 'failed' },
  { id: '3', sender: 'System', timestamp: '22 Dec 2025, 14:30', dateLabel: '22/12/2025', body: 'Your 123123123 deposit of 100.00 (4762) was successful.', status: 'success' },
];

function DateSeparator({ label }: { label: string }) {
  return (
    <div className="flex justify-center my-4">
      <span className="px-4 py-1.5 rounded-lg bg-[#16202c] border border-white/10 text-white/90 text-xs font-medium">
        {label}
      </span>
    </div>
  );
}

function MessageBubble({ msg }: { msg: ChatMessage }) {
  return (
    <div className="flex gap-3 items-start w-full max-w-[85%]">
      <div className="w-10 h-10 rounded-full bg-[#1a2536] border border-white/10 flex items-center justify-center shrink-0 overflow-hidden">
        <MessageCircle className="w-5 h-5 text-emerald-500/80" />
      </div>
      <div className="flex-1 min-w-0 rounded-2xl rounded-tl-md bg-[#16202c] border border-white/10 px-4 py-3">
        <div className="flex items-center gap-2 text-xs text-white/70 mb-1">
          <span className="font-semibold text-white/90">{msg.sender}</span>
          <span>{msg.timestamp}</span>
        </div>
        <p className="text-sm text-white/95 leading-relaxed">{msg.body}</p>
        <div className="mt-2 flex justify-end">
          {msg.status === 'success' ? (
            <span className="text-amber-400" title="Success">💰</span>
          ) : (
            <XCircle className="w-4 h-4 text-red-400 shrink-0" aria-label="Failed" />
          )}
        </div>
      </div>
    </div>
  );
}

export function LiveChat() {
  const { t } = useLanguage();
  const [message, setMessage] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, []);

  const groupedByDate = React.useMemo(() => {
    const groups: { dateLabel: string; messages: ChatMessage[] }[] = [];
    let currentLabel = '';
    for (const msg of MOCK_MESSAGES) {
      if (msg.dateLabel !== currentLabel) {
        currentLabel = msg.dateLabel;
        groups.push({ dateLabel: currentLabel, messages: [msg] });
      } else {
        groups[groups.length - 1].messages.push(msg);
      }
    }
    return groups;
  }, []);

  return (
    <div className="flex flex-col flex-1 bg-[#02040a] min-h-screen overflow-x-hidden">
      <div className="container mx-auto max-w-[800px] px-4 py-6 pb-24 flex flex-col flex-1">
        <h1 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <MessageCircle className="w-7 h-7 text-emerald-500" />
          {t('liveChat')}
        </h1>

        <div className="flex-1 flex flex-col rounded-2xl bg-[#0f1923] border border-white/10 overflow-hidden min-h-[400px]">
          {/* Message list */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
            {groupedByDate.map((group) => (
              <React.Fragment key={group.dateLabel}>
                <DateSeparator label={group.dateLabel} />
                {group.messages.map((msg) => (
                  <MessageBubble key={msg.id} msg={msg} />
                ))}
              </React.Fragment>
            ))}
          </div>

          {/* Suggested Messages */}
          <div className="px-4 py-3 border-t border-white/10 bg-[#0f1923]">
            <p className="text-xs font-bold text-[#d4a520] mb-2 uppercase tracking-wide">
              Suggested Messages
            </p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_MESSAGES.map((text, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setMessage(sanitizeTextInput(text).slice(0, 500))}
                  className="px-3 py-2 bg-[#1a2536] border border-white/10 text-white/90 text-sm rounded-xl hover:bg-[#16202c] hover:border-emerald-500/30 transition-colors"
                >
                  {text}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10 bg-[#0f1923] flex items-center gap-3">
            <button
              type="button"
              className="p-2 rounded-lg bg-[#1a2536] border border-white/10 text-white/70 hover:text-white hover:bg-[#16202c] transition-colors"
              aria-label="Attach file"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(sanitizeTextInput(e.target.value).slice(0, 500))}
              maxLength={500}
              placeholder="Type a message"
              className="flex-1 h-12 bg-[#1a2536] border border-white/10 rounded-xl px-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00bc7d]/50 transition-colors"
            />
            <button
              type="button"
              className="p-2 rounded-lg bg-[#1a2536] border border-white/10 text-white/70 hover:text-white hover:bg-[#16202c] transition-colors"
              aria-label="Voice input"
            >
              <Mic className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
