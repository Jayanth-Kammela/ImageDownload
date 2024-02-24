
const getImage = async (req, res) => {
    try {
        const data = await uploadModel.find()
        res.status(200).send(data);
        // return res.status(200).json("Retrive the images")
    } catch (error) {

    }
}

const postImage = async (req, res) => {
    const file = req.file.filename;
    console.log(req.file.path);
    try {
        const users = new uploadModel({ File: file },);
        users.save()
        return res.status(200).send(users);
    } catch (error) {
        return res.status(422).json(error);
    }

}

module.exports={getImage,postImage}