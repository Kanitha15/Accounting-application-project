import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import AuthProvider from './context/Auth';
import TransactionProvider from './context/Transactions';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <TransactionProvider>
      <App />
    </TransactionProvider>
  </AuthProvider>
);
