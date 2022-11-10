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
  getMembersInfo = async(_id)=>{
    const members = await Members.findById(_id);
    return members;
  }
  updateMembers =async(memberEmail,password,phoneNum)=>{
    const updateMembers = await Members.update({ memberEmail, password, phoneNum });
    return updateMembers;
  }
  deleteMembers = async(memberEmail)=>{
    await Members.delete({ memberEmail });
    return ;
  }
}

module.exports = MemberRepository;
