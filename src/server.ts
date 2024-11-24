import { app } from './app'
import { env } from './env'

app.listen({
  host: '127.0.0.1',
  port: env.PORT || 3000,
})
.then(() => {
  console.log('HTTP Server Running!');
})
.catch(err => {
  console.error('Error starting server:', err);
});

