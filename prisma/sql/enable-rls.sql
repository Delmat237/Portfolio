-- Sécurise les tables portfolio contre l'accès public via l'API PostgREST (Supabase).
-- Prisma continue de fonctionner : le rôle postgres (DATABASE_URL) bypasse le RLS.
--
-- Exécution :
--   npm run db:secure
-- ou coller ce SQL dans Supabase → SQL Editor → Run

-- 1. Activer Row Level Security (sans politique = accès refusé pour anon/authenticated)
ALTER TABLE IF EXISTS "Project" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS "Education" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS "Experience" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS "Competition" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS "Association" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS "Certification" ENABLE ROW LEVEL SECURITY;

-- 2. Retirer les privilèges directs des rôles API publics (défense en profondeur)
--    Sans cela, l'API REST Supabase (clé anon) peut encore toucher les tables.
REVOKE ALL ON TABLE "Project" FROM anon, authenticated;
REVOKE ALL ON TABLE "Education" FROM anon, authenticated;
REVOKE ALL ON TABLE "Experience" FROM anon, authenticated;
REVOKE ALL ON TABLE "Competition" FROM anon, authenticated;
REVOKE ALL ON TABLE "Association" FROM anon, authenticated;
REVOKE ALL ON TABLE "Certification" FROM anon, authenticated;

-- 3. S'assurer qu'aucune politique permissive n'existe déjà
DROP POLICY IF EXISTS "Allow public read" ON "Project";
DROP POLICY IF EXISTS "Allow public all" ON "Project";
DROP POLICY IF EXISTS "Enable read access for all users" ON "Project";
DROP POLICY IF EXISTS "Allow public read" ON "Education";
DROP POLICY IF EXISTS "Allow public all" ON "Education";
DROP POLICY IF EXISTS "Allow public read" ON "Experience";
DROP POLICY IF EXISTS "Allow public all" ON "Experience";
DROP POLICY IF EXISTS "Allow public read" ON "Competition";
DROP POLICY IF EXISTS "Allow public all" ON "Competition";
DROP POLICY IF EXISTS "Allow public read" ON "Association";
DROP POLICY IF EXISTS "Allow public all" ON "Association";
DROP POLICY IF EXISTS "Allow public read" ON "Certification";
DROP POLICY IF EXISTS "Allow public all" ON "Certification";
