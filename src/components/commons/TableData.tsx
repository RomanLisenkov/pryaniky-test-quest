import { useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import CreateIcon from "@mui/icons-material/Create";
import AddIcon from "@mui/icons-material/Add";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { DocumentsType } from "../../redux/types/documentsEnum";
import { RootState } from "../../redux/store/store";
import CircularIndeterminate from "./Progress";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import CheckIcon from "@mui/icons-material/Check";

const TableData = (): JSX.Element => {
  const dispatch = useDispatch();

  const documents = useSelector((state: RootState) => state.documents);

  useEffect(() => {
    dispatch({ type: DocumentsType.getAllDocumentsRequested });
  }, [dispatch]);

  const [newCompanySigDate, setNewCompanySigDate] = useState<Dayjs | null>(
    null,
  );

  const [newCompanySignatureName, setNewCompanySignatureName] =
    useState<string>("");

  const [newDocumentName, setNewDocumentName] = useState<string>("");

  const [newDocumentStatus, setNewDocumentStatus] = useState<string>("");
  const [newDocumentType, setNewDocumentType] = useState<string>("");

  const [newEmployeeNumber, setNewEmployeeNumber] = useState<string>("");

  const [newEmployeeSigDate, setNewEmployeeSigDate] = useState<Dayjs | null>(
    null,
  );

  const [newEmployeeSignatureName, setNewEmployeeSignatureName] =
    useState<string>("");

  const [newDocumentFormVis, setNewDocumentFormVis] = useState<boolean>(false);

  const handleButtotonAdd = (): void => {
    setNewDocumentFormVis(true);
  };

  const handleButtotonCloseForm = (): void => {
    setNewDocumentFormVis(false);
  };

  const [validationError, setValidationError] = useState<string>("");
  const handleButtotonSaveDocument = (): void => {
    if (
      !newCompanySigDate ||
      !newCompanySignatureName ||
      !newDocumentName ||
      !newDocumentStatus ||
      !newDocumentType ||
      !newEmployeeNumber ||
      !newEmployeeSigDate ||
      !newEmployeeSignatureName
    ) {
      setValidationError("Все поля должны быть заполнены!");
    } else {
      const newDocument = {
        companySigDate: newCompanySigDate.toDate(),
        companySignatureName: newCompanySignatureName,
        documentName: newDocumentName,
        documentStatus: newDocumentStatus,
        documentType: newDocumentType,
        employeeNumber: newEmployeeNumber,
        employeeSigDate: newEmployeeSigDate.toDate(),
        employeeSignatureName: newEmployeeSignatureName,
      };

      dispatch({
        type: DocumentsType.addDocumentRequested,
        payload: { document: newDocument },
      });
    }
  };

  const handleDeleteDocument = (id: string): void => {
    dispatch({
      type: DocumentsType.delDocumentRequested,
      payload: { id },
    });
  };
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {documents.loading ? (
          <CircularIndeterminate />
        ) : (
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">Редактировать</TableCell>
                  <TableCell align="right">Удалить</TableCell>
                  <TableCell align="right">companySigDate</TableCell>
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
                {documents.documents.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="right">
                      <Button variant="text">
                        <CreateIcon />
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="text"
                        onClick={() => handleDeleteDocument(row.id)}
                      >
                        {" "}
                        <ClearIcon />
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      {new Date(row.companySigDate).toLocaleString()}
                    </TableCell>
                    <TableCell align="right">
                      {row.companySignatureName}
                    </TableCell>
                    <TableCell align="right">{row.documentName}</TableCell>
                    <TableCell align="right">{row.documentStatus}</TableCell>
                    <TableCell align="right">{row.documentType}</TableCell>
                    <TableCell align="right">{row.employeeNumber}</TableCell>
                    <TableCell align="right">
                      {new Date(row.employeeSigDate).toLocaleString()}
                    </TableCell>
                    <TableCell align="right">
                      {row.employeeSignatureName}
                    </TableCell>
                    <TableCell align="right">{row.id}</TableCell>
                  </TableRow>
                ))}
                {newDocumentFormVis && (
                  <TableRow
                    key={"newDocumentFormRow"}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        onClick={handleButtotonSaveDocument}
                      >
                        <CheckIcon />
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        onClick={handleButtotonCloseForm}
                      >
                        <ClearIcon />
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      <DateTimePicker
                        label="companySigDate"
                        format="DD.MM.YYYY hh:mm"
                        ampm={false}
                        value={newCompanySigDate}
                        onAccept={(newValue) => setNewCompanySigDate(newValue)}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        autoFocus
                        label="companySignatureName"
                        variant="outlined"
                        value={newCompanySignatureName}
                        onChange={(e) =>
                          setNewCompanySignatureName(e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        label="documentName"
                        variant="outlined"
                        value={newDocumentName}
                        onChange={(e) => {
                          setNewDocumentName(e.target.value);
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        label="documentStatus"
                        variant="outlined"
                        value={newDocumentStatus}
                        onChange={(e) => {
                          setNewDocumentStatus(e.target.value);
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        label="documentType"
                        variant="outlined"
                        value={newDocumentType}
                        onChange={(e) => {
                          setNewDocumentType(e.target.value);
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        label="employeeNumber"
                        variant="outlined"
                        value={newEmployeeNumber}
                        onChange={(e) => {
                          setNewEmployeeNumber(e.target.value);
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <DateTimePicker
                        label="employeeSigDate"
                        format="DD.MM.YYYY hh:mm"
                        ampm={false}
                        value={newEmployeeSigDate}
                        onAccept={(newValue) => setNewEmployeeSigDate(newValue)}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        label="employeeSignatureName"
                        variant="outlined"
                        value={newEmployeeSignatureName}
                        onChange={(e) => {
                          setNewEmployeeSignatureName(e.target.value);
                        }}
                      />
                    </TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <div style={{ marginTop: "10px" }}>
          <Button variant="contained" onClick={handleButtotonAdd}>
            Добавить <AddIcon />
          </Button>
        </div>
        {validationError && (
          <div style={{ color: "red" }}>{validationError}</div>
        )}
      </LocalizationProvider>
    </>
  );
};

export default TableData;
