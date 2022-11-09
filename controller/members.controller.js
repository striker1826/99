const MemberService = require('../service/member.service')
const Joi =require("joi")
const jwt = require("jsonwebtoken")

const memberSchema = Joi.object({

  nickname: Joi.string().required(),
  password: Joi.string().disallow("nickname").required(), 
  age: Joi.number().required(),
});


class MembersController {
   membersService = new MemberService
    createMembers = async (req, res, next) => {
        try {
          // await memberSchema.validateAsync(req.body);
          // if (req.headers.authorization) {
          //   res.status(400).json({errorMessage:"로그인이 이미 되어있습니다"});
          //   return;
          // }
    
          const { memberEmail,password,phoneNum,memberImg} = req.body;
          // if (password.search(userId) > -1) {
          //   res
          //     .status(400)
          //     .json({ errorMessage: "비밀번호에 닉네임이 포함되어있습니다." });
          //   return;
          // }
          
        
          const result = await this.membersService.createMembers(
            memberEmail,
            password,
        
            phoneNum,
            memberImg
          )
          res.status(201).json({message:"회원가입에 성공했습니다"});
        } catch (err) {
          res.json(err.message);
        }
      };
      

      loginMembers = async(req,res,next)=>{
        const {memberEmail, password}=req.body;
        if(req.headers.authorization){
          res.status(400).json({errorMessage:"이미 로그인이 되어있습니다."})
          return;
        }
       // try{
          const member = await this.membersService.loginMembers(memberEmail, password);
          res.send(member.token)
              
          
      // }catch(err){
        //   res.status(400).json({error:err.message});
          
        // }
      };

    }

 
   


module.exports = MembersController;
