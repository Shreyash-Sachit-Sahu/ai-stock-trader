// components/ErrorNotification.tsx
import React from 'react';

interface ErrorNotificationProps {
  message: string;
}

const ErrorNotification: React.FC<ErrorNotificationProps> = ({ message }) => {
  return (
    <div className="bg-red-500 text-white p-4 rounded mb-4">
      <strong>Error:</strong> {message}
    </div>
  );
};

export default ErrorNotification;