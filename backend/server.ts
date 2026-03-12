import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Supabase Configuration
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors());
app.use(express.json());

// Routes
// 1. Get all employees
app.get('/api/employees', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('employees')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Add an employee
app.post('/api/employees', async (req, res) => {
  try {
    const { name, email, phone, role } = req.body;
    const { data, error } = await supabase
      .from('employees')
      .insert([{ name, email, phone, role }])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// 3. Delete employees (bulk supported)
app.delete('/api/employees', async (req, res) => {
  try {
    const { ids } = req.body; // Expects an array of IDs
    if (!Array.isArray(ids)) {
      return res.status(400).json({ error: 'IDs must be an array' });
    }

    const { error } = await supabase
      .from('employees')
      .delete()
      .in('id', ids);

    if (error) throw error;
    res.json({ message: 'Employees deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
