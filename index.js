import app from './src/app';

const PORT = process.env.port || 4001;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
