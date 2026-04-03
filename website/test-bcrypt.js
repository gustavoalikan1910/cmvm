const bcrypt = require('bcryptjs');

const password = 'admin123';
const hash = '$2b$10$tZ2E7oK1wzN0T.5iWb/sNuG.s/N1G.6M/n6I2t958u/C.eR/A3KcC';

const run = async () => {
    const match = await bcrypt.compare(password, hash);
    console.log('Match?', match);
    
    if (!match) {
        const newHash = await bcrypt.hash(password, 10);
        console.log('New Hash generated:', newHash);
    }
}
run();
