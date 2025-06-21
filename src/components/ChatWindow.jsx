import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ChatWindow = React.forwardRef(({ messages, loading }, ref) => {
  return (
    <div ref={ref} className='flex-grow flex flex-col space-y-4 p-6 overflow-y-auto'>
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`prose dark:prose-invert p-3 rounded-lg max-w-md text-sm ${
              msg.from === 'user'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white'
            }`}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
          </div>
        </div>
      ))}
      {loading && (
        <div className='flex justify-start'>
          <div className='p-3 rounded-lg max-w-md text-sm bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white'>
            Carregando...
          </div>
        </div>
      )}
    </div>
  );
});

export default ChatWindow;
