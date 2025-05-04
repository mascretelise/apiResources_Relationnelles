import conn from "../connector/connect"


export async function getAccountsSuperAdmin (){
    const request = "SELECT uti_uuid, uti_name, uti_firstname, uti_email, uti_statut FROM utilisateurs";
    const result = await conn.execute(request)
    if(result.length === 0){
        return null
    }
    console.log("result getAccounts accessor : ", result)
    return result
}

export async function editStatut (uti_uuid: any, statut:string){
    const request = "UPDATE utilisateurs SET uti_statut = ? WHERE uti_uuid = ?";
    const result = await conn.execute(request, [statut, uti_uuid])
    if(result.length === 0){
        return null
    }
    return result
}