//register controller
const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
  } catch (e) {
    console.log(e);
    res.status(500).json({
      sucess: false,
      message: "some error occured",
    });
  }
};

//login controller

//logout controller

//auth middleware
