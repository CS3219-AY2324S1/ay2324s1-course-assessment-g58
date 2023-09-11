import React from 'react';
import Header from './components/LandingPage/Header/Header';
import QuestionForm from './components/LandingPage/QuestionForm/QuestionForm';
import QuestionTable from './components/LandingPage/QuestionTable/QuestionTable';
import DescriptionModal from './components/LandingPage/DescriptionModal/DescriptionModal';
import './App.css';  

function App() {
    return (
        <main>
            <Header />
            <QuestionForm />
            <QuestionTable />
            <DescriptionModal />
        </main>
    );
}

export default App;