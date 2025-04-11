import fs from "fs";
const PATH = "./inventors.json";

function getAll() {
  return JSON.parse(fs.readFileSync(PATH, "utf-8"));
}

function get(id) {
  const inventors = getAll();
  return inventors.find((inventor) => inventor._id == id);
}

function add(inventor) {
  const inventors = getAll();
  inventors.push(inventor);
  // escritura en archivo json
  fs.writeFileSync(PATH, JSON.stringify(inventors, null, 2));
}

// TODO: Actualizar un inventor -> id que hay que modificar y las propiedades que se se modifican
function update(inventor) {
  if (get(inventor._id) == null) {
    throw new Error("Inventor not found");
  }

  const inventors = getAll();
  const index = inventors.findIndex((i) => i._id == inventor._id);
  inventors[index] = { ...inventors[index], ...inventor };

  fs.writeFileSync(PATH, JSON.stringify(inventors, null, 2));
  return inventors;
}

// TODO: Eliminar un inventor
function remove(id) {
  const inventors = getAll();
  const indexToDelete = inventors.findIndex((i) => i._id == id);

  if (indexToDelete === -1) {
    throw new Error("Inventor not found");
  }

  inventors.splice(indexToDelete, 1);
  fs.writeFileSync(PATH, JSON.stringify(inventors, null, 2));

  return inventors;
}

const updatedInventor = update({
  _id: 1,
  first: "Martín",
  last: "Díaz",
  year: 1991,
});
const inventors = remove(8);

console.log(updatedInventor);
console.log(inventors);
