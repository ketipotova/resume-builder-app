import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { ChatInterface } from '../components/chat/ChatInterface';
import { Button } from '../components/common/Button';
import { useResume } from '../contexts/ResumeContext';
import { streamChatResumeBuilder } from '../lib/claude-api';
import { normalizeResumeData } from '../utils/resume-helpers';

export function ChatBuilder() {
  const navigate = useNavigate();
  const { setResume, conversationHistory, setConversationHistory } = useResume();
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Send initial greeting if conversation is empty
    if (conversationHistory.length === 0) {
      setConversationHistory([
        {
          role: 'assistant',
          content:
            "Hello! I'll help you create a professional resume. Let's begin with your basic information. What's your full name, email, phone number, and current location?",
        },
      ]);
    }
  }, []);

  const handleSendMessage = async (message: string) => {
    // Add user message to history
    const newHistory = [
      ...conversationHistory,
      { role: 'user' as const, content: message },
    ];
    setConversationHistory(newHistory);

    setIsLoading(true);

    try {
      // Stream AI response
      let fullResponse = '';
      await streamChatResumeBuilder(
        message,
        conversationHistory,
        (chunk) => {
          fullResponse += chunk;
          // Update the conversation with streaming response
          setConversationHistory([
            ...newHistory,
            { role: 'assistant', content: fullResponse },
          ]);
        }
      );

      // Check if response contains JSON (indicating completion)
      // Look for JSON code blocks or JSON objects with resume structure
      const jsonCodeBlockMatch = fullResponse.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
      const jsonMatch = jsonCodeBlockMatch || fullResponse.match(/(\{[\s\S]*"personalInfo"[\s\S]*\})/);

      if (jsonMatch) {
        try {
          const jsonStr = jsonCodeBlockMatch ? jsonCodeBlockMatch[1] : jsonMatch[0];
          const resumeData = JSON.parse(jsonStr);

          // Validate it's actually a resume object
          if (resumeData.personalInfo) {
            // Normalize the data to handle AI mistakes/legacy formats
            const normalizedResume = normalizeResumeData(resumeData);
            console.log('Normalized resume data:', normalizedResume);
            setResume(normalizedResume);
            setIsComplete(true);
          }
        } catch (error) {
          console.error('Failed to parse resume JSON:', error);
          // Silently fail - it's just not ready yet
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setConversationHistory([
        ...newHistory,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>

            {isComplete && (
              <Button
                onClick={() => navigate('/templates')}
                className="flex items-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Continue to Templates
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Build Your Resume
            </h1>
            <p className="text-gray-600">
              Have a conversation with AI to create your professional resume
            </p>
          </div>

          <div style={{ height: 'calc(100vh - 300px)' }}>
            <ChatInterface
              messages={conversationHistory}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
              disabled={isLoading}
            />
          </div>

          {isComplete && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-green-900">
                    Resume Data Collected!
                  </h3>
                  <p className="text-sm text-green-700">
                    Your resume information has been extracted. Click "Continue to Templates" to choose a design.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
