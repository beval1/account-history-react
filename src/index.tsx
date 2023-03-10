import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CustomerPage from './pages/CustomerPage';
import EventPage from './pages/EventPage';
import ActorPage from './pages/ActorPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route path="/customer/:customerId" element={<CustomerPage />} />
					<Route path="/customer" element={<CustomerPage />} />
					<Route path="/event" element={<EventPage />} />
					<Route path="/actor" element={<ActorPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
