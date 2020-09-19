import React from 'react';
import './style.scss';
import LoginFormContainer from '@containers/LoginFormContainer';
import Header from '@components/common/Header';

function LoginPage() {
  return (
    <div>
      <Header />
      <div className="LoginPage">
          <LoginFormContainer />
      </div>
    </div>
  );
}

export default LoginPage;
