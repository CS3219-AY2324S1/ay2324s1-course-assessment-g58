import React from 'react';
import Header from '../components/LandingPage/Header';
import QuestionForm from '../components/LandingPage/QuestionForm';
import QuestionTable from '../components/LandingPage/QuestionTable';
import DescriptionModal from '../components/LandingPage/DescriptionModal';

function Home() {
    return (
        <main>
            <Header />
            <QuestionForm />
            <QuestionTable />
            <DescriptionModal />
        </main>
    );
}

export default Home;
