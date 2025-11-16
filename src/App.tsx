import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ResumeProvider } from './contexts/ResumeContext';
import { Landing } from './pages/Landing';
import { ChatBuilder } from './pages/ChatBuilder';
import { UploadResume } from './pages/UploadResume';
import { TemplateSelector } from './pages/TemplateSelector';
import { Enhancement } from './pages/Enhancement';
import { FinalPreview } from './pages/FinalPreview';

function App() {
  return (
    <ResumeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/chat" element={<ChatBuilder />} />
          <Route path="/upload" element={<UploadResume />} />
          <Route path="/templates" element={<TemplateSelector />} />
          <Route path="/enhance" element={<Enhancement />} />
          <Route path="/preview" element={<FinalPreview />} />
        </Routes>
      </BrowserRouter>
    </ResumeProvider>
  );
}

export default App;
