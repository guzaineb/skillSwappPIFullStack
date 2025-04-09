import React from 'react';
import {
  CheckCircleIcon,
  PauseIcon,
  ClockIcon,
  LightBulbIcon,
  CogIcon,
  SparklesIcon,
  BoltIcon // Remplace RocketIcon qui n'existe pas
} from '@heroicons/react/24/solid';

const StatusBadge = ({ status, level }) => {
  // Mapping des statuts
  const statusMap = {
    active: {
      icon: <CheckCircleIcon className="w-5 h-5 text-green-600" />,
      textColor: "text-green-600",
    },
    inactive: {
      icon: <PauseIcon className="w-5 h-5 text-gray-600" />,
      textColor: "text-gray-600",
    },
    pending: {
      icon: <ClockIcon className="w-5 h-5 text-yellow-600" />,
      textColor: "text-yellow-600",
    },
  };

  // Mapping des niveaux
  const levelMap = {
    beginner: {
      icon: <LightBulbIcon className="w-5 h-5 text-yellow-400" />,
      textColor: "text-yellow-400",
    },
    intermediate: {
      icon: <CogIcon className="w-5 h-5 text-blue-500" />,
      textColor: "text-blue-500",
    },
    advanced: {
      icon: <BoltIcon className="w-5 h-5 text-purple-600" />,
      textColor: "text-purple-600",
    },
  };

  // Récupération des données du statut et du niveau
  const { icon: statusIcon, textColor: statusTextColor } = statusMap[status] || {
    icon: <ClockIcon className="w-5 h-5 text-gray-600" />,
    textColor: "text-gray-600",
  };

  const { icon: levelIcon, textColor: levelTextColor } = levelMap[level] || {
    icon: <LightBulbIcon className="w-5 h-5 text-gray-400" />,
    textColor: "text-gray-400",
  };

  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center space-x-2">
        {statusIcon}
        <span className={`text-sm font-medium ${statusTextColor}`}>{status}</span>
      </div>
      <div className="flex items-center space-x-2">
        {levelIcon}
        <span className={`text-sm font-medium ${levelTextColor}`}>{level}</span>
      </div>
    </div>
  );
};

export default StatusBadge;
