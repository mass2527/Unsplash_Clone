import React from 'react';
import Button from '@material-ui/core/Button';

interface Props {
  portfolio_url?: string | undefined;
}

const DisableElevation: React.FC<Props> = ({ portfolio_url }) => {
  return (
    <Button fullWidth={true} variant="contained" color="primary" disableElevation>
      portfolio
    </Button>
  );
};

export default DisableElevation;
