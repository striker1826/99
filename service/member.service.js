const MembersRepository = require("../repository/members.repository");
const salt = "chlrkd1wh";
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

function pbkdf2(password, salt, iterations, len, hashType) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, iterations, len, hashType, (err, key) => {
      err ? reject(err) : resolve(key.toString("base64"));
    });
  });
}

class MemberService {
  memberRepository = new MembersRepository();

  createMembers = async (memberEmail, password) => {
    const findOneMember = await this.memberRepository.findOneMember(
      memberEmail,
      password
    );
    if (findOneMember) {
      throw new Error("회원가입에 실패했습니다");
    } else {
      const hashPassword = await pbkdf2(password, salt, 123132, 22, "sha512");
      await this.memberRepository.createMember(memberEmail, hashPassword);
      return;
    }
  };

  checkMembersIdDup = async (memberEmail) => {
    const findOneMember = await this.memberRepository.findOneMember(
      memberEmail
    );
    if (findOneMember) {
      throw new Error("이미 사용중인 계정입니다.");
    } else {
      return "사용 가능한 계정입니다.";
    }
  };

  loginMembers = async (memberEmail, password) => {
    const findOneMember = await this.memberRepository.findOneMember(
      memberEmail
    );
    console.log(findOneMember);
    if (findOneMember) {
      const match = await pbkdf2(password, salt, 123132, 22, "sha512");
      console.log(match);
      if (match === false) {
        return { message: "로그인 정보가 맞지 않습니다." };
      } else {
        const token = jwt.sign({ memberEmail }, `${process.env.COOKIE_NAME}`);
        return {
          token: `Bearer ${token}`,
          memberEmail: findOneMember.memberEmail,
        };
      }
    } else {
      throw new Error("이메일 또는 패스워드를 다시 확인해주세요");
    }
  };

  getMembersInfo = async(memberEmail)=>{
    const findOneMember = await this.memberRepository.findOneMember(memberEmail)
    
    return findOneMember
  }

  deleteMembers = async(memberEmail)=>{
    await this.memberRepository.deleteMembers(memberEmail); //반환값이 없으면 변수가 없어도 됨
    return 
  }
}

module.exports = MemberService;
