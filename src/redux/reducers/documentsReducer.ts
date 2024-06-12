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

export interface DocumentInterface {
  companySigDate: Date;
  companySignatureName: string;
  documentName: string;
  documentStatus: string;
  documentType: string;
  employeeNumber: string;
  employeeSigDate: Date;
  employeeSignatureName: string;
}

export type ActionDocumentType = {
  type: DocumentsType;
  payload: {
    documents: DocumentsInterface[];
    error: string | null;
    document: DocumentInterface;
    id: string;
  };
};

const initState: {
  documents: DocumentsInterface[];
  loading: boolean;
  error: string | null;
} = {
  documents: [],
  loading: false,
  error: null,
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

    case DocumentsType.addDocumentSucceed: {
      const document = action.payload;
      const documents = [...state.documents, document];
      return { ...state, documents, loading: false };
    }

    case DocumentsType.addDocumentFailed: {
      return { ...state, loading: false, error: action.payload.error };
    }

    case DocumentsType.delDocumentSucceed: {
      const documents = state.documents.filter(
        (el) => el.id !== action.payload.id,
      );
      return { ...state, documents };
    }

    default: {
      return state;
    }
  }
};
