const { ObjectId } = require("mongodb");
const AppService = require("./app.service");

class StaffService extends AppService {
  constructor(client) {
    super(client, "staffs");
  }

  extractData(payload) {
    const staff = {
      name: payload.name, // le nhut minh dang
      email: payload.email, // minhdang@example.com
      password: payload.password, // 123456
      birthDay: payload.birthDay, // 01-01-2001
      gender: payload.gender, // male
      address: payload.address, // Ninh Kieu, Can Tho
      phone: payload.phone, // 0326900200
    };

    // remove undefined fields
    Object.keys(staff).forEach((key) => {
      return staff[key] === undefined && delete staff[key];
    });

    return staff;
  }
}

module.exports = StaffService;

// #############################################################################
// const { ObjectId } = require("mongodb");

// class StaffService {
//   constructor(client) {
//     this.Staff = client.db().collection("staffs");
//   }

//   extractStaffData(payload) {
//     const staff = {
//       name: payload.name,
//       email: payload.email,
//       password: payload.password,
//       birthDay: payload.birthDay,
//       gender: payload.gender,
//       address: payload.address,
//       phone: payload.phone,
//     };

//     // remove undefined fields
//     Object.keys(staff).forEach((key) => {
//       return staff[key] === undefined && delete staff[key];
//     });

//     return staff;
//   }

//   async create(payload) {
//     const staff = this.extractStaffData(payload);
//     const result = await this.Staff.insertOne(staff);

//     return result;
//     // return insertedId if needed
//     // {
//     //     "acknowledged": true,
//     //     "insertedId": "661e983d140f35b0561d83cf"
//     // }
//   }

//   async find(filter) {
//     const cursor = await this.Staff.find(filter);
//     return await cursor.toArray();
//   }

//   async findByName(name) {
//     return await this.find({
//       name: { $regex: new RegExp(name), $option: "i" },
//     });
//   }

//   async findById(id) {
//     return await this.Staff.findOne({
//       _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
//     });
//   }

//   async update(id, payload) {
//     const filter = {
//       _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
//     };
//     const update = this.extractStaffData(payload);
//     const result = await this.Staff.findOneAndUpdate(
//       filter,
//       { $set: update },
//       { returnDocument: "after" }
//     ); // return an updated staff

//     return result;
//   }

//   async delete(id) {
//     const result = await this.Staff.findOneAndDelete({
//       _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
//     });
//     return result;
//   }
// }

// module.exports = StaffService;
