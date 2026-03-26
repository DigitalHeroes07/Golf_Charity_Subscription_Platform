-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Charities Table
CREATE TABLE public.charities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    upcoming_events TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- Users Table (Extends Supabase Auth if needed, or standalone for logic)
-- Assuming we use Supabase Auth, this is the public profiles table
CREATE TABLE public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    subscription_status VARCHAR(50) DEFAULT 'inactive' CHECK (subscription_status IN ('active', 'inactive', 'past_due', 'canceled')),
    stripe_customer_id VARCHAR(255),
    charity_id UUID REFERENCES public.charities(id) ON DELETE SET NULL,
    charity_percentage DECIMAL(5,2) DEFAULT 10.00 CHECK (charity_percentage >= 10.00 AND charity_percentage <= 100.00),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- Scores Table
CREATE TABLE public.scores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    score INTEGER NOT NULL CHECK (score >= 1 AND score <= 45),
    date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- Draws Table
CREATE TABLE public.draws (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    month INTEGER NOT NULL CHECK (month >= 1 AND month <= 12),
    year INTEGER NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'published')),
    total_prize_pool DECIMAL(10,2) DEFAULT 0.00,
    jackpot_rollover_amount DECIMAL(10,2) DEFAULT 0.00,
    winning_numbers INTEGER[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
    published_at TIMESTAMP WITH TIME ZONE
);

-- Winners Table
CREATE TABLE public.winners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    draw_id UUID NOT NULL REFERENCES public.draws(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    match_type INTEGER NOT NULL CHECK (match_type IN (3, 4, 5)),
    prize_amount DECIMAL(10,2) NOT NULL,
    proof_url TEXT,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'paid')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- Function to ensure only rolling 5 scores are kept per user
CREATE OR REPLACE FUNCTION enforce_rolling_five_scores()
RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM public.scores
    WHERE id IN (
        SELECT id FROM public.scores
        WHERE user_id = NEW.user_id
        ORDER BY date DESC, created_at DESC
        OFFSET 5
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for rolling 5 scores
CREATE TRIGGER enforce_five_scores_trigger
AFTER INSERT ON public.scores
FOR EACH ROW
EXECUTE FUNCTION enforce_rolling_five_scores();

-- Row Level Security (RLS) Configuration
ALTER TABLE public.charities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.draws ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.winners ENABLE ROW LEVEL SECURITY;

-- Charities RLS: anyone can read, only admin can write
CREATE POLICY "Charities are viewable by everyone" ON public.charities FOR SELECT USING (true);
CREATE POLICY "Charities are insertable by admins" ON public.charities FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Charities are updatable by admins" ON public.charities FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Charities are deletable by admins" ON public.charities FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);

-- Users RLS: users can view/update their own profile, admins can do all
CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON public.users FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can update all profiles" ON public.users FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);

-- Scores RLS: users can manage their own scores
CREATE POLICY "Users can view own scores" ON public.scores FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own scores" ON public.scores FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can edit own scores" ON public.scores FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all scores" ON public.scores FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);

-- Draws RLS: anyone can read, only admin can write
CREATE POLICY "Draws are viewable by everyone" ON public.draws FOR SELECT USING (true);
CREATE POLICY "Draws are manageable by admins" ON public.draws FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);

-- Winners RLS: users can view own winnings, admins can do all
CREATE POLICY "Users can view own winnings" ON public.winners FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update proof for own winnings" ON public.winners FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can manage all winners" ON public.winners FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);
