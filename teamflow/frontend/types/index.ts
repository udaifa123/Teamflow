export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface Project {
  id: number;
  name: string;
  description: string | null;
  status: string;
  start_date: string | null;
  end_date: string | null;
}

export interface ProjectMember {
  user_id: number;
  user_name: string;
  user_email: string;
  project_id: number;
  project_name: string;
}

export interface Task {
  id: number;
  project_id: number;
  project_name?: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  due_date: string | null;
  created_at: string;
}