import React from 'react';
import './style.scss';
import RegisterFormContainer from '@containers/RegisterFormContainer';
import Header from '@components/common/Header';

function RegisterPage() {
  return (
    <div>
      <Header/>
      <div className="RegisterPage">
        <RegisterFormContainer />
      </div>
    </div>
  );
}

export default RegisterPage;
