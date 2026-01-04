import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import type { Language, User, Message, Listing } from '../types';
import { mockUsers } from '../data/mockData';

interface ChatPageProps {
  language: Language;
  currentUser: User;
  messages: Message[];
  listings: Listing[];
  chatId?: string;
  onNavigate: (page: any) => void;
}

const translations = {
  messages: { uz: 'Xabarlar', ru: 'Сообщения', en: 'Messages' },
  typeMessage: { uz: 'Xabar yozing...', ru: 'Напишите сообщение...', en: 'Type a message...' },
  send: { uz: 'Yuborish', ru: 'Отправить', en: 'Send' },
  noChats: { uz: 'Xabarlar yo\'q', ru: 'Нет сообщений', en: 'No messages' },
};

export function ChatPage({ language, currentUser, messages, listings, chatId, onNavigate }: ChatPageProps) {
  const [selectedChatId, setSelectedChatId] = useState(chatId || '');
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Group messages by chat
  const chats = messages.reduce((acc, msg) => {
    const id = msg.chatId;
    if (!acc[id]) {
      acc[id] = [];
    }
    acc[id].push(msg);
    return acc;
  }, {} as Record<string, Message[]>);

  // Sort chats by last message time
  const sortedChats = Object.entries(chats).sort(([, msgsA], [, msgsB]) => {
    const lastA = msgsA[msgsA.length - 1];
    const lastB = msgsB[msgsB.length - 1];
    return new Date(lastB.timestamp).getTime() - new Date(lastA.timestamp).getTime();
  });

  // Auto-select first chat if none selected
  useEffect(() => {
    if (!selectedChatId && sortedChats.length > 0) {
      setSelectedChatId(sortedChats[0][0]);
    }
  }, [sortedChats, selectedChatId]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, selectedChatId]);

  const selectedMessages = selectedChatId ? chats[selectedChatId] || [] : [];
  const otherUserId = selectedMessages[0]?.senderId === currentUser.id 
    ? selectedMessages[0]?.receiverId 
    : selectedMessages[0]?.senderId;
  const otherUser = mockUsers.find(u => u.id === otherUserId);
  const chatListing = selectedMessages[0] ? listings.find(l => l.id === selectedMessages[0].listingId) : null;

  const handleSend = () => {
    if (newMessage.trim()) {
      // In real app, send message to server
      setNewMessage('');
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6 h-full">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden h-full flex flex-col md:flex-row">
          {/* Chats List */}
          <div className="w-full md:w-80 border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => onNavigate({ type: 'dashboard' })}
                  className="p-2 hover:bg-gray-100 rounded-lg md:hidden"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <h2>{translations.messages[language]}</h2>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {sortedChats.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <p>{translations.noChats[language]}</p>
                </div>
              ) : (
                sortedChats.map(([id, msgs]) => {
                  const lastMsg = msgs[msgs.length - 1];
                  const userId = lastMsg.senderId === currentUser.id ? lastMsg.receiverId : lastMsg.senderId;
                  const user = mockUsers.find(u => u.id === userId);
                  const listing = listings.find(l => l.id === lastMsg.listingId);
                  const isUnread = !lastMsg.read && lastMsg.receiverId === currentUser.id;
                  
                  return (
                    <button
                      key={id}
                      onClick={() => setSelectedChatId(id)}
                      className={`w-full p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors text-left ${
                        selectedChatId === id ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-sm font-medium">{user?.name[0]}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium truncate">{user?.name}</p>
                            {isUnread && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                          </div>
                          <p className="text-sm text-gray-600 truncate">{lastMsg.text}</p>
                        </div>
                      </div>
                      {listing && (
                        <p className="text-xs text-gray-500 ml-13 truncate">{listing.title}</p>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Chat Content */}
          <div className="flex-1 flex flex-col">
            {selectedChatId && otherUser ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">{otherUser.name[0]}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{otherUser.name}</p>
                    {chatListing && (
                      <button
                        onClick={() => onNavigate({ type: 'product', productId: chatListing.id })}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {chatListing.title}
                      </button>
                    )}
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedMessages.map((msg) => {
                    const isOwn = msg.senderId === currentUser.id;
                    return (
                      <div key={msg.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[70%] ${isOwn ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'} rounded-2xl px-4 py-2`}>
                          <p>{msg.text}</p>
                          <p className={`text-xs mt-1 ${isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      placeholder={translations.typeMessage[language]}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={handleSend}
                      disabled={!newMessage.trim()}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <p>{translations.noChats[language]}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
