const fs = require('fs');
const fsPromises = fs.promises;

// Declaro mi controller con sus métodos
// El controller se encarga de CONTROLAR todo el proceso, desde que se recibe una petición (request) hasta
// que se da una respuesta (response)
const comandasController = {
  getComandas: async function(req, res) {
    const fileData = await fsPromises.readFile('comandas.db', { encoding: 'utf-8' });

    let listaComandas = JSON.parse(fileData);
    res.json({ data: listaComandas });
  },
  addComanda: async (req, res) => {
    try {
      // Leo el body de la request para extraer los datos de la comanda
      const comanda = req.body;
      const { camarero, productos } = comanda;

      // Leo las comandas ya existentes
      const fileData = await fsPromises.readFile('comandas.db', { encoding: 'utf-8' });
      let listaComandas = JSON.parse(fileData);

      // Obtengo la longitud del array de comandas para saber cuántas hay
      const numComandas = listaComandas.length;

      // Genero el objeto de la nueva comanda
      const newComanda = {
        id: numComandas+1,
        camarero: camarero,
        date: new Date(),
        producto: productos,
        completa: false
      };

      // A la lista de comandas actuales le añado la nueva. Convierto todo a string
      listaComandas = [ ...listaComandas, newComanda ];
      listaComandas = JSON.stringify(listaComandas);

      // Grabo el string en el archivo
      await fsPromises.writeFile('comandas.db', listaComandas, {flag: 'w'});

      // Envío una respuesta de confirmación
      res.send('Oído cocina!!. La comanda se ha registrado');
      
    } catch (error) {
      console.log('Se ha producido un error', error);
    }
  }
};

module.exports = comandasController;
