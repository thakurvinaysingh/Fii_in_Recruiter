export interface JobItemIF {
  id: number;
  title: string;
  job_description: string;
  applicants: number;
  specialization: string;
  specialization_id: number;
  salary_range_from: string;
  salary_range_to: string;
  expire_date: string;
  vacancy: number;
  clinic: string;
  clinic_logo: string;
  created_at: string;
  experiance_level: string;
  require_document: string | null;
  benefits: string[];
  candidates_count: number;
  employmentTypes: any[];
  address: string;
}
