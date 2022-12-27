import { useEffect, useState } from 'react';
import InfoTable from '../InfoTable';
import { Box } from '@mui/material';
import  axios  from 'axios'

interface Policyholder {
  name: string;
  age: number;
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    postalCode: string;
  };
  phoneNumber: string;
  isPrimary: boolean;
}

function PolicyholdersView() {
  const [ policyHolders, setPolicyHolders ] = useState<Array<Policyholder>>([]);

  const getPolicyholders = async () => {
      await axios.get('https://fe-interview-technical-challenge-api-git-main-sure.vercel.app/api/policyholders')
      .then((response) => {
        const { policyHolders } = response?.data || {}
        setPolicyHolders(policyHolders)
      
      })
      .catch((error) => {
        console.log(error)
      });
   
  }

  useEffect(() => {
   getPolicyholders()
  }, []);

  const policyHoldersModified =  Array(5)
  .fill(null)
  .map((_, i) => Object.assign({}, ...policyHolders));
  console.log(policyHolders)


  const rows = policyHoldersModified && policyHoldersModified.map((item) => ({
    name: `NAME: ${item?.name}`,
    age: `AGE: ${item?.age}`,
    address: `ADDRESS: ${item?.address?.line1} ${item?.address?.line2} ${item?.address?.city}, ${item?.address?.state} ${item?.address?.postalCode}`,
    phoneNumber: `PHONE NUMBER: ${item?.phoneNumber}`,
    primary: `Primary Policyholder: ${item?.isPrimary}`
  }))


  return (
    <Box sx={{ textAlign: 'center' }}>
      <InfoTable header="Policyholder tabs" rows={rows} />
    </Box>
  );
}

export default PolicyholdersView;
