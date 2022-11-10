const Members = require("../models/member");

class MemberRepository {
  createMember = async (memberEmail, hashPassword) => {
    console.log("repo: ", hashPassword);
    try {
      await Members.create({
        memberEmail,
        password: hashPassword,
      });
      return;
    } catch (err) {
      throw new Error(err.message);
    }
  };
  findOneMember = async (memberEmail) => {
    const findOneMember = await Members.findOne({ memberEmail });
    return findOneMember;
  };
  checkMembersIdDup = async (memberEmail) => {
    return await Members.findOne({ memberEmail });
  };
}

module.exports = MemberRepository;
