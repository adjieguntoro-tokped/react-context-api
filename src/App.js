import React, { Component } from 'react';
// import logo from './logo.svg';
import locales from './locales';
import './App.css';

// create context component
const MyContext = React.createContext();

// create provider class
class MyProvider extends Component {
  state = {
    name: "Adjie Guntoro",
    age: 23,
    lang: 'id',
  }

  render() {
    return (
      <MyContext.Provider value={{
        state: this.state,
        addMyAge: () => { this.setState(prevState => ({ age: prevState.age + 5 })) },
        resetMyAge: () => { this.setState({ age: 23 }) },
        changeLang: lang => () => { this.setState({ lang }) },
      }}>
        {this.props.children}
      </MyContext.Provider>
    )
  }
}

const Family = (props) => (
  <div>
    <Person />
  </div>
);
class Person extends Component {
  render() {
    return (
      <MyContext.Consumer>
       {({ state: { name, age, lang }, addMyAge, changeLang, resetMyAge }) => (
          <div>
            <div>
              {locales[lang].hello} {name}, {locales[lang]['your age']} {age} {locales[lang]['years old']}.
            </div>
            <button onClick={addMyAge}>{locales[lang]['add age']}</button>
            <button onClick={resetMyAge}>Reset</button>
            <button onClick={changeLang(lang === 'id' ? 'en' : 'id')}>{locales[lang]['change lang']}</button>
          </div>
         )}
      </MyContext.Consumer>
      
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <MyProvider>
          <header className="App-header">
            <Family />
          </header>
        </MyProvider>
      </div>
    );
  }
}

export default App;
