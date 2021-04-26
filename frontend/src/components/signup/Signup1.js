import React from 'react';
import '../../App.css';

export default class Signup1 extends React.Component {
   constructor(props) {
      super(props);
   }

   render() {
      return (
         <div className="app">
            <div className='container'>
               <SubmitButton
                  text={'Log out'}
                  disabled={false}
                  onClick={ () => this.doLogout() }
               />
            </div>
         </div>
      );
   }
}

class SubmitButton extends React.Component {
   render() {
      return (
         <div className="submitButton">
            <button
               className='btn'
               disabled={this.props.disabled}
               onClick={ () => this.props.onClick() }
            > 
               {this.props.text}
            </button>
         </div>
      );
   }
}

class InputField extends React.Component {
   render() {
      return (
         <div className="inputField">
            <input
               className='input'
               type={this.props.type}
               placeholder={this.props.placeholder}
               value={this.props.value}
               onChange={ (e) => this.props.onChange(e.target.value) }
            />
         </div>
      );
   }
}

class LoginForm extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         username: '',
         password: '',
         buttonDisabled: false
      }
   }

   setInputValue(property, val) {
      this.setState({
         [property]: val
      })
   }

   render() {
      return (
         <div className="loginForm">
            Login 
            <InputField
               type='text'
               placeholder='Username'
               value={this.state.username ? this.state.username : ''
               onChange={(val) => this.setInputValue}
            }
            />
         </div>
      );
   }
}
