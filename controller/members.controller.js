const MemberService = require("../service/member.service");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const memberSchema = Joi.object({
  nickname: Joi.string().required(),
  password: Joi.string().disallow("nickname").required(),
  age: Joi.number().required(),
});

class MembersController {
  membersService = new MemberService();
  createMembers = async (req, res, next) => {
    try {
      const { memberEmail, password } = req.body;
      await this.membersService.createMembers(memberEmail, password);
      res.status(201).json({ message: "회원가입에 성공했습니다" });
    } catch (err) {
      res.status(400).json({ message: "회원가입에 실패했습니다" });
    }
  };

  loginMembers = async (req, res, next) => {
    const { memberEmail, password } = req.body;
    if (req.headers.authorization) {
      res.status(400).json({ errorMessage: "이미 로그인이 되어있습니다." });
      return;
    }
    // try{
    const member = await this.membersService.loginMembers(
      memberEmail,
      password
    );
    res.send(member.token);

    // }catch(err){
    //   res.status(400).json({error:err.message});

    // }
  };
  getMembersInfo = async(req,res,next)=>{
    const {memberEmail} = req.body;
    const getMember = await this.membersService.getMembersInfo(memberEmail);

    res.status(200).json({getMember})
  
  }

  updateMembers = async(req,res,next)=>{
    const {memberEmail}=req.body;
    const memberData = await this.membersService.updateMembers(
      password,
      phoneNum
      
    )
    res.status(201).json({data:memberData})
  }

  deleteMembers = async(req,res,next)=>{
    const {memberEmail}=req.body;

         await this.membersService.deleteMembers(memberEmail)
    res.status(200).json({message:"탈퇴 끝"});
  }
}

module.exports = MembersController;
