import React from 'react';
import { Provider } from "react-redux";
import './app.css';
import store from './store';
import Forms from './components/form';
import List from './components/list';
const App = () => {
	return (
		<Provider store={store}>
			<div className='box'>
			<div className='header'>BULK IPO RESULT CHECKER</div>
				<Forms/>
				<List/>
			</div>
		</Provider>
	)
}

export default App;