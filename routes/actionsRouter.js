const express = require("express");

const router = express.Router();
const Actions = require("../data/helpers/actionModel");
const Projects = require("../data/helpers/projectModel");

router.get("/", (req, res) => {
  Actions.get()
    .then(result => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "actions not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "error getting actions" });
    });
});

router.get("/:id", validateId, (req, res) => {
  // do your magic!
  res.status(200).json(req.data);
});

router.post("/", validateBody, validateProjectId, (req, res) => {
  // do your magic!
  console.log("this is body in post", req.body);
  Actions.insert(req.body)  
    .then(result => {
      if (result) {
        res.status(200).json(result);

      }
    })
    .catch(err => {
      res.status(500).json({ message: err });
    });
});

router.put("/:id", validateBody, validateId, validateProjectId, (req, res) => {
  // do your magic!
  Actions.update(req.params.id, req.body)
    .then(result => {
      if (result) {
        res.status(200).json(result);
      }
    })
    .catch(err => {
      res.status(500).json({ message: "error" });
    });
});

router.delete("/:id", validateId, (req, res) => {
  // do your magic!
  Actions.remove(req.params.id)
    .then(result => {
      if (result) {
        res.status(200).json(req.data);
      }
    })
    .catch(err => {
      res.status(500).json({ message: "error" });
    });
});

// 👇🏻 custom middleware 👇🏻

function validateId(req, res, next) {
  // do your magic!
  console.log(req.params.id);

  
  
  Actions.get(req.params.id)

    .then(data => {
      if (!data) {
        res.status(400).json({ message: "invalid user id" });
      } else {
        req.data = data;
        next();
      }
    })
    .catch(err => {
      res.status(500).json({ message: "we failed you" });
    });
}
function validateProjectId(req, res, next) {
  // do your magic!

 
  Projects.get(req.body.project_id)
    .then(data => {
      console.log("this is project id", req.body);
      if (data) {
        req.project = data;
        next();
      } else {
        res.status(404).json({ message: "project not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "error getting project" });
    });
}

function validateBody(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing data" });
    return true;
  }
  if (!req.body.notes || !req.body.description) {
    res.status(400).json({ message: "missing required field" });
    return true;
  }
  if (req.body.description.length > 128) {
    res.status(400).json({ message: "description is too long" });
    return true;
  }

  next();
}

module.exports = router;
