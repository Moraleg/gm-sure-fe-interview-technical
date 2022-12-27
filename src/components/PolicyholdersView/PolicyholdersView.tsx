import { useEffect } from 'react';
import { Box } from '@mui/material';
import  axios  from 'axios'

async function getPolicyholders() {
  try {
    const response = await axios.get('https://fe-interview-technical-challenge-api-git-main-sure.vercel.app/api/policyholders');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

function PolicyholdersView() {
  useEffect(() => {
    getPolicyholders()
  }, []);

  return (
    <Box sx={{ textAlign: 'center' }}>
      {'POLICYHOLDERS VIEW'}
    </Box>
  );
}

export default PolicyholdersView;
