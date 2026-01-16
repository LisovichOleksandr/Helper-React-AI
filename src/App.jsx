import React, { useState } from 'react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('image-generator');

  const handleTabChange = (tab) => {
    setActiveTab(tab);  
  
  }
    return (
    <div className='app-wrapper'> 
      <header className='header'>
        <button onClick={() => handleTabChange('image-generator')}>Image Generator</button>
        <button onClick={() => handleTabChange('chat')}>Chat</button>
        <button onClick={() => handleTabChange('recipe-generator')}>Recipe Generator</button>
      </header>

      <main className="main">
        {activeTab === 'image-generator' && <p>Image Generator Content</p>}
        {activeTab === 'chat' && <p>Chat Content</p>}
        {activeTab === 'recipe-generator' && <p>Recipe Generator Content</p>}
      </main>

      <footer className="footer">
        © 2026 AI Helper App
      </footer>
    </div>
  )
}

export default App
