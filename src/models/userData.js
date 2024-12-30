import { type } from "os";

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});
const UserData = mongoose.model("User", schema);

export default UserData;
