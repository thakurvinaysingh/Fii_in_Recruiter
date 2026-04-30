export interface createClinicIF {
  id?: string;
  name: string;
  email: string;
  phone: number;
  bio: string;
  location: string;
  document: string | null;
  logo: string | null;
  document_name: string | null;
}
