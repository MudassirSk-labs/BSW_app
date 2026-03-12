import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import Groq from 'groq-sdk';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Supabase Configuration
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Groq Configuration
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.use(cors());
app.use(express.json());

// --- Auth Routes ---
app.post('/api/auth/login', async (req, res) => {
  try {
    const { user, pass } = req.body;
    
    // Check .env Admin credentials
    const adminUser = process.env.ADMIN_USER || 'Admin';
    const adminPass = process.env.ADMIN_PASS || '1234';

    if (user === adminUser && pass === adminPass) {
      return res.json({ 
        token: 'env-session-active', 
        user: { email: 'admin@bsw.com', role: 'admin' } 
      });
    }

    // Fallback to Supabase Auth
    const authEmail = user.includes('@') ? user : `${user}@bsw.com`;
    const { data, error } = await supabase.auth.signInWithPassword({
      email: authEmail,
      password: pass,
    });

    if (error) throw error;
    res.json({ token: data.session?.access_token, user: data.user });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
});

// --- Employee Routes ---
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

app.delete('/api/employees', async (req, res) => {
  try {
    const { ids } = req.body;
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

// --- Schedule Routes ---
app.get('/api/schedule', async (req, res) => {
  try {
    const { employee_ids } = req.query;
    const ids = typeof employee_ids === 'string' ? employee_ids.split(',') : [];
    
    let query = supabase.from('schedule').select('*');
    if (ids.length > 0) {
      query = query.in('employee_id', ids);
    }

    const { data, error } = await query;
    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/schedule', async (req, res) => {
  try {
    const { days } = req.body; // Array of DaySchedule objects
    const { error } = await supabase
      .from('schedule')
      .upsert(days, { onConflict: 'employee_id,day_date' });

    if (error) throw error;
    res.json({ message: 'Schedule updated successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// --- AI Routes ---
app.post('/api/ai/analyze', async (req, res) => {
  try {
    const { prompt } = req.body;
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a retail store scheduling expert. Keep suggestions concise and actionable.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'llama-3.3-70b-versatile',
    });

    res.json({ analysis: chatCompletion.choices[0]?.message?.content || '' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
