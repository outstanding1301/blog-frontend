import React from 'react';
import './style.css';
import LoginForm from '../../components/LoginForm';
import axios from 'axios';

function LoginPage() {
  const loginTest = () => {
    axios.get('http://192.168.123.101:8080/test', {
      withCredentials: true
    }).then(data => {
        console.log(data.data);
        // alert(data.data);
    }).catch(err => {
        console.error(err);
        if(err.response)
            alert(err.response.data);
        else
            alert(err);
    })
  }

  return (
    <div className="LoginPage">
        <button className="button is-link" onClick={loginTest}>로그인 테스트</button>
        <LoginForm />
    </div>
  );
}

export default LoginPage;
