const express = require("express");
const router = new express.Router();
const User = require("../Model/user");
const auth = require("../Middleware/auth");
// const sendWelcomeMail = require("../email/account");
const multer = require("multer");

router.post("/user", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateToken();
    //     sendWelcomeMail(user.email, user.name);
    res.status(200).send(user);
  } catch (Error) {
    res.status(404).send(Error);
  }
});
//aa nay form valu api nay form valu 11 peli vaaar 6
router.post("/user/login", async (req, res) => {
  try {
    const email = req.body.Email;
    const password = req.body.Password;

    const user = await User.findOne({ Email: email });

    if (user.Password === password) {
      res.status(200).send(user);
    } else {
      res.send();
    }
    const token = await user.generateToken();
    res.status(200).send({ user, token });
  } catch (Error) {
    res.status(404).send(Error);
  }
});

router.post("/user/logout", auth, async (req, res, next) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (Error) {
    res.status(404).send(Error);
  }
});

router.get("/user", auth, (req, res) => {
  const user = User.find()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((Error) => {
      res.status(404).send(Error);
    });
});

router.get("/user/:id", (req, res) => {
  const _id = req.params.id;
  const user = User.findById(_id)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((Error) => {
      res.status(404).send(Error);
    });
});

router.patch("/user/:id", (req, res) => {
  const _id = req.params.id;
  const user = User.updateOne({ _id }, req.body)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((Error) => {
      res.status(404).send(Error);
    });
});

router.delete("/user", (req, res) => {
  // const _id = req.params.id
  const user = User.deleteMany(req.body)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((Error) => {
      res.status(404).send(Error);
    });
});

router.delete("/user/:id", (req, res) => {
  const _id = req.params.id;
  const user = User.deleteOne({ _id }, req.body)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((Error) => {
      res.status(404).send(Error);
    });
});

// const upload = multer({
// 	dest: 'images/'
// 	limits: {
// 		1000000
// 	},
// 	fileFilter(req, file, cb) {
// 		if(file.originalname !== 'pdf')
// 	}
// })

// router.post("/upload", upload.single("uploads"), async (req, res) => {
//   try {
//     res.status(200).send();
//   } catch (Error) {
//     res.status(404).send(Error);
//   }
// });

// const upload = multer({
//   dest: "avatar/",
// });

// router.post(
//   "/upload/avatar",
//   auth,
//   upload.single("avatars"),
//   async (req, res) => {
//     try {
//       res.status(200).send();
//     } catch (Error) {
//       res.status(404).send(Error);
//     }
//   }
// );
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(
  "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"
);

const sendWelcomeMail = (email, name) => {
  const msg = {
    to: email,
    from: "vivekgoswami7383@gmail.com", // Use the email address or domain you verified above
    subject: "Thanks for joining us",
    text: `Welcome. We are glad that you join us. Let us know how can we help you`,
    //html: '<strong>and easy to do anywhere, even with Node.js</strong>'
  };

  //ES6
  sgMail.send(msg).then(
    () => {
      console.log("Email send Success");
    },
    (error) => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  );
};

sendWelcomeMail("vivekgoswami7383@gmail.com");

module.exports = router;
