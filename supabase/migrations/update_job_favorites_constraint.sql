-- Supprimer la contrainte existante
ALTER TABLE job_favorites 
DROP CONSTRAINT job_favorites_job_id_fkey;

-- Recréer la contrainte avec ON DELETE CASCADE
ALTER TABLE job_favorites 
ADD CONSTRAINT job_favorites_job_id_fkey 
FOREIGN KEY (job_id) 
REFERENCES jobs(id) 
ON DELETE CASCADE;
