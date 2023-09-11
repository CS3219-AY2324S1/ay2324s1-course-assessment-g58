import React from 'react';
import Header from './components/LandingPage/Header';
import QuestionForm from './components/LandingPage/QuestionForm';
import QuestionTable from './components/LandingPage/QuestionTable';
import Modal from './components/LandingPage/DescriptionModal';
import './App.css';  

function App() {
    return (
        <main>
            <Header />
            <QuestionForm />
            <QuestionTable />
            <Modal />
        </main>
    );
}

export default App;