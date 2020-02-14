const express = require("express");

const router = express.Router();
const Projects = require("../data/helpers/projectModel");
// const Actions = require("../data/helpers/actionModel");

router.get("/", (req, res) => {
	Projects.get()
		.then(result => {
			if (result) {
				res.status(200).json(result);
			} else {
				res.status(404).json({ message: "projects not found" });
			}
		})
		.catch(err => {
			res.status(500).json({ message: "error getting projects" });
		});
});

router.get("/:id", validateId, (req, res) => {
	// do your magic!
	res.status(200).json(req.data);
});

router.post("/", validateBody, (req, res) => {
	// do your magic!
	Projects.insert(req.body)
		.then(result => {
			if (result) {
				res.status(200).json(result);
			}
		})
		.catch(err => {
			res.status(500).json({ message: "error" });
		});
});

router.put("/:id", validateId, validateBody, (req, res) => {
	// do your magic!
	Projects.update(req.params.id, req.body)
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
	Projects.remove(req.params.id)
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

	Projects.get(req.params.id)
		.then(data => {
			if (data) {
				req.data = data;
				next();
			} else {
				res.status(404).json({ message: "not found" });
			}
		})
		.catch(err => {
			res.status(500).json({ message: "error getting" });
		});
}

function validateBody(req, res, next) {
	if (!req.body) {
		res.status(400).json({ message: "missing data" });
		return true;
	}
	if (!req.body.name || !req.body.description) {
		res.status(400).json({ message: "missing required field" });
		return true;
	}
	
	next();
}

module.exports = router;