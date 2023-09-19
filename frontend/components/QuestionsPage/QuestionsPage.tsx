import Header from './Header';
import QuestionForm from './QuestionForm';
import QuestionTable from './QuestionTable';
import DescriptionModal from './DescriptionModal';
import UserDemo from './UserDemo';

const QuestionPage = () => {
    return (
        <main>
            <Header />
            <QuestionForm />
            <QuestionTable />
            <DescriptionModal />
            <UserDemo/>
        </main>
    );
  }
  
  export default QuestionPage;