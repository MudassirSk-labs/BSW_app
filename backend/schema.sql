-- Create employees table
CREATE TABLE public.employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT NOT NULL,
  role TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create schedule table
CREATE TABLE public.schedule (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID REFERENCES public.employees(id) ON DELETE CASCADE,
  day_date DATE NOT NULL,
  is_off BOOLEAN DEFAULT false,
  is_required_off BOOLEAN DEFAULT false,
  is_manual_off BOOLEAN DEFAULT false,
  UNIQUE(employee_id, day_date)
);

-- Enable RLS
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedule ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to manage data
CREATE POLICY "Allow authenticated users to manage employees" ON public.employees
  FOR ALL TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to manage schedules" ON public.schedule
  FOR ALL TO authenticated USING (true);
