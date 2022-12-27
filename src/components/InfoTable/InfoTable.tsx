import {
  TableContainer,
  Table as MuiTable,
  Paper,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  BoxProps,
  Box,
} from '@mui/material';

type TInfoTable = {
  header: string;
  rows: { key?: string; value?: string | number; name?: string; age?: string | number; address?: string; phoneNumber?: string; primary?: string;  }[];
} & BoxProps;

function InfoTable({ header, rows, ...boxProps }: TInfoTable) {
  return (
    <Box {...boxProps}>
      <Typography variant="h5" textAlign="left" marginBottom="16px">
        {header}
      </Typography>
      <TableContainer component={Paper}>
        <MuiTable sx={{ minWidth: { sm: 650 } }} aria-label="table">
          <TableBody>
            {rows.map(({ key, value, name, age, address, phoneNumber, primary }) => (
              <TableRow key={key}>
                <TableCell>{key}</TableCell>
                <TableCell sx={{ whiteSpace: 'pre' }}>{value}</TableCell>
                <TableCell sx={{ whiteSpace: 'pre' }}>{name}</TableCell>
                <TableCell sx={{ whiteSpace: 'pre' }}>{age}</TableCell>
                <TableCell sx={{ whiteSpace: 'pre' }}>{address}</TableCell>
                <TableCell sx={{ whiteSpace: 'pre' }}>{phoneNumber}</TableCell>
                <TableCell sx={{ whiteSpace: 'pre' }}>{primary}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </Box>
  );
}
export default InfoTable;
