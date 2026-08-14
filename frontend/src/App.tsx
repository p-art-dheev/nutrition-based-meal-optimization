import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { Modal } from './components/Modal';
import { FileUpload } from './components/FileUpload';
import { Analysis } from './components/Analysis';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [view, setView] = useState<'landing' | 'analysis'>('landing');

  const handleOpenModal = () => setIsModalOpen(true);
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleContinueToAnalysis = () => {
    setIsModalOpen(false);
    setView('analysis');
  };

  return (
    <div className="app-container">
      <Navbar onGetStartedClick={view === 'landing' ? handleOpenModal : () => setView('landing')} />
      
      {view === 'landing' ? (
        <>
          <HeroSection onLoadDatasetClick={handleOpenModal} />
          <FeaturesSection />

          <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <FileUpload onClose={handleCloseModal} onContinue={handleContinueToAnalysis} />
          </Modal>
        </>
      ) : (
        <div style={{ padding: '20px 20px', minHeight: 'calc(100vh - 80px)' }}>
          <Analysis />
        </div>
      )}
    </div>
  );
}

export default App;
