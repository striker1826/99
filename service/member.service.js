const MembersRepository = require("../repository/members.repository");
const bcrypt = require("bcrypt")

class MemberService {
    memberRepository = new MembersRepository();

    createMembers = async(memberEmail,password,phoneNum,)=>{
       const result = await this.memberRepository.findOneMember(memberEmail);
        if(result){
            throw new Error("이미 가입된 아이디 입니다.");

        }else{
        const hashedPw = bcrypt.hashSync(password,10);

        await this.memberRepository.createMember(
            memberEmail, 
            password,
            hashedPw,
             phoneNum           
        )
        return
        }
    }
    checkMembersIdDup= async(memberEmail)=>{
        const findOneMember = await this.memberRepository.findOneMember(memberEmail);
        if(findOneMember){
            throw new Error("이미 사용중인 계정입니다.");
        }else{
            return "사용 가능한 계정입니다."
        }
    }  

    loginMembers =async(memberEmail,password)=>{
        const findOneMember = await this.memberRepository.findOneMember(memberEmail);
        console.log(findOneMember);
        if(findOneMember){
            const match = bcrypt.compareSync(password,findOneMember.password);
            console.log(match)
            if(match ===false){
                return ({message:"로그인 정보가 맞지 않습니다."})
            }else{
                const token=jwt.sign({memberEmail:member.memberEmail}, `${process.env.COOKIE_NAME}`)
                return {token: `Bearer ${token}`,
            memberEmail:findOneMember.memberEmail}
            }

        }else {
            throw new Error("이메일 또는 패스워드를 다시 확인해주세요")
        }
    }
}

module.exports = MemberService