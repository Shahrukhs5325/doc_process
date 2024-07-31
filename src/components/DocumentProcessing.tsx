// DocumentProcessing.jsx
import React from 'react';
import DocumentCard from './DocumentCard';
import Sidebar from './sidebar/Sidebar';

const DocumentProcessing = () => {
  const documents = [
    { name: 'Document 1', size: 48 },
    { name: 'Document 2', size: 85 },
    { name: 'Document 3', size: 1402 },
    { name: 'Document 4', size: 162 },
    { name: 'Document 5', size: 261 },
    { name: 'Document 6', size: 253 },
    { name: 'Document 7', size: 85 },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}


      {/* Main Content */}
      <main className="flex-1 p-8 bg-white">
        <h1 className="text-2xl font-bold mb-4">Document Capture</h1>
        <p className="mb-4 text-sm text-gray-500">List of unlabeled documents uploaded as a package by borrower for underwriter processing.</p>

        <div className="grid grid-cols-3 gap-4">
          {documents.map((doc, index) => (
            <div className="flex flex-col items-center justify-center w-36 h-36 border-2 border-gray-200 rounded-lg p-4">
              {/* <DocumentIcon /> */}
              <p className="mt-2 text-sm font-medium">{doc.name}</p>
              <p className="text-xs text-gray-500">{doc.size} KB</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DocumentProcessing;
