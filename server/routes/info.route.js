const Route = require("express");
const Info = require("../models/info");
const ProjectInfo = require("../models/projectsInfo");
const Social = require("../models/social");
const bycript = require("bcryptjs");
const router = new Route();
const deleteFile = require("../helper/deleteFile");
const getRandomNumber = require("../helper/getRandomNumber");
const sgMail = require("@sendgrid/mail");
const keys = require("../keys");
sgMail.setApiKey(keys.SENDGRID_API_KEY);
router.post("/info", async (req, res) => {
  try {
    const info = await Info.create({
      email: req.body.email,
      password: await bycript.hash(req.body.password, 12),
      frontendSkills: req.body.frontendSkills,
      backendSkills: req.body.backendSkills,
      phone: req.body.phone,
    });
    res.status(201).json({ info });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});
router.get("/info", async (req, res) => {
  try {
    const info = await Info.findAll();
    res.status(200).json({ info });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});
router.delete("/info/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const info = await Info.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json({ info });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});
router.put("/info", async (req, res) => {
  try {
    const info = await Info.update(
      {
        email: req.body.email,
        password: req.body.password,
        frontendSkills: req.body.frontendSkills,
        backendSkills: req.body.backendSkills,
        phone: req.body.phone,
      },
      {
        where: {
          id: 3,
        },
      }
    );
    res.status(200).json({ info });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});
const code = getRandomNumber(100, 999);
router.post("/signIn", async (req, res) => {
  try {
    const { password, email } = req.body;

    const info = await Info.findAll();
    console.log(info[0].email);

    const msg = {
      to: "vasilijloskutov2083@gmail.com",
      from: "vasilijloskutov2083@gmail.com",
      subject: "Ваш одноразовый код",
      html: `
      <h2>Введите ваш одноразовый код для входа в админ панель:</h2>
      <h1>${code}</h1>`,
      text: "Awesome sauce",
    };
    const message = await sgMail.send(msg);
    console.log(message);
    const isEqualPassword = await bycript.compare(password, info[0].password);

    if (isEqualPassword && email === info[0].email) {
      res.send({
        message: "Вы вошли успешно",
      });
    } else {
      res.send({
        error: "",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

router.post("/logInCode", async (req, res) => {
  try {
    const { reqCode } = req.body;
    if (reqCode === code.toString()) {
      res.json({ message: "ok" });
    } else {
      res.json({ message: "код не верный" });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});
router.post("/doc", async (req, res) => {
  try {
    console.log(req.file);
    const projectInfo = await ProjectInfo.create({
      path: req.file.filename,
      link: req.body.link,
      name: req.body.name,
      skills: req.body.skills,
    });

    res.json({ projectInfo });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

router.get("/projectInfo", async (req, res) => {
  try {
    const projectInfo = await ProjectInfo.findAll();
    res.send({ projectInfo });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});
router.get("/projectInfo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const projectInfo = await ProjectInfo.findAll({
      where: {
        id,
      },
    });
    res.send({ projectInfo });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});
router.put("/projectInfo", async (req, res) => {
  try {
    const { id, link, name, skills } = req.body;
    console.log(id, link, name);
    const updateInfo = await ProjectInfo.update(
      {
        link,
        name,
        skills,
      },
      {
        where: {
          id,
        },
      }
    );
    res.json({ updateInfo });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});
router.delete("/projectInfo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { path: filename } = req.body;

    deleteFile(filename);
    const info = await ProjectInfo.destroy({
      where: {
        id,
      },
    });
    res.json({ info });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});
router.post("/social", async (req, res) => {
  try {
    const { link } = req.body;
    console.log(req.body);
    console.log(req.file);

    const socialInfo = await Social.create({
      filename: req.file.filename,
      linkSocial: link,
    });
    console.log(req.file.filename);
    res.json({ socialInfo });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});
router.get("/social", async (req, res) => {
  try {
    const socialAll = await Social.findAll();
    res.json({ socialAll });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});
router.put("/social", async (req, res) => {
  try {
    const { id, linkSocial } = req.body;
    const updateSocial = await Social.update(
      {
        linkSocial,
      },
      {
        where: {
          id,
        },
      }
    );
    res.json({ updateSocial });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});
router.delete("/social/:id", async (req, res) => {
  try {
    const { id } = req.params;
    deleteFile(req.body.filename);
    const deleteSocial = await Social.destroy({ where: { id } });
    res.json({ deleteSocial });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});
module.exports = router;
