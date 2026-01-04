import { useState, useEffect } from 'react';
import { HomePage } from './components/HomePage';
import { CategoryPage } from './components/CategoryPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { UserDashboard } from './components/UserDashboard';
import { PostAdFlow } from './components/PostAdFlow';
import { ChatPage } from './components/ChatPage';
import { Header } from './components/Header';
import { LoginModal } from './components/LoginModal';
import { mockListings, mockUsers, mockMessages } from './data/mockData';
import type { Listing, User, Message, Language } from './types';

type Page = 
  | { type: 'home' }
  | { type: 'category'; categoryId: string }
  | { type: 'product'; productId: string }
  | { type: 'dashboard' }
  | { type: 'post-ad' }
  | { type: 'chat'; chatId?: string };

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>({ type: 'home' });
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [language, setLanguage] = useState<Language>('uz');
  const [listings, setListings] = useState<Listing[]>(mockListings);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>(mockMessages);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage({ type: 'home' });
  };

  const toggleFavorite = (listingId: string) => {
    setFavorites(prev => 
      prev.includes(listingId) 
        ? prev.filter(id => id !== listingId)
        : [...prev, listingId]
    );
  };

  const handlePostAd = (newListing: Omit<Listing, 'id' | 'postedAt' | 'views'>) => {
    const listing: Listing = {
      ...newListing,
      id: `listing-${Date.now()}`,
      postedAt: new Date().toISOString(),
      views: 0,
    };
    setListings(prev => [listing, ...prev]);
    setCurrentPage({ type: 'home' });
  };

  const handleSendMessage = (listingId: string, text: string) => {
    if (!currentUser) return;
    
    const listing = listings.find(l => l.id === listingId);
    if (!listing) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      chatId: `chat-${currentUser.id}-${listing.sellerId}`,
      senderId: currentUser.id,
      receiverId: listing.sellerId,
      text,
      timestamp: new Date().toISOString(),
      read: false,
      listingId,
    };
    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentUser={currentUser}
        language={language}
        onLanguageChange={setLanguage}
        onLoginClick={() => setShowLoginModal(true)}
        onLogoutClick={handleLogout}
        onNavigate={setCurrentPage}
      />
      
      <main>
        {currentPage.type === 'home' && (
          <HomePage 
            language={language}
            listings={listings}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onNavigate={setCurrentPage}
          />
        )}
        
        {currentPage.type === 'category' && (
          <CategoryPage 
            categoryId={currentPage.categoryId}
            language={language}
            listings={listings}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onNavigate={setCurrentPage}
          />
        )}
        
        {currentPage.type === 'product' && (
          <ProductDetailPage 
            productId={currentPage.productId}
            language={language}
            listings={listings}
            currentUser={currentUser}
            isFavorite={favorites.includes(currentPage.productId)}
            onToggleFavorite={toggleFavorite}
            onNavigate={setCurrentPage}
            onLoginRequired={() => setShowLoginModal(true)}
            onSendMessage={handleSendMessage}
          />
        )}
        
        {currentPage.type === 'dashboard' && currentUser && (
          <UserDashboard 
            user={currentUser}
            language={language}
            listings={listings}
            favorites={favorites}
            messages={messages}
            onNavigate={setCurrentPage}
            onToggleFavorite={toggleFavorite}
          />
        )}
        
        {currentPage.type === 'post-ad' && (
          <PostAdFlow 
            language={language}
            currentUser={currentUser}
            onPostAd={handlePostAd}
            onNavigate={setCurrentPage}
            onLoginRequired={() => setShowLoginModal(true)}
          />
        )}
        
        {currentPage.type === 'chat' && currentUser && (
          <ChatPage 
            language={language}
            currentUser={currentUser}
            messages={messages}
            listings={listings}
            chatId={currentPage.chatId}
            onNavigate={setCurrentPage}
          />
        )}
      </main>

      {showLoginModal && (
        <LoginModal 
          language={language}
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
        />
      )}
    </div>
  );
}
