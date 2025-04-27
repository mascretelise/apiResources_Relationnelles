import conn from "../connector/connect";


export async function addCategories (category:any){
    const request = "INSERT INTO categorie (cat_nom) VALUES (?)";
    const result = await conn.execute(request,[category])
    console.log("result add category accessor : ", result);
    return result
}

export async function removeCategories (category:any){
    const request = "DELETE FROM categorie WHERE cat_nom=?";
    const result = await conn.execute(request,[category])
    console.log("result remove category accessor : ", result);
    return result
}

export async function editCategories (category:any, id:number){
    const request = "UPDATE categorie SET cat_nom = ? WHERE cat_ucid = ?";
    const result = await conn.execute(request,[category, id])
    console.log("result edit category accessor : ", result);
    return result
}

export async function getCategories (){
    const request = "SELECT * FROM categorie";
    const result = await conn.execute(request);
    console.log("result get categories : ", result)
    return result
}