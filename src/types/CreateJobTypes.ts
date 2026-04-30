export interface CreateJobIF {
  id?: undefined | number | string;
  title: string;
  vacancy: number;
  address: string;
  profession: number;
  salary_range_from: number;
  salary_range_to: number;
  experiance_level: string;
  job_description: string;
  benefits: string[];
  shift: string[];
  latitude: string;
  longitude: string;
  software: number[];
  urgent: number;
}

export interface benefitsIF {
  id: string;
  item: string;
}

export interface requireDocType {
  key: string;
  value: number;
}
