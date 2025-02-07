-- Create user_cvs table
CREATE TABLE IF NOT EXISTS user_cvs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content JSONB NOT NULL,
    type TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Add RLS policies
ALTER TABLE user_cvs ENABLE ROW LEVEL SECURITY;

-- Policy for select: users can only view their own CVs
CREATE POLICY "Users can view own CVs" 
    ON user_cvs 
    FOR SELECT 
    USING (auth.uid() = user_id);

-- Policy for insert: users can only insert their own CVs
CREATE POLICY "Users can insert own CVs" 
    ON user_cvs 
    FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

-- Policy for update: users can only update their own CVs
CREATE POLICY "Users can update own CVs" 
    ON user_cvs 
    FOR UPDATE 
    USING (auth.uid() = user_id);

-- Policy for delete: users can only delete their own CVs
CREATE POLICY "Users can delete own CVs" 
    ON user_cvs 
    FOR DELETE 
    USING (auth.uid() = user_id);

-- Create function to automatically update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_user_cvs_updated_at
    BEFORE UPDATE ON user_cvs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
