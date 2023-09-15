import Header from './Header';
import QuestionForm from './QuestionForm';
import QuestionTable from './QuestionTable';
import DescriptionModal from './DescriptionModal';

function LandingPage() {
    return (
        <main>
            <Header />
            <QuestionForm />
            <QuestionTable />
            <DescriptionModal />
        </main>
    );
  }
  
  export default LandingPage;