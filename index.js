import app from './app';

const PORT = process.env.port || 4001;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
