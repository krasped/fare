export interface CreateUser {
  full_name: string;//
  password: string;//
  email: string;//
  phone: string;//
  role: string;//
  user_status: string;
  parent_agent?: string|null;//
  plan: string;//
  tier: string; //nums
  account_manager: string;//
  agency_name: string;//
  agency_id?: string| null;//
  new_agency: boolean;//

}

export interface Agencies {
  id: string;
  name: string;
}