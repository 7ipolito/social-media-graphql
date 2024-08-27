'use client'
import React from 'react';

const LogoutButton = () => {
  // Função para lidar com o logout
  const handleLogout = async () => {
    try {
      // Faz a requisição para o endpoint de logout
      const response = await fetch('/api/logout', {
        method: 'GET',
        credentials: 'include', // Inclui cookies na requisição
      });

      if (!response.ok) {
        throw new Error('Failed to logout');
      }

      window.location.href = '/';
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <button
      className='bg-red-500 text-white py-2 px-4 rounded'
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default LogoutButton;