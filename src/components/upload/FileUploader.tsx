import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X } from 'lucide-react';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onClear: () => void;
  isProcessing?: boolean;
}

export function FileUploader({
  onFileSelect,
  selectedFile,
  onClear,
  isProcessing = false,
}: FileUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        ['.docx'],
    },
    maxFiles: 1,
    disabled: isProcessing,
  });

  if (selectedFile) {
    return (
      <div className="border-2 border-primary-300 rounded-lg p-6 bg-primary-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-primary-600" />
            <div>
              <p className="font-medium text-gray-900">{selectedFile.name}</p>
              <p className="text-sm text-gray-600">
                {(selectedFile.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>
          {!isProcessing && (
            <button
              onClick={onClear}
              className="p-2 hover:bg-primary-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
        isDragActive
          ? 'border-primary-600 bg-primary-50'
          : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
      } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <input {...getInputProps()} />
      <Upload
        className={`w-16 h-16 mx-auto mb-4 ${
          isDragActive ? 'text-primary-600' : 'text-gray-400'
        }`}
      />
      {isDragActive ? (
        <p className="text-lg text-primary-600 font-medium">
          Drop your resume here...
        </p>
      ) : (
        <>
          <p className="text-lg text-gray-900 font-medium mb-2">
            Drag and drop your resume here
          </p>
          <p className="text-gray-600 mb-4">or click to browse</p>
          <p className="text-sm text-gray-500">
            Supports PDF and DOCX files (max 10MB)
          </p>
        </>
      )}
    </div>
  );
}
