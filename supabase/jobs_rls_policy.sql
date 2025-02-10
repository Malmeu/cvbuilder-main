-- Politique de sécurité pour la table jobs

-- Autoriser uniquement l'admin à modifier les jobs
CREATE POLICY "Admin peut modifier les jobs" ON jobs
FOR UPDATE
TO authenticated
WITH CHECK (
  auth.uid() = (
    SELECT id FROM auth.users 
    WHERE email = 'admin@cvdiali.com'
  )
);

-- Autoriser uniquement l'admin à supprimer les jobs
CREATE POLICY "Admin peut supprimer les jobs" ON jobs
FOR DELETE
TO authenticated
WITH CHECK (
  auth.uid() = (
    SELECT id FROM auth.users 
    WHERE email = 'admin@cvdiali.com'
  )
);

-- Permettre la lecture à tous
CREATE POLICY "Lecture publique des jobs" ON jobs
FOR SELECT
USING (true);
