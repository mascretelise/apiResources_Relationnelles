import conn from "../connector/connect";


export async function addCategories (category:string){
    const request = "INSERT INTO categorie (cat_nom) VALUES (?)";
    const result = await conn.execute(request,[category])
    if (result.length === 0) {
        return null;
    }
    console.log("result add category accessor : ", result);
    return result
}

export async function removeCategories (category:string){
    const request = "DELETE FROM categorie WHERE cat_nom=?";
    const result = await conn.execute(request,[category])
    if (result.length === 0) {
        return null;
    }
    console.log("result remove category accessor : ", result);
    return result
}

export async function editCategories (category:string, id:any){
    const request = "UPDATE categorie SET cat_nom = ? WHERE cat_ucid = ?";
    const result = await conn.execute(request,[category, id])
    if (result.length === 0) {
        return null;
    }
    console.log("result edit category accessor : ", result);
    return result
}

export async function getCategories (){
    const request = "SELECT * FROM categorie";
    const result = await conn.execute(request);
    if (result.length === 0) {
        return null;
    }
    return result
}

export async function getCategoriesByName(cat_nom:any){
    const request = "SELECT cat_nom FROM categorie WHERE cat_nom=?";
    const result = await conn.execute(request, [cat_nom])
    if (result.length === 0) {
        return null;
    }
    return result
}

export async function suspendAccountByEmail(uti_suspendu: boolean, uti_uuid:string){
    const request = "UPDATE utilisateurs SET uti_suspendu = ? WHERE uti_uuid = ?"
    const result = await conn.execute(request,[uti_suspendu, uti_uuid])
    if(result.length === 0){
        return null
    }
    return result
}

export async function getAccountsAdmin (){
    const request = "SELECT uti_uuid, uti_name, uti_firstname, uti_email, uti_suspendu FROM utilisateurs";
    const result = await conn.execute(request)
    if(result.length === 0){
        return null
    }
    console.log("result getAccounts accessor : ", result)
    return result
}