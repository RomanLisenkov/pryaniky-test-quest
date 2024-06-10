import { DocumentsType } from "../types/documentsEnum";

export interface DocumentsInterface {
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

export type ActionDocumentType = {
  type: DocumentsType;
  payload: DocumentsInterface[];
};

const initState: { documents: DocumentsInterface[]; loading: boolean } = {
  documents: [],
  loading: false,
};

export const documentsReducer = (
  state = initState,
  action: ActionDocumentType,
) => {
  switch (action.type) {
    case DocumentsType.getAllDocumentsSucceed: {
      const documents = action.payload;
      return { ...state, documents, loading: false };
    }

    case DocumentsType.startLoading: {
      return { ...state, loading: true };
    }
    default: {
      return state;
    }
  }
};
