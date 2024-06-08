import { useEffect, useState } from 'react';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface DocumentsInterface {
  companySigDate: Date;
  companySignatureName: string;
  documentName: string;
  documentStatus: string;
  documentType: string;
  employeeNumber: string;
  employeeSigDate: Date;
  employeeSignatureName: string;
  id: string;
}

const TableData = (): JSX.Element => {
  const [dataDb, setDataDb] = useState<DocumentsInterface[]>();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch(
        'https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/userdocs/get',
        {
          method: 'GET',
          headers: { 'x-auth': token, 'content-type': 'application/json' },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          setDataDb(res.data);
        });
    }
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>companySigDate</TableCell>
            <TableCell align="right">companySignatureName</TableCell>
            <TableCell align="right">documentName</TableCell>
            <TableCell align="right">documentStatus</TableCell>
            <TableCell align="right">documentType</TableCell>
            <TableCell align="right">employeeNumber</TableCell>
            <TableCell align="right">employeeSigDate</TableCell>
            <TableCell align="right">employeeSignatureName</TableCell>
            <TableCell align="right">id</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataDb?.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              
              <TableCell align="right">{String(row.companySigDate)}</TableCell>
              <TableCell align="right">{row.companySignatureName}</TableCell>
              <TableCell align="right">{row.documentName}</TableCell>
              <TableCell align="right">{row.documentStatus}</TableCell>
              <TableCell align="right">{row.documentType}</TableCell>
              <TableCell align="right">{row.employeeNumber}</TableCell>
              <TableCell align="right">{String(row.employeeSigDate)}</TableCell>
              <TableCell align="right">{row.employeeSignatureName}</TableCell>
              <TableCell align="right">{row.id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableData;
