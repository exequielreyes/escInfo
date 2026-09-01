// Uso: node scripts/hash-password.mjs "tuContraseña"
// Copiá el resultado en la variable de entorno ADMIN_PASSWORD_HASH.
import bcrypt from "bcryptjs";

const password = process.argv[2];

if (!password) {
  console.error('Uso: node scripts/hash-password.mjs "tuContraseña"');
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);
console.log("\nADMIN_PASSWORD_HASH=" + hash + "\n");
