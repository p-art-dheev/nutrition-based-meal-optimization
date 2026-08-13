import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { Modal } from './components/Modal';
import { FileUpload } from './components/FileUpload';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="app-container">
      <Navbar />
      <HeroSection onLoadDatasetClick={handleOpenModal} />
      <FeaturesSection />

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <FileUpload onClose={handleCloseModal} />
      </Modal>
    </div>
  );
}

export default App;
