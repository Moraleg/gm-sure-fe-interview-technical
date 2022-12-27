import { useCallback, useEffect, useState } from 'react';
import InfoTable from '../InfoTable';
import { Button, Box } from '@mui/material';
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
  const [ newPolicyHolders, setNewPolicyHolders ] = useState<Array<Policyholder>>([]);


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


  const handleAddPolicyHolder = useCallback(async () => {
    await axios.post('https://fe-interview-technical-challenge-api-git-main-sure.vercel.app/api/policyholders', {
      name: 'John Smith',
      age: 40,
      address: {
        line1: '1234 Starfish Ln',
        line2: '2B',
        city: 'Miami',
        state: 'Florida',
        postalCode: '12345',
      },
      phoneNumber: '888-111-3456',
    })
    .then(function (response) {
      const { policyHolders } = response?.data || {}
      setNewPolicyHolders(policyHolders)

    })
    .catch(function (error) {
      console.log(error, 'ERROR');
    }); 
  }, [setNewPolicyHolders])

  useEffect(() => {
   getPolicyholders()
  }, []);

  const policyHoldersModified =  Array(5)
  .fill(null)
  .map((_, i) => Object.assign({}, ...policyHolders));
  console.log(policyHolders)


  const rows = policyHoldersModified && policyHoldersModified?.map((item, index) => ({
    key: `KEY ${index}`,
    name: `NAME: ${item?.name}`,
    age: `AGE: ${item?.age}`,
    address: `ADDRESS: ${item?.address?.line1} ${item?.address?.line2} ${item?.address?.city}, ${item?.address?.state} ${item?.address?.postalCode}`,
    phoneNumber: `PHONE NUMBER: ${item?.phoneNumber}`,
    primary: `Primary Policyholder: ${item?.isPrimary}`
  }))

  const newPolicyHolderRows = newPolicyHolders && newPolicyHolders?.map((item, index) => ({
    key: `KEY ${index}`,
    name: `NAME: ${item?.name}`,
    age: `AGE: ${item?.age}`,
    address: `ADDRESS: ${item?.address?.line1} ${item?.address?.line2} ${item?.address?.city}, ${item?.address?.state} ${item?.address?.postalCode}`,
    phoneNumber: `PHONE NUMBER: ${item?.phoneNumber}`,
    primary: `Primary Policyholder: ${item?.isPrimary}`
  }))
  console.log(newPolicyHolders, '???')


  return (
    <Box sx={{ textAlign: 'center' }}>
      <InfoTable header="Policyholder tabs" rows={rows} />
      <InfoTable header="New Policyholder tabs" rows={newPolicyHolderRows} />
      <Button
        onClick={() => handleAddPolicyHolder()}
        variant="contained"
        color="primary"
        size="large"
        sx={{
          marginTop: '20px'
        }}
      >
        Add a policyholder
      </Button>
    </Box>
  );
}

export default PolicyholdersView;
