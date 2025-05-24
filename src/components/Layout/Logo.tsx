import React from 'react';
import { Shield } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-10 h-10 bg-blue-900 text-white rounded-md">
      <Shield size={24} strokeWidth={2.5} />
    </div>
  );
};

export default Logo;