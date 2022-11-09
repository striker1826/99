const Members=require("../models/member")

class MemberRepository{

       

    
    createMember = async(memberEmail,password,nickname,phoneNum,memberImg)=>{
        const createMemberData = await Members.create({
            memberEmail,
            password,
            phoneNum,
            
        })
        return createMemberData
    }
    findOneMember = async(memberEmail)=>{
    const findOneMember = await Members.findOne({memberEmail})
        return findOneMember
    }
    checkMembersIdDup = async(memberEmail)=>{
        return await Members.findOne({memberEmail})
    }

}


module.exports =MemberRepository