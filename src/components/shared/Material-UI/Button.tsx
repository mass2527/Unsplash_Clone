import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setTimeout } from 'timers';

interface Props {
  portfolio_url?: string | undefined;
}

const DisableElevation: React.FC<Props> = ({ portfolio_url }) => {
  const [loading, setLoading] = useState(false);

  function clickButton() {
    if (portfolio_url) return;
    setLoading(true);
    toast('Sorry, Portfolio does not exist');

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }

  return (
    <>
      <Button
        disabled={loading}
        onClick={clickButton}
        fullWidth={true}
        variant="contained"
        color="primary"
        disableElevation
      >
        portfolio
      </Button>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        limit={1}
      />
    </>
  );
};

export default DisableElevation;
