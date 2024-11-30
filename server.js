import pkg from 'json-server';
const { create, router: _router, defaults } = pkg;

const server = create();
const router = _router('./data/db.json');
const middlewares = defaults();

server.use(middlewares);
server.use(router);

const PORT = 3000; 

server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});