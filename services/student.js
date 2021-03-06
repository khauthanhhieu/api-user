const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken');
const url = 'mongodb://localhost:27017/learning';

class StudentService {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  async getAll() {
    const db = await MongoClient.connect(url);
    try {
      const studentCollection = db.collection("students");
      const list = await studentCollection.find().toArray()
      console.log(list)

      return this.res.json({
        isSuccess: true,
        students: list,
      })
    } catch (err) {
      console.log(err)
      return this.res.status(503).json({
        isSuccess: false,
      })
    } finally {
      db.close()
    }
  }

  static async findOne(username, password) {
    const db = await MongoClient.connect(url);
    try {
      const studentCollection = db.collection("students");
      return await studentCollection.findOne({ username, password })
    } catch (err) {
      console(err)
      return null
    } finally {
      db.close()
    }
  }

  async checkUsername() {
    const db = await MongoClient.connect(url);
    try {
      const verify = jwt.verify(this.req.headers['token'], 'doctor')
      const userCollection = db.collection("students");
      const { username } = this.req.body
      const currUser = await userCollection.findOne({ _id: ObjectId(verify.user_id) });
      console.log(currUser, verify.user_id)
      const result = await userCollection.findOne({ username });
      if (!result || result.username === currUser.username) {
        return this.res.json({
          isSuccess: true,
        })
      }
      return this.res.json({
        isSuccess: false,
        mess: "Tên đăng nhập này đã tồn tại !"
      })
    } catch (err) {
      console.log(err)
      return this.res.status(503).json({
        isSuccess: false,
        mess: "Lỗi kết nối !"
      })
    } finally {
      db.close()
    }
  }

  async register() {
    const db = await MongoClient.connect(url);
    try {
      const userCollection = db.collection("students")
      const user = this.req.body;
      const result = await userCollection.findOne({ username: user.username })
      if (result != null) {
        this.res.status(200).json({
          isSuccess: false,
          mess: "Tên người dùng đã tồn tại",
        })
      } else {
        await userCollection.insert(this.req.body)
        this.res.status(200).json({
          isSuccess: true,
        });
      }
    } catch (error) {
      this.res.status(500).json({
        isSuccess: false,
        error: error,
      })
    } finally {
      db.close()
    }
  }

  static async findOneById(id) {
    const db = await MongoClient.connect(url);
    var result = undefined;
    try {
      const userCollection = db.collection("students")
      result = await userCollection.findOne({ _id: new ObjectId(id) })
    } catch (error) {
      result = undefined
      console.log(error)
    } finally {
      db.close()
    }
    result.role = "2";
    return result;
  }

  async edit() {
    try {
      const verify = jwt.verify(this.req.headers['token'], 'doctor')
      const data = this.req.body;
      const keys = Object.keys(data);

      const db = await MongoClient.connect(url);
      const userCollection = db.collection("users")
      console.log(verify.user_id, data)
      if (keys.length == 1) {
        if (keys[0] != 'avatar') {
          await userCollection.update({ _id: ObjectId(verify.user_id) }, { "$set": data })
        } else {
          console.log("name", data.avatar)
        }
      } else if (keys.length == 2) {
        const currUser = await userCollection.findOne({ _id: ObjectId(verify.user_id) })
        if (data.old_password !== currUser.password) {
          this.res.json({
            isSuccess: false,
            mess: "Mật khẩu cũ không đúng !"
          })
        } else {
          await userCollection.update({ _id: ObjectId(verify.user_id) }, { "$set": { password: data.password } })
        }
      }
      db.close()
      this.res.json({
        isSuccess: true,
      })
    } catch (err) {
      console.log(err)
      this.res.status(503).json({
        isSuccess: false
      })
    }
  }
}

module.exports = StudentService;