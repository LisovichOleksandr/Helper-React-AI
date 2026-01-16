import React, { useState } from 'react'
import './App.css'
import Chat from './components/chat/Chat.component';
import ImageGenerator from './components/imageGenerator/ImageGenerator.component';

function App() {
  const [activeTab, setActiveTab] = useState('image-generator');

  const handleTabChange = (tab) => {
    setActiveTab(tab);  
  
  }
    return (
    <div className='app-wrapper'> 
      <header className='header'>
        <button className={activeTab === 'image-generator' ? 'active' : ''}
          onClick={() => handleTabChange('image-generator')}>
          Image Generator
          </button>
        <button className={activeTab === 'chat' ? 'active' : ''}
          onClick={() => handleTabChange('chat')}>
          Chat
          </button>
        <button className={activeTab === 'recipe-generator' ? 'active' : ''}
          onClick={() => handleTabChange('recipe-generator')}>
          Recipe Generator
          </button>
      </header>

      <main className="main">
        {activeTab === 'image-generator' && <ImageGenerator/>}
        {activeTab === 'chat' && <Chat/>}
        {activeTab === 'recipe-generator' && <p>Recipe Generator Content</p>}
      </main>

      <footer className="footer">
        © 2026 AI Helper App
      </footer>
    </div>
  )
}

export default App
