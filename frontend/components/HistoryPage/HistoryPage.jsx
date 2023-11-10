import React, { useState, useEffect } from 'react';
import HistoryTable from './HistoryTable';
import ResponseModal from './ResponseModal';

const HistoryPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [response, setResponse] = useState('');
  const [history, setHistory] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const userId = "7"; // Replace this with the actual user ID
            // const response = await fetch(`http://localhost:3002/get-history?user=${userId}`);
            const sessions = await fetchGet(`/api/sessions/${userId}`);
            sessions.data.forEach((session) => {
                console.log(session.responses);
                setHistory(session.responses[0]);
            });
            // setHistory(data);
        };

        fetchData();
    }, []);

  const openModal = (response) => {
    setResponse(response);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <HistoryTable data={history} />
      <ResponseModal isOpen={modalIsOpen} onRequestClose={closeModal} response={response} />
    </div>
  );
};

export default HistoryPage;