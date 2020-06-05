const { Router } = require("express");
const router = Router();
const admin = require("../config/firabaseConfig");
const db = admin.firestore();
var foto = admin.storage().bucket();

const path = require('path');
const multer = require('../libs/multer');
const { v4: uuid } = require('uuid')


//Upload imagen
router.post("/imagen", multer.single('image'), async (req, res) => {

  const uuid1 = uuid();

  try {
    const fotoUpload = await foto.upload(req.file.path, {
      destination: req.file.filename,
      uploadType: "media",
      metadata: {
        contentType: req.file.mimetype,
        metadata: {
          firebaseStorageDownloadTokens: uuid1
        }
      }
    });
    const img = fotoUpload[0];
    const photo = img.name;
    res.json({
      messaje: 'Imagen subida  satisfactioriamente',
      photo
    });
  } catch (error) {
    res.json(error)
  }
});

//Agrega nuevo producto
router.post("/", async (req, res) => {
  const { name, description, price } = req.body;
  try {
    await db.collection("products").add({
      name,
      description,
      price,
    });

    res.json({
      message: "Producto creado éxitosamente",
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
});
//Get  productos
router.get("/", async (req, res) => {
  try {
    let query = db.collection("products");
    let response = [];
    await query.get().then((querySnapshot) => {
      let docs = querySnapshot.docs;
      for (let doc of docs) {
        const selecItem = {
          id: doc.id,
          name: doc.data().name,
          description: doc.data().description,
          price: doc.data().price,
        };
        response.push(selecItem);
      }
      return response;
    });
    return res.json({
      products: response,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

//Get Producto por id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const documento = db.collection("products").doc(id);
    const response = await documento.get();
    const product = response.data();
    res.json({
      product,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  try {
    const product = db.collection("products").doc(id);
    await product.update({
      name,
      description,
      price,
    });
    res.json({
      message: "Producto actualizado éxitosamente",
    });
  } catch (error) {
    res.json({
      message: errror,
    });
  }
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = db.collection("products").doc(id);

    await product.delete();
    res.json({
      message: "Producto eliminado",
    });
  } catch (error) {
    res.json({
      message: errror,
    });
  }
});

module.exports = router;
