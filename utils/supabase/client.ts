import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://rknwbggpzdzhlgrozbkm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrbndiZ2dwemR6aGxncm96YmttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5ODM1NzksImV4cCI6MjA1MDU1OTU3OX0.6fXoUYCKM8iuqxdy49ykFo6XKNubnF80KK1Ne2LGyHs"
);
