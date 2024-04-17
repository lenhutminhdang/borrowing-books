const AppService = require("./app.service");

class StaffService extends AppService {
  constructor(client) {
    super(client, "staffs");
  }

  extractData(payload) {
    const staff = {
      name: payload.name,
      email: payload.email,
      password: payload.password,
      birthDay: payload.birthDay,
      gender: payload.gender,
      address: payload.address,
      phone: payload.phone,
    };

    // remove undefined fields
    Object.keys(staff).forEach((key) => {
      return staff[key] === undefined && delete staff[key];
    });

    return staff;
  }
}

module.exports = StaffService;
